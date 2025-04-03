/*
  # Add Missing Airports

  1. Changes
    - Add missing airports to airports table
    - Ensure all IATA codes used in tracking are valid
    - Maintain existing data integrity

  2. Security
    - Maintain existing RLS policies
    - Keep existing permissions
*/

-- Insert missing airports if they don't exist
INSERT INTO airports (name, city, state, iata_code)
VALUES 
  ('Enontekiö Airport', 'Enontekiö', 'Finland', 'ENF'),
  ('Ivalo Airport', 'Ivalo', 'Finland', 'IVL'),
  ('Kemi-Tornio Airport', 'Kemi', 'Finland', 'KEM'),
  ('Kittilä Airport', 'Kittilä', 'Finland', 'KTT'),
  ('Kuusamo Airport', 'Kuusamo', 'Finland', 'KAO'),
  ('Rovaniemi Airport', 'Rovaniemi', 'Finland', 'RVN'),
  ('Oulu Airport', 'Oulu', 'Finland', 'OUL'),
  ('Vaasa Airport', 'Vaasa', 'Finland', 'VAA'),
  ('Tampere-Pirkkala Airport', 'Tampere', 'Finland', 'TMP'),
  ('Helsinki-Vantaa Airport', 'Helsinki', 'Finland', 'HEL')
ON CONFLICT (iata_code) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  state = EXCLUDED.state;

-- Create function to validate airport codes
CREATE OR REPLACE FUNCTION validate_airport_codes()
RETURNS trigger AS $$
BEGIN
  -- Check if origin airport exists
  IF NOT EXISTS (SELECT 1 FROM airports WHERE iata_code = NEW.origin) THEN
    RAISE EXCEPTION 'Invalid origin airport code: %', NEW.origin;
  END IF;

  -- Check if destination airport exists
  IF NOT EXISTS (SELECT 1 FROM airports WHERE iata_code = NEW.destination) THEN
    RAISE EXCEPTION 'Invalid destination airport code: %', NEW.destination;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to route_demand_tracking
DROP TRIGGER IF EXISTS validate_airports_trigger ON route_demand_tracking;
CREATE TRIGGER validate_airports_trigger
  BEFORE INSERT OR UPDATE ON route_demand_tracking
  FOR EACH ROW
  EXECUTE FUNCTION validate_airport_codes();

-- Add trigger to search_route_tracking
DROP TRIGGER IF EXISTS validate_search_airports_trigger ON search_route_tracking;
CREATE TRIGGER validate_search_airports_trigger
  BEFORE INSERT OR UPDATE ON search_route_tracking
  FOR EACH ROW
  EXECUTE FUNCTION validate_airport_codes();

-- Add helpful comments
COMMENT ON FUNCTION validate_airport_codes IS 
'Validates that origin and destination airport codes exist in the airports table';

COMMENT ON TRIGGER validate_airports_trigger ON route_demand_tracking IS 
'Ensures all airport codes in route_demand_tracking are valid';

COMMENT ON TRIGGER validate_search_airports_trigger ON search_route_tracking IS 
'Ensures all airport codes in search_route_tracking are valid';