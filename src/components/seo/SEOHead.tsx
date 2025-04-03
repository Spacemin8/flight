import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  imageUrl?: string;
  type?: 'website' | 'article';
  schema?: Record<string, any>;
  keywords?: string[];
  language?: string;
  children?: React.ReactNode;
  fromCity?: string;
  toCity?: string;
  fromState?: string;
  toState?: string;
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  imageUrl = 'https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png',
  type = 'website',
  schema,
  keywords = ['bileta avioni', 'flight tickets', 'airline tickets'],
  language = 'sq',
  children,
  fromCity,
  toCity,
  fromState,
  toState
}: SEOHeadProps) {
  const baseUrl = 'https://biletaavioni.himatravel.com';
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  // Default schema if none provided
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Hima Travel - Bileta Avioni',
    url: baseUrl,
    description:
      'Bileta avioni me çmimet më të mira. Rezervoni online fluturime direkte dhe me ndalesë për destinacionet tuaja të preferuara.',
    publisher: {
      '@type': 'Organization',
      name: 'Hima Travel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://himatravel.com/wp-content/uploads/2020/11/logo-768x277.png'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+355 694 767 427',
        contactType: 'customer service',
        availableLanguage: ['Albanian', 'English', 'Italian']
      }
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
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullUrl} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Hima Travel - Bileta Avioni" />
      <meta
        property="og:locale"
        content={language === 'sq' ? 'sq_AL' : 'en_US'}
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Mobile Optimization */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* Additional Meta Tags */}
      <meta name="author" content="Hima Travel" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="revisit-after" content="7 days" />
      <meta name="language" content={language} />
      <meta name="geo.region" content="AL" />
      <meta name="geo.placename" content="Tiranë" />

      {/* Structured Data / Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      {/* Additional meta tags */}
      {children}
    </Helmet>
  );
}
