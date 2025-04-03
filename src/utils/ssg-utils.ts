import { supabase } from '../lib/supabase';

/**
 * Fetches all SEO routes that should be pre-rendered
 */
export async function getAllSeoRoutes() {
  try {
    // Get all active SEO routes
    const { data: routes, error } = await supabase
      .from('seo_location_connections')
      .select('template_url')
      .eq('status', 'active')
      .not('template_url', 'is', null);

    if (error) throw error;

    // Return array of route paths
    return (routes || []).map((route) => route.template_url);
  } catch (err) {
    console.error('Error fetching SEO routes:', err);
    return [];
  }
}

/**
 * Pre-fetches data for a specific route to enable SSG
 */
export async function prefetchRouteData(path: string) {
  try {
    // Fetch connection data for this route
    const { data: connection, error } = await supabase
      .from('seo_location_connections')
      .select(
        `
        *,
        from_location:from_location_id(
          id, type, city, state, nga_format
        ),
        to_location:to_location_id(
          id, type, city, state, per_format
        ),
        template_type:template_type_id(
          id, name, slug
        )
      `
      )
      .eq('template_url', path)
      .eq('status', 'active')
      .single();

    if (error) throw error;

    // Fetch template data
    const { data: template } = await supabase
      .from('seo_page_templates')
      .select('*')
      .eq('template_type_id', connection.template_type.id)
      .single();

    // Fetch template components
    const { data: components } = await supabase
      .from('seo_template_components')
      .select('*')
      .eq('template_id', template.id)
      .eq('status', 'active')
      .order('display_order');

    // Return pre-fetched data
    return {
      connection,
      template,
      components
    };
  } catch (err) {
    console.error(`Error pre-fetching data for route ${path}:`, err);
    return null;
  }
}
