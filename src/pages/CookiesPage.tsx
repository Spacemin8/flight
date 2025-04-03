import React from 'react';
import { Navbar } from '../components/Navbar';
import { GlobalFooter } from '../components/common/GlobalFooter';
import { Cookie } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function CookiesPage() {
  // Generate structured data for the page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Politikat e Cookies | Bileta Avioni | Hima Travel',
    description: 'Informacion mbi përdorimin e cookies në faqen tonë të internetit për bileta avioni dhe si mund të menaxhoni preferencat tuaja të cookies.',
    url: 'https://biletaavioni.himatravel.com/cookies',
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
          name: 'Politikat e Cookies',
          item: 'https://biletaavioni.himatravel.com/cookies'
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Politikat e Cookies | Bileta Avioni | Hima Travel</title>
        <meta name="description" content="Informacion mbi përdorimin e cookies në faqen tonë të internetit për bileta avioni dhe si mund të menaxhoni preferencat tuaja të cookies për rezervime online." />
        <meta name="keywords" content="bileta avioni, cookies policy, politika e cookies, rezervime online, fluturime, bileta avioni online, cmime te lira, hima travel, privatësi bileta avioni" />
        <link rel="canonical" href="https://biletaavioni.himatravel.com/cookies" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biletaavioni.himatravel.com/cookies" />
        <meta property="og:title" content="Politikat e Cookies | Bileta Avioni | Hima Travel" />
        <meta property="og:description" content="Informacion mbi përdorimin e cookies në faqen tonë të internetit për bileta avioni dhe si mund të menaxhoni preferencat tuaja të cookies." />
        <meta property="og:image" content="https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png" />
        <meta property="og:locale" content="sq_AL" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Politikat e Cookies | Bileta Avioni | Hima Travel" />
        <meta name="twitter:description" content="Informacion mbi përdorimin e cookies në faqen tonë të internetit për bileta avioni dhe si mund të menaxhoni preferencat tuaja të cookies." />
        <meta name="twitter:image" content="https://himatravel.com/wp-content/uploads/2020/11/cropped-logo-1-192x192.png" />
        
        {/* Additional Meta Tags */}
        <meta name="author" content="Hima Travel" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
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
                <Cookie className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Politikat e Cookies për Bileta Avioni</h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <p>
                Kjo politikë e cookies shpjegon se çfarë janë cookies dhe si i përdorim ato në faqen tonë të internetit për bileta avioni. 
                Duke përdorur faqen tonë, ju pranoni përdorimin e cookies në përputhje me këtë politikë.
              </p>

              <h2>Çfarë janë Cookies?</h2>
              <p>
                Cookies janë skedarë të vegjël teksti që ruhen në pajisjen tuaj (kompjuter, tablet, telefon celular) 
                kur vizitoni faqen tonë të internetit për bileta avioni. Ato na ndihmojnë të sigurojmë funksionimin e duhur të faqes, 
                të përmirësojmë performancën dhe t'ju ofrojmë një përvojë më të personalizuar gjatë kërkimit dhe rezervimit të biletave avioni.
              </p>

              <h2>Si i Përdorim Cookies për Bileta Avioni</h2>
              <p>Ne përdorim cookies për qëllimet e mëposhtme:</p>
              
              <h3>Cookies të Domosdoshme për Bileta Avioni</h3>
              <ul>
                <li>Për të mundësuar funksionimin bazë të faqes së biletave të avionit</li>
                <li>Për të ruajtur statusin e sesionit tuaj të hyrjes gjatë kërkimit të fluturimeve</li>
                <li>Për të mbajtur mend zgjedhjet tuaja gjatë kërkimit të biletave avioni (destinacione, data, pasagjerë)</li>
                <li>Për të siguruar funksionalitetin e shportës së rezervimeve të biletave avioni</li>
              </ul>

              <h3>Cookies Analitike për Bileta Avioni</h3>
              <ul>
                <li>Për të kuptuar si përdoret faqja jonë e biletave të avionit</li>
                <li>Për të matur efektivitetin e reklamave tona për bileta avioni</li>
                <li>Për të analizuar trendet e kërkimit të fluturimeve dhe destinacioneve</li>
                <li>Për të përmirësuar shërbimet tona të biletave avioni bazuar në sjelljen e përdoruesve</li>
              </ul>

              <h3>Cookies të Marketingut për Bileta Avioni</h3>
              <ul>
                <li>Për t'ju shfaqur reklama relevante për bileta avioni</li>
                <li>Për të matur suksesin e fushatave tona të marketingut për fluturime</li>
                <li>Për t'ju ofruar përmbajtje të personalizuar për bileta avioni</li>
                <li>Për të ndjekur preferencat tuaja të udhëtimit dhe destinacionet e preferuara</li>
              </ul>

              <h2>Menaxhimi i Cookies për Bileta Avioni</h2>
              <p>
                Shumica e shfletuesve të internetit ju lejojnë të kontrolloni cookies përmes preferencave të tyre. 
                Ju mund të:
              </p>
              <ul>
                <li>Shikoni cookies të ruajtura në shfletuesin tuaj gjatë kërkimit të biletave avioni</li>
                <li>Fshini të gjitha ose disa cookies të lidhura me bileta avioni</li>
                <li>Bllokoni cookies nga faqe të caktuara të biletave avioni</li>
                <li>Bllokoni cookies të palëve të treta që ndjekin preferencat tuaja të udhëtimit</li>
                <li>Bllokoni të gjitha cookies, duke përfshirë ato të nevojshme për rezervimin e biletave avioni</li>
                <li>Fshini të gjitha cookies kur mbyllni shfletuesin pas kërkimit të fluturimeve</li>
              </ul>

              <div className="bg-yellow-50 rounded-lg p-6 my-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Kujdes për Bileta Avioni!</h3>
                <p className="text-gray-700">
                  Bllokimi i të gjitha cookies mund të ndikojë në funksionalitetin e faqes sonë të biletave avioni. 
                  Disa veçori të faqes, si ruajtja e preferencave të kërkimit të fluturimeve ose shporta e rezervimeve, 
                  mund të mos funksionojnë siç duhet nëse çaktivizoni cookies.
                </p>
              </div>

              <h2>Cookies të Palëve të Treta për Bileta Avioni</h2>
              <p>
                Ne përdorim shërbime nga palë të treta që mund të vendosin cookies në pajisjen tuaj gjatë kërkimit të biletave avioni. Këto përfshijnë:
              </p>
              <ul>
                <li>Google Analytics për analizën e trafikut të faqes së biletave avioni</li>
                <li>Shërbimet e reklamimit për reklama të personalizuara të fluturimeve dhe ofertave speciale</li>
                <li>Platforma të mediave sociale për përmbajtje të integruar lidhur me bileta avioni</li>
                <li>Shërbime pagese për procesimin e pagesave të biletave avioni</li>
              </ul>

              <h2>Përditësimet e Politikës së Cookies për Bileta Avioni</h2>
              <p>
                Ne mund të përditësojmë këtë politikë herë pas here për të reflektuar ndryshimet në përdorimin tonë 
                të cookies për bileta avioni. Ndryshimet do të hyjnë në fuqi sapo të publikohen në faqen tonë të internetit.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontakt për Politikën e Cookies të Biletave Avioni</h3>
                <p className="text-gray-700">
                  Nëse keni pyetje në lidhje me përdorimin e cookies në faqen tonë të biletave avioni, ju lutemi na kontaktoni:
                </p>
                <div className="mt-4 text-gray-700">
                  <strong>Hima Travel & Tours</strong><br />
                  Rruga Muhamet Gjollesha<br />
                  Përballë hyrjes së rrugës Myslym Shyri<br />
                  Tiranë, Shqipëri<br />
                  Email: kontakt@himatravel.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}