import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { AuthProvider } from './components/AuthContext';
import App from './App';
import { fetchSEOData } from './utils/seo';

export async function render(url: string, context: any = {}) {
  // Fetch SEO data for the current URL if it's a dynamic route
  let seoData = null;
  if (url.startsWith('/bileta-avioni') || url.startsWith('/fluturime')) {
    seoData = await fetchSEOData(url);
  }

  // Create a helmet context to collect head tags
  const helmetContext = {};
  
  // Render the app to string
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StaticRouter>
    </HelmetProvider>
  );

  // Extract helmet data
  const { helmet } = helmetContext as { helmet: HelmetServerState };

  return {
    appHtml,
    helmet: {
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      link: helmet.link.toString(),
      script: helmet.script.toString(),
    },
    seoData
  };
}