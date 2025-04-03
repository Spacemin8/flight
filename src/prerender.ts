import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { render } from './entry-server';
import { getAllSeoRoutes, prefetchRouteData } from './utils/ssg-utils';

async function prerender() {
  console.log('Starting prerendering process...');
  
  // Get all routes to prerender
  const staticRoutes = [
    '/',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/careers',
    '/sitemap'
  ];
  
  // Get dynamic SEO routes
  console.log('Fetching dynamic SEO routes...');
  const seoRoutes = await getAllSeoRoutes();
  console.log(`Found ${seoRoutes.length} SEO routes to prerender`);
  
  // Combine all routes
  const allRoutes = [...staticRoutes, ...seoRoutes];
  
  // Create output directory
  const outDir = resolve(process.cwd(), 'dist');
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  
  // Read the index.html template
  const template = require('fs').readFileSync(
    resolve(process.cwd(), 'index.html'),
    'utf-8'
  );
  
  // Prerender each route
  for (const url of allRoutes) {
    console.log(`Prerendering ${url}...`);
    
    try {
      // For SEO routes, prefetch data
      if (seoRoutes.includes(url)) {
        await prefetchRouteData(url);
      }
      
      // Render the page
      const { appHtml, helmet } = render(url);
      
      // Insert the rendered app and helmet data into the template
      const html = template
        .replace('<!--app-html-->', appHtml)
        .replace('<!--app-head-->', 
          `${helmet.title}
          ${helmet.meta}
          ${helmet.link}
          ${helmet.script}`
        );
      
      // Create the output directory for the route
      const routeOutputDir = resolve(outDir, url.substring(1));
      if (!existsSync(routeOutputDir)) {
        mkdirSync(routeOutputDir, { recursive: true });
      }
      
      // Write the HTML file
      const outputPath = url === '/' 
        ? resolve(outDir, 'index.html')
        : resolve(outDir, `${url.substring(1)}/index.html`);
      
      writeFileSync(outputPath, html);
      console.log(`Prerendered ${url} -> ${outputPath}`);
    } catch (error) {
      console.error(`Error prerendering ${url}:`, error);
    }
  }
  
  console.log('Prerendering complete!');
}

prerender().catch(console.error);