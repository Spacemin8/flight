import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './components/AuthContext';
import App from './App';
import './index.css';

// Determine if we should hydrate or create root
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');

  // Check if the app was server-rendered
  const hasChildNodes = rootElement.innerHTML.trim() !== '';

  if (hasChildNodes) {
    // Hydrate if server-rendered
    hydrateRoot(
      rootElement,
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
  } else {
    // Create root if not server-rendered
    createRoot(rootElement).render(
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
  }
}
