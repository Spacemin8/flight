/*
  # Fix Commission Calculation for Live Search

  1. Changes
    - Update calculate_flight_price to not split commission for live search
    - Keep existing calendar price commission splitting
    - Add proper commission calculation based on passenger count
    - Apply group discount rules correctly

  2. Security
    - Maintain existing RLS policies
    - Keep existing permissions
*/

-- Drop existing function
DROP FUNCTION IF EXISTS calculate_flight_price(numeric, jsonb, text);

-- Create updated function with proper commission handling
CREATE OR REPLACE FUNCTION calculate_flight_price(
  p_base_price numeric,
  p_passengers jsonb,
  p_trip_type text default 'oneWay'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_adult_count integer;
  v_child_count integer;
  v_infant_seat_count integer;
  v_infant_lap_count integer;
  v_adult_rate numeric;
  v_child_rate numeric;
  v_infant_seat_rate numeric;
  v_infant_lap_rate numeric;
  v_adult_commission numeric;
  v_child_commission numeric;
  v_infant_seat_commission numeric;
  v_infant_lap_commission numeric;
  v_total_commission numeric;
  v_total_price numeric;
  v_adult_rule record;
  v_group_threshold record;
BEGIN
  -- Get passenger counts
  v_adult_count := COALESCE((p_passengers->>'adults')::integer, 0);
  v_child_count := COALESCE((p_passengers->>'children')::integer, 0);
  v_infant_seat_count := COALESCE((p_passengers->>'infantsInSeat')::integer, 0);
  v_infant_lap_count := COALESCE((p_passengers->>'infantsOnLap')::integer, 0);

  -- Get base commission rates
  SELECT rate INTO v_child_rate FROM commission_rules WHERE passenger_type = 'child';
  SELECT rate INTO v_infant_seat_rate FROM commission_rules WHERE passenger_type = 'infant_seat';
  SELECT rate INTO v_infant_lap_rate FROM commission_rules WHERE passenger_type = 'infant_lap';

  -- Get adult rate with group discount if applicable
  SELECT * INTO v_adult_rule FROM commission_rules WHERE passenger_type = 'adult';
  
  -- Default to base adult rate
  v_adult_rate := v_adult_rule.rate;

  -- Check for group discounts if we have multiple adults
  IF v_adult_count >= 2 AND v_adult_rule.group_discount_rules IS NOT NULL THEN
    -- Find applicable threshold
    SELECT (rule->>'rate')::numeric INTO v_adult_rate
    FROM jsonb_array_elements(v_adult_rule.group_discount_rules->'thresholds') AS rule
    WHERE (rule->>'min_count')::integer <= v_adult_count
    ORDER BY (rule->>'min_count')::integer DESC
    LIMIT 1;
  END IF;

  -- Calculate commissions
  v_adult_commission := v_adult_count * v_adult_rate;
  v_child_commission := v_child_count * v_child_rate;
  v_infant_seat_commission := v_infant_seat_count * v_infant_seat_rate;
  v_infant_lap_commission := v_infant_lap_count * v_infant_lap_rate;

  -- Calculate total commission
  v_total_commission := v_adult_commission + v_child_commission + 
                       v_infant_seat_commission + v_infant_lap_commission;

  -- Calculate total price
  v_total_price := p_base_price + v_total_commission;

  -- Return price breakdown
  RETURN jsonb_build_object(
    'base_price', p_base_price,
    'commission', jsonb_build_object(
      'total', v_total_commission,
      'breakdown', jsonb_build_object(
        'adult', jsonb_build_object(
          'count', v_adult_count,
          'rate', v_adult_rate,
          'total', v_adult_commission
        ),
        'child', jsonb_build_object(
          'count', v_child_count,
          'rate', v_child_rate,
          'total', v_child_commission
        ),
        'infant_seat', jsonb_build_object(
          'count', v_infant_seat_count,
          'rate', v_infant_seat_rate,
          'total', v_infant_seat_commission
        ),
        'infant_lap', jsonb_build_object(
          'count', v_infant_lap_count,
          'rate', v_infant_lap_rate,
          'total', v_infant_lap_commission
        )
      )
    ),
    'total_price', v_total_price,
    'trip_type', p_trip_type,
    'passengers', p_passengers
  );
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION calculate_flight_price TO anon, authenticated;

-- Add helpful comment
COMMENT ON FUNCTION calculate_flight_price IS 
'Calculates flight price with full commission per leg for live search results. 
Applies group discounts for multiple adult passengers.';