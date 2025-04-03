import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateSitemap() {
  try {
    console.log('🔄 Starting sitemap generation...');

    // Initialize array to store all routes
    let allRoutes = [];
    let page = 0;
    const pageSize = 1000; // Supabase's max page size
    let hasMore = true;

    // Fetch all routes using pagination
    while (hasMore) {
      const { data: routes, error, count } = await supabase
        .from('seo_location_connections')
        .select(`
          template_url,
          from_location:from_location_id(
            type, city, state, nga_format
          ),
          to_location:to_location_id(
            type, city, state, per_format
          )
        `, { count: 'exact' })
        .eq('status', 'active')
        .not('template_url', 'is', null)
        .order('template_url')
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (error) throw error;

      if (routes) {
        allRoutes = allRoutes.concat(routes);
      }

      // Check if we need to fetch more
      hasMore = routes && routes.length === pageSize;
      page++;

      console.log(`Fetched ${routes?.length || 0} routes (page ${page}). Total so far: ${allRoutes.length}`);
    }

    console.log(`Total routes fetched: ${allRoutes.length}`);

    // Generate XML
    const baseUrl = 'https://biletaavioni.himatravel.com';
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  ${allRoutes.map(route => `
  <url>
    <loc>${baseUrl}${route.template_url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('')}
</urlset>`;

    // Write to file
    const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, xml);

    console.log(`✅ Sitemap generated successfully at ${outputPath}`);

    // Store in system_settings table
    const { error: settingsError } = await supabase
      .from('system_settings')
      .upsert({
        setting_name: 'sitemap_xml',
        setting_value: true,
        description: xml
      }, {
        onConflict: 'setting_name'
      });

    if (settingsError) {
      console.error('Error saving sitemap to database:', settingsError);
    } else {
      console.log('✅ Sitemap saved to database');
    }

  } catch (err) {
    console.error('Error generating sitemap:', err);
    process.exit(1);
  }
}

// Run the generator
generateSitemap()
  .then(() => {
    console.log('🎉 All done!');
    process.exit(0);
  })
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });