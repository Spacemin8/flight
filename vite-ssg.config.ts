import { defineConfig } from 'vite-react-ssg';
import { getAllSeoRoutes, prefetchRouteData } from './src/utils/ssg-utils';

export default defineConfig({
  // Script loading strategy
  script: 'async',

  // Output formatting
  formatting: 'minify',

  // CSS optimization
  crittersOptions: {
    preload: 'media',
    preloadFonts: true
  },

  // Directory structure
  dirStyle: 'nested',

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
