import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './components/AuthContext';
import App from './App';
import './index.css';

// Export the root component for SSG
export const ViteSSG = () => (
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Export for vite-ssg
export const createApp = () => {
  return {
    app: ViteSSG,
    routes: [
      '/',
      '/about',
      '/contact',
      '/privacy',
      '/terms',
      '/cookies',
      '/careers',
      '/sitemap',
      '/results',
      '/seo-preview',
      '/admin',
      '/admin/login',
      '/agent/login',
      '/agent/register'
    ]
  };
};