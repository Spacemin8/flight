import React from 'react';
import { Navbar } from '../components/Navbar';
import { GlobalFooter } from '../components/common/GlobalFooter';
import { Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPage() {
  // Generate structured data for the page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Politikat e Privatësisë | Bileta Avioni | Hima Travel',
    description: 'Informacion mbi mbrojtjen e të dhënave personale gjatë rezervimit të biletave të avionit. Mësoni se si Hima Travel mbron privatësinë tuaj kur rezervoni bileta avioni online.',
    url: 'https://biletaavioni.himatravel.com/privacy',
    publisher: {
      '@type': 'Organization',
      name: 'Hima Travel',
      logo: {
        '@type': 'ImageObject',
        url: 'https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png'
      }
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Hima Travel',
          item: 'https://biletaavioni.himatravel.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Politikat e Privatësisë',
          item: 'https://biletaavioni.himatravel.com/privacy'
        }
      ]
    },
    // Add FAQ schema for better SEO
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Si mbrohen të dhënat e mia personale kur rezervoj bileta avioni?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Të dhënat tuaja grumbullohen, përpunohen dhe ruhen nga Hima Travel & Tours në përputhje të plotë me parashikimet e ligjit nr. 9887 datë 10.03.2008 "Për Mbrojtjen e të Dhënave Personale".'
        }
      },
      {
        '@type': 'Question',
        name: 'A janë të sigurta pagesat për bileta avioni në platformën tuaj?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Po, të gjitha transaksionet për bileta avioni në platformën tonë janë të siguruara me protokolle të avancuara të sigurisë dhe enkriptimit për të mbrojtur të dhënat tuaja financiare.'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Politikat e Privatësisë | Bileta Avioni | Rezervime Online | Hima Travel</title>
        <meta name="description" content="Informacion mbi mbrojtjen e të dhënave personale gjatë rezervimit të biletave të avionit. Mësoni se si Hima Travel mbron privatësinë tuaj kur rezervoni bileta avioni online me çmimet më të mira." />
        <meta name="keywords" content="bileta avioni, privatësi, mbrojtja e të dhënave, rezervime online, fluturime, bileta avioni online, cmime te lira, hima travel, privatësi bileta avioni, të dhëna personale, rezervim bileta, fluturime direkte, bileta avioni të lira, oferta fluturime" />
        <link rel="canonical" href="https://biletaavioni.himatravel.com/privacy" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biletaavioni.himatravel.com/privacy" />
        <meta property="og:title" content="Politikat e Privatësisë | Bileta Avioni | Hima Travel" />
        <meta property="og:description" content="Informacion mbi mbrojtjen e të dhënave personale gjatë rezervimit të biletave të avionit. Mësoni se si Hima Travel mbron privatësinë tuaj kur rezervoni bileta avioni online." />
        <meta property="og:image" content="https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png" />
        <meta property="og:locale" content="sq_AL" />
        <meta property="og:site_name" content="Hima Travel - Bileta Avioni" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Politikat e Privatësisë | Bileta Avioni | Hima Travel" />
        <meta name="twitter:description" content="Informacion mbi mbrojtjen e të dhënave personale gjatë rezervimit të biletave të avionit. Mësoni se si Hima Travel mbron privatësinë tuaj kur rezervoni bileta avioni online." />
        <meta name="twitter:image" content="https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png" />
        
        {/* Additional Meta Tags */}
        <meta name="author" content="Hima Travel" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="revisit-after" content="30 days" />
        <meta name="language" content="Albanian" />
        <meta name="geo.region" content="AL" />
        <meta name="geo.placename" content="Tiranë" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Politikat e Privatësisë për Bileta Avioni</h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <p>
                Hima Travel & Tours, ju informon se, me qëllim për t'ju ofruar një shërbim sa më të mirë dhe përgjigje të shpejtë ndaj kërkesave tuaja për <strong>bileta avioni</strong>, në platformën onlinë në faqet tona të internetit, kërkohet që klientët apo përdoruesit të japin disa të dhëna personale në formen e aplikimit online për të proceduar me rezervimin e <strong>biletave të avionit</strong>.
              </p>

              <p>
                Hima Travel & Tours disponon faqen zyrtare të internetit www.himatravel.com. Nëpërmjet këtyre faqeve, kompania u vjen në ndihmë klientëve të interesuar për <strong>bileta avioni</strong>, paketa turistike apo cdo lloj shërbimi udhëtimi.
              </p>

              <p>
                Të dhënat tuaja grumbullohen, përpunohen dhe ruhen nga Hima Travel & Tours në përputhje të plotë me parashikimet e ligjit nr. 9887 datë 10.03.2008 "Për Mbrojtjen e të Dhënave Personale". Këto veprime do të kryhen sipas parimit të respektimit dhe garantimit të të drejtave dhe lirive themelore të njeriut dhe në veçanti të drejtës së ruajtjes së jetës private gjatë rezervimit të <strong>biletave të avionit</strong>.
              </p>

              <p>
                Dhënia e të dhënave tuaja personale nuk është e detyrueshme, por është kusht i domosdoshëm për të proceduar rezervimin e <strong>biletave të avionit online</strong>.
              </p>

              <h2>1. Përkufizimi i termave për rezervimin e biletave të avionit</h2>
              <p>
                Në këtë marrëveshje, termat e mëposhtëm do të kenë këtë kuptim:
              </p>
              <ul>
                <li>
                  <strong>Agjenci:</strong> Person juridik i regjistruar i cili kryen veprimtarinë e ofrimit, gjetjes dhe mundësimit të udhëtimeve turistike, <strong>biletave të avionit</strong> në mënyra të ndryshme transporti si dhe bileta për aktivitete sportive ose kulturore për klientët, në këmbim të pagesës.
                </li>
                <li>
                  <strong>Cookie:</strong> Një pjesë informacioni e dërguar nga një faqe interneti dhe që ruhet në browserin e përdoruesit ndërkohë që përdoruesi sheh faqen e internetit për <strong>bileta avioni</strong>. Çdo herë që një përdorues hap një faqe interneti, browseri dërgon një cookie në serverin e përdoruesit për ta lajmëruar atë për aktivitetin e tij të mëparshëm.
                </li>
              </ul>

              <h2>2. Përdorimi i cookie për bileta avioni</h2>
              <ul>
                <li>
                  Faqet e internetit që i përkasin agjencisë, i përdorin cookie për të dalluar vizitorët e faqes njëri nga tjetri. Disa cookie janë të domosdoshëm për mirëfunksionimin e faqeve të internetit të agjencisë, për të lejuar përdoruesit e faqes të bëjnë rezervime online të <strong>biletave të avionit</strong> dhe për të mundësuar stafin e agjencisë të marrë e të përpunojë kërkesat e klientëve.
                </li>
                <li>
                  Disa lloje të tjera cookie e ndihmojnë stafin e agjencisë të mundësojë një përvojë të mirë për klientët kur këta vizitojnë faqen e internetit për <strong>bileta avioni</strong>. Cookie japin edhe informacion mbi ofertat e agjencisë për <strong>bileta avioni</strong>.
                </li>
                <li>
                  Cookie përdoren gjithashtu, për të reklamuar <strong>bileta avioni</strong> në faqen e internetit të agjencisë.
                </li>
              </ul>

              <h2>3. Deklaratë mbi privatësinë për bileta avioni</h2>
              <p>
                Hima Travel & Tours respekton rëndësinë e privatësisë së klientëve të saj që kërkojnë <strong>bileta avioni</strong>. Kjo deklaratë përcakton bazën mbi të cilën mblidhen dhe përpunohen të dhënat e çdo klienti.
              </p>

              <h3>3.1. Mbledhja dhe Ruajtja e të Dhënave për Bileta Avioni</h3>
              <p>
                Hima Travel & Tours siguron çdo klient se të dhënat që mbërrijnë në backoffice apo që klienti nënshkruan personalisht në zyrë, janë të siguruara me anë të një sistemi të sigurtë dhe këto të dhëna përdoren vetëm për efekt të garantimit të rezervimit të <strong>biletave të avionit</strong> të klientit.
              </p>

              <h3>3.2. Të dhënat që mblidhen për bileta avioni</h3>
              <p>
                Të dhënat e mëposhtme të klientëve mblidhen nga faqja e internetit:
              </p>
              <ul>
                <li>Informacioni që klienti jep në mënyrë që të kryhet rezervimi i <strong>biletave të avionit</strong></li>
                <li>Informacioni që klienti jep në mënyrë që të bëhet pjesë e një konkursi që reklamohet në faqen e internetit, kur plotëson një pyetësor ose kur raporton një problem me <strong>bileta avioni</strong></li>
                <li>Detaje të transfertave bankare që klienti kryen për të përfunduar një rezervim <strong>bilete avioni</strong></li>
                <li>Nëse klienti kontakton stafin e agjencisë, stafi mund të ruajë adresën e e-mail për komunikime të mëtejshme lidhur me <strong>bileta avioni</strong></li>
              </ul>

              <h2>4. Ruajtja dhe transferimi i të dhënave për bileta avioni</h2>
              <ul>
                <li>
                  Të dhënat e mbledhura nga agjencia vetëm për qëllime rezervimi <strong>biletash avioni</strong> dhe të lëna me vullnet të lirë nga subjekti i të dhënave mund të transferohen ose të ruhen në një vend jashtë Zonës Ekonomike Europiane.
                </li>
                <li>
                  Hima Travel & Tours në bazë të kontratave dhe marrëveshjeve që ka me furnitorë globalë, do të transferojë në database të tyre të dhënat e klientëve, të cilët rezervojnë <strong>bileta avioni</strong> nëpërmjet faqeve online të kompanisë.
                </li>
                <li>
                  Të gjitha të dhënat e mbledhura nga agjencia do të ruhen në serverat e sigurtë të Hima Travel & Tours.
                </li>
              </ul>

              <h2>5. Anullimi i përpunimit të të dhënave për bileta avioni</h2>
              <p>
                Klienti ka të drejtë të kërkojë nga agjencia të njihet me informacionin që mund të jëtë mbledhur për të dhe më pas të mos përpunojë të dhënat personale për qëllime marketingu apo arsye të ndryshme me anë të e-mail ose një kërkese drejtuar kompanisë në adresën e kontaktit.
              </p>

              <h2>6. Pëlqimi mbi mbrojtjen e të dhënave personale për bileta avioni</h2>
              <p>
                Duke vazhduar përdorimin e faqeve të internetit të Hima Travel & Tours për <strong>bileta avioni</strong>, klienti jep pëlqimin e tij mbi mbledhjen dhe përpunimin e të dhënave nga ana e agjencisë. Të dhënat personale do të ruhen për aq kohë sa ç'është e nevojshme sipas qëllimit kryesor të mbledhjes së tyre.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontakt për Privatësinë e Biletave të Avionit</h3>
                <p className="text-gray-700">
                  Nëse keni pyetje, vërejtje, kërkesa apo ankesa në lidhje me përdorimin e këtyre të dhënave nga ana e Hima Travel & Tours për <strong>bileta avioni</strong>, atëherë lutemi të na drejtoheni me shkrim në adresën e mëposhtme:
                </p>
                <p className="mt-4 text-gray-700">
                  <strong>Personi Përgjegjës për Privatësinë:</strong><br />
                  Hima Travel & Tours<br />
                  Rruga Muhamet Gjollesha, përballë hyrjes së rrugës Myslym Shyri<br />
                  Tiranë, Albania
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
