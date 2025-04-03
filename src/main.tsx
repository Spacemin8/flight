import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './components/AuthContext';
import App from './App';
import './index.css';
import { ViteSSG } from 'vite-ssg';

// Export the root component for SSG
export const Root = () => (
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

export const createApp = ViteSSG(Root, {
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
});
