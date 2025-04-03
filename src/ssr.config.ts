import { defineConfig } from 'vite-plugin-ssr/config';

export default defineConfig({
  // Base URL of your app
  base: '/',
  
  // Specify which routes should be pre-rendered
  prerender: {
    // Pre-render all routes
    partial: true,
    
    // Disable crawling to manually specify routes
    disableAutoRun: false,
    
    // Routes to pre-render
    urlsToPrerender: [
      '/',
      '/about',
      '/contact',
      '/privacy',
      '/terms',
      '/cookies',
      '/careers'
    ]
  },
  
  // Configure page routes
  extensions: ['.page.tsx', '.page.jsx', '.page.js'],
  
  // Configure how long to wait for data fetching
  prerender: {
    disableAutoRun: false,
    partial: true,
    noExtraDir: true,
    parallel: 4,
    renderTimeout: 10000
  }
});