import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
  imageUrl?: string;
  type?: 'website' | 'article';
  fromCity?: string;
  toCity?: string;
  fromState?: string;
  toState?: string;
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  structuredData,
  imageUrl = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80',
  type = 'website',
  fromCity,
  toCity,
  fromState,
  toState
}: SEOHeadProps) {
  const baseUrl = 'https://biletaavioni.himatravel.com';
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  // Generate default structured data if none provided
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAction',
    name: title,
    description,
    url: fullUrl,
    ...(fromCity &&
      toCity && {
        fromLocation: {
          '@type': 'City',
          name: fromCity
        },
        toLocation: {
          '@type': 'City',
          name: toCity
        }
      }),
    ...(fromState &&
      toState && {
        fromLocation: {
          '@type': 'State',
          name: fromState
        },
        toLocation: {
          '@type': 'State',
          name: toState
        }
      }),
    provider: {
      '@type': 'TravelAgency',
      name: 'Hima Travel',
      url: baseUrl
    }
  };

  // Create FAQPage schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Sa kushton një biletë avioni ${fromCity ? `nga ${fromCity}` : ''} ${toCity ? `për ${toCity}` : ''}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Çmimet për bileta avioni ${fromCity ? `nga ${fromCity}` : ''} ${toCity ? `për ${toCity}` : ''} fillojnë nga 50€ dhe mund të ndryshojnë në varësi të sezonit dhe disponueshmërisë. Rekomandohet rezervimi i hershëm për çmimet më të mira.`
        }
      },
      {
        '@type': 'Question',
        name: 'Kur është koha më e mirë për të rezervuar bileta avioni?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Koha më e mirë për të rezervuar bileta avioni zakonisht është 2-3 muaj përpara udhëtimit. Për sezonin e lartë (verë, festat e fundvitit), rekomandohet rezervimi 4-6 muaj përpara.'
        }
      },
      {
        '@type': 'Question',
        name: 'A ofron Hima Travel garanci çmimi për bileta avioni?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Po, Hima Travel ofron garanci çmimi për bileta avioni. Nëse gjeni të njëjtin fluturim me çmim më të ulët brenda 24 orëve pas rezervimit, ne do të rimbursojmë diferencën.'
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="sq" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Hima Travel - Bileta Avioni" />
      <meta property="og:locale" content="sq_AL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Hima Travel" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="revisit-after" content="7 days" />
      <meta
        name="keywords"
        content="bileta avioni, flight tickets, airline tickets, bileta online, cmime te lira, fluturime, rezervo bileta, oferta udhetimi, bileta te lira, hima travel, agjenci udhetimi, fluturime direkte"
      />

      {/* Geo Tags */}
      <meta name="geo.region" content="AL" />
      <meta name="geo.placename" content="Tiranë" />

      {/* Mobile Optimization */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* Structured Data / Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  );
}
