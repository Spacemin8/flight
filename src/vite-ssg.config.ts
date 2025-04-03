import { defineConfig } from 'vite-ssg';
import { getAllSeoRoutes } from './utils/ssg-utils';

export default defineConfig({
  entry: 'main.tsx',
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
  },

  onPageRendered: async (route, html) => {
    console.log(`Rendered ${route}`);
    return html;
  },

  onFinished: async () => {
    console.log('Pre-rendering complete!');
  }
});
