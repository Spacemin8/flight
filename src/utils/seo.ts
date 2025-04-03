import { supabase } from './supabase';

interface SEOData {
  title: string;
  description: string;
  canonicalUrl: string;
  schema?: Record<string, any>;
  keywords?: string[];
  language?: string;
}

/**
 * Fetches SEO data for a specific URL path from the database
 */
export async function fetchSEOData(path: string): Promise<SEOData | null> {
  try {
    // First try to match the exact path
    const { data: connection, error } = await supabase
      .from('seo_location_connections')
      .select(`
        template_url,
        template_type_id,
        from_location:from_location_id(
          type, city, state, nga_format
        ),
        to_location:to_location_id(
          type, city, state, per_format
        )
      `)
      .eq('template_url', path)
      .eq('status', 'active')
      .single();

    if (error || !connection) {
      // Try without trailing slash
      const pathWithoutSlash = path.endsWith('/') ? path.slice(0, -1) : path;
      const { data: altConnection, error: altError } = await supabase
        .from('seo_location_connections')
        .select(`
          template_url,
          template_type_id,
          from_location:from_location_id(
            type, city, state, nga_format
          ),
          to_location:to_location_id(
            type, city, state, per_format
          )
        `)
        .eq('template_url', pathWithoutSlash)
        .eq('status', 'active')
        .single();

      if (altError || !altConnection) {
        console.error('No SEO data found for path:', path);
        return null;
      }

      // Get template data
      const { data: template } = await supabase
        .from('seo_page_templates')
        .select('seo_title, meta_description')
        .eq('template_type_id', altConnection.template_type_id)
        .single();

      if (!template) return null;

      // Replace placeholders in title and description
      let title = template.seo_title;
      let description = template.meta_description;

      // Replace city placeholders
      if (altConnection.from_location.type === 'city') {
        title = title.replace(/{nga_city}/g, altConnection.from_location.nga_format || `Nga ${altConnection.from_location.city}`);
        description = description.replace(/{nga_city}/g, altConnection.from_location.nga_format || `Nga ${altConnection.from_location.city}`);
      }

      if (altConnection.to_location.type === 'city') {
        title = title.replace(/{per_city}/g, altConnection.to_location.per_format || `Për ${altConnection.to_location.city}`);
        description = description.replace(/{per_city}/g, altConnection.to_location.per_format || `Për ${altConnection.to_location.city}`);
      }

      // Replace state placeholders
      if (altConnection.from_location.type === 'state') {
        title = title.replace(/{nga_state}/g, altConnection.from_location.nga_format || `Nga ${altConnection.from_location.state}`);
        description = description.replace(/{nga_state}/g, altConnection.from_location.nga_format || `Nga ${altConnection.from_location.state}`);
      }

      if (altConnection.to_location.type === 'state') {
        title = title.replace(/{per_state}/g, altConnection.to_location.per_format || `Për ${altConnection.to_location.state}`);
        description = description.replace(/{per_state}/g, altConnection.to_location.per_format || `Për ${altConnection.to_location.state}`);
      }

      // Create schema for flight offers
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
        description: description,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: '50',
          highPrice: '500',
          offerCount: '100',
          offers: [
            {
              '@type': 'Offer',
              url: `https://biletaavioni.himatravel.com${altConnection.template_url}`,
              price: '99',
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Hima Travel'
              }
            }
          ]
        }
      };

      return {
        title,
        description,
        canonicalUrl: altConnection.template_url,
        schema,
        keywords: [
          'bileta avioni',
          'flight tickets',
          'airline tickets',
          'bileta online',
          'cmime te lira',
          'fluturime',
          'rezervo bileta',
          altConnection.from_location.city || altConnection.from_location.state,
          altConnection.to_location.city || altConnection.to_location.state,
          'fluturime direkte',
          'oferta udhetimi',
          'bileta te lira'
        ],
        language: 'sq'
      };
    }

    // Get template data
    const { data: template } = await supabase
      .from('seo_page_templates')
      .select('seo_title, meta_description')
      .eq('template_type_id', connection.template_type_id)
      .single();

    if (!template) return null;

    // Replace placeholders in title and description
    let title = template.seo_title;
    let description = template.meta_description;

    // Replace city placeholders
    if (connection.from_location.type === 'city') {
      title = title.replace(/{nga_city}/g, connection.from_location.nga_format || `Nga ${connection.from_location.city}`);
      description = description.replace(/{nga_city}/g, connection.from_location.nga_format || `Nga ${connection.from_location.city}`);
    }

    if (connection.to_location.type === 'city') {
      title = title.replace(/{per_city}/g, connection.to_location.per_format || `Për ${connection.to_location.city}`);
      description = description.replace(/{per_city}/g, connection.to_location.per_format || `Për ${connection.to_location.city}`);
    }

    // Replace state placeholders
    if (connection.from_location.type === 'state') {
      title = title.replace(/{nga_state}/g, connection.from_location.nga_format || `Nga ${connection.from_location.state}`);
      description = description.replace(/{nga_state}/g, connection.from_location.nga_format || `Nga ${connection.from_location.state}`);
    }

    if (connection.to_location.type === 'state') {
      title = title.replace(/{per_state}/g, connection.to_location.per_format || `Për ${connection.to_location.state}`);
      description = description.replace(/{per_state}/g, connection.to_location.per_format || `Për ${connection.to_location.state}`);
    }

    // Create schema for flight offers
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: title,
      description: description,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        lowPrice: '50',
        highPrice: '500',
        offerCount: '100',
        offers: [
          {
            '@type': 'Offer',
            url: `https://biletaavioni.himatravel.com${connection.template_url}`,
            price: '99',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'Hima Travel'
            }
          }
        ]
      }
    };

    return {
      title,
      description,
      canonicalUrl: connection.template_url,
      schema,
      keywords: [
        'bileta avioni',
        'flight tickets',
        'airline tickets',
        'bileta online',
        'cmime te lira',
        'fluturime',
        'rezervo bileta',
        connection.from_location.city || connection.from_location.state,
        connection.to_location.city || connection.to_location.state,
        'fluturime direkte',
        'oferta udhetimi',
        'bileta te lira'
      ],
      language: 'sq'
    };
  } catch (err) {
    console.error('Error fetching SEO data:', err);
    return null;
  }
}

