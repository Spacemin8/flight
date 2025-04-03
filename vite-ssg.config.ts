import { defineConfig } from 'vite-ssg';
import { getAllSeoRoutes, prefetchRouteData } from './src/utils/ssg-utils';

export default defineConfig({
  // Base URL of your app
  base: '/',
  
  // Specify which routes should be pre-rendered
  includedRoutes: async () => {
    // Static routes
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
    const seoRoutes = await getAllSeoRoutes();
    
    // Combine all routes
    return [...staticRoutes, ...seoRoutes];
  },
  
  // Hooks
  onBeforePageRender: async (route) => {
    console.log(`Pre-rendering ${route}...`);
    
    // For SEO routes, prefetch data
    if (route.startsWith('/bileta-avioni') || route.startsWith('/fluturime')) {
      await prefetchRouteData(route);
    }
  },
  
  onPageRendered: async (route, html) => {
    console.log(`Rendered ${route}`);
    return html;
  },
  
  onFinished: async () => {
    console.log('Pre-rendering complete!');
  }
});