/**
 * Generates default SEO data for a page
 */
export function getDefaultSEOData(pageName: string): SEOData {
  const baseUrl = 'https://biletaavioni.himatravel.com';
  
  const pageData: Record<string, { title: string; description: string; path: string }> = {
    home: {
      title: 'Bileta Avioni | Rezervo Online me Çmimet më të Mira | Hima Travel',
      description: 'Rezervoni bileta avioni me çmimet më të mira. Krahasoni fluturime direkte dhe me ndalesë për destinacionet tuaja të preferuara. Rezervo online tani!',
      path: '/'
    },
    results: {
      title: 'Rezultatet e Kërkimit | Bileta Avioni | Hima Travel',
      description: 'Shikoni rezultatet e kërkimit tuaj për bileta avioni. Krahasoni çmimet, oraret dhe zgjidhni fluturimin që ju përshtatet më mirë.',
      path: '/results'
    },
    about: {
      title: 'Rreth Nesh | Hima Travel | Agjenci Udhëtimi në Shqipëri',
      description: 'Mësoni më shumë për Hima Travel, një nga agjencitë më të besuara të udhëtimit në Shqipëri që nga viti 2011. Ofrojmë bileta avioni, pushime dhe shërbime turistike.',
      path: '/about'
    },
    contact: {
      title: 'Na Kontaktoni | Hima Travel | Bileta Avioni & Pushime',
      description: 'Kontaktoni Hima Travel për çdo pyetje ose rezervim. Jemi këtu për t\'ju ndihmuar me bileta avioni, pushime dhe shërbime turistike.',
      path: '/contact'
    },
    privacy: {
      title: 'Politikat e Privatësisë | Bileta Avioni | Hima Travel',
      description: 'Lexoni politikat tona të privatësisë për të kuptuar se si mbrojmë të dhënat tuaja personale dhe si i përdorim ato për të përmirësuar shërbimet tona.',
      path: '/privacy'
    },
    terms: {
      title: 'Kushtet e Përdorimit | Bileta Avioni | Hima Travel',
      description: 'Kushtet e përdorimit të faqes sonë të internetit dhe shërbimeve të Hima Travel. Informacion i rëndësishëm për rezervimet dhe anullimet.',
      path: '/terms'
    },
    cookies: {
      title: 'Politika e Cookies | Bileta Avioni | Hima Travel',
      description: 'Informacion mbi përdorimin e cookies në faqen tonë të internetit dhe si mund të menaxhoni preferencat tuaja të cookies.',
      path: '/cookies'
    },
    careers: {
      title: 'Mundësi Karriere | Bileta Avioni | Hima Travel | Punë në Turizëm',
      description: 'Zbuloni mundësitë e karrierës në Hima Travel. Bashkohuni me ekipin tonë të pasionuar për turizmin dhe udhëtimet.',
      path: '/careers'
    },
    sitemap: {
      title: 'Sitemap | Bileta Avioni | Hima Travel | Të Gjitha Faqet',
      description: 'Shikoni hartën e faqes sonë të internetit për të gjetur të gjitha faqet dhe shërbimet që ofrojmë në Hima Travel për bileta avioni dhe fluturime.',
      path: '/sitemap'
    }
  };

  const data = pageData[pageName] || {
    title: 'Hima Travel | Bileta Avioni & Fluturime | Çmimet më të Mira',
    description: 'Bileta avioni me çmimet më të mira. Rezervoni online fluturime direkte dhe me ndalesë për destinacionet tuaja të preferuara. Oferta speciale çdo ditë!',
    path: '/'
  };

  // Create schema for the page
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.title,
    url: baseUrl + data.path,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/results?batch_id={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return {
    title: data.title,
    description: data.description,
    canonicalUrl: data.path,
    schema,
    keywords: [
      'bileta avioni',
      'flight tickets',
      'airline tickets',
      'bileta online',
      'cmime te lira',
      'fluturime',
      'rezervo bileta',
      'oferta udhetimi',
      'bileta te lira',
      'hima travel',
      'agjenci udhetimi',
      'fluturime direkte'
    ],
    language: 'sq'
  };
}