import React from 'react';
import { Navbar } from '../components/Navbar';
import { GlobalFooter } from '../components/common/GlobalFooter';
import {
  Plane,
  MapPin,
  CheckCircle,
  Globe,
  Calendar,
  Star,
  Clock,
  Shield
} from 'lucide-react';
import { SEOHead } from '../components/SEO/SEOHead';

export default function AboutPage() {
  // SEO schema for travel agency
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Hima Travel',
    description:
      'Agjenci udhëtimi e specializuar në bileta avioni me çmimet më të mira. Ofrojmë bileta avioni, pushime dhe shërbime turistike që nga viti 2011.',
    url: 'https://biletaavioni.himatravel.com/about',
    logo: 'https://himatravel.com/wp-content/uploads/2020/11/logo-768x277.png',
    telephone: '+355 694 767 427',
    email: 'kontakt@himatravel.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Rruga Muhamet Gjollesha, përballë hyrjes së rrugës Myslym Shyri',
      addressLocality: 'Tiranë',
      addressRegion: 'Tiranë',
      postalCode: '1001',
      addressCountry: 'AL'
    },
    openingHours: 'Mo-Sa 09:00-19:00',
    priceRange: '€€',
    sameAs: [
      'https://facebook.com/himatravel',
      'https://instagram.com/himatravel'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Rreth Nesh | Bileta Avioni Online | Hima Travel | Agjenci Udhëtimi"
        description="Hima Travel, agjencia juaj e besueshme për bileta avioni me çmimet më të mira që nga viti 2011. Ofrojmë bileta avioni, pushime dhe shërbime turistike të personalizuara për çdo udhëtim."
        canonicalUrl="/about"
        schema={schema}
        keywords={[
          'bileta avioni',
          'agjenci udhetimi',
          'bileta avioni online',
          'cmime bileta avioni',
          'hima travel',
          'fluturime',
          'bileta avioni te lira',
          'agjenci udhetimi tirane',
          'rezervime bileta avioni',
          'oferta udhetimi',
          'bileta avioni shqiperi',
          'fluturime direkte',
          'bileta avioni me oferte'
        ]}
        language="sq"
      />

      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Rreth Hima Travel - Ekspertët e Biletave të Avionit
              </h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="lead text-xl text-gray-600 mb-8">
                Që nga viti 2011, Hima Travel është bërë një nga agjencitë më të
                besuara të udhëtimit në Shqipëri, duke ofruar{' '}
                <strong>bileta avioni</strong>, pushime të organizuara, udhëtime
                me guida dhe rezervime hoteliere për mijëra klientë çdo vit. Me
                përvojë mbi një dekadë, ne jemi të përkushtuar për të ofruar
                shërbime cilësore,{' '}
                <strong>çmime konkurruese për bileta avioni</strong> dhe
                eksperienca të paharrueshme për udhëtarët tanë.
              </p>

              {/* Why Choose Us Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-2" />
                  Pse të Zgjidhni Hima Travel për Bileta Avioni?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-5 flex items-start">
                    <Clock className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Eksperiencë 12+ Vjeçare
                      </h3>
                      <p className="text-gray-600">
                        Ekspertë në bileta avioni dhe shërbime turistike që nga
                        viti 2011, me mijëra klientë të kënaqur.
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-5 flex items-start">
                    <Shield className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Garanci Çmimi për Bileta Avioni
                      </h3>
                      <p className="text-gray-600">
                        Ofrojmë çmimet më të mira të garantuara për bileta
                        avioni në të gjitha destinacionet.
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-5 flex items-start">
                    <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Shërbim i Personalizuar
                      </h3>
                      <p className="text-gray-600">
                        Çdo klient trajtohet individualisht me kujdes të veçantë
                        për nevojat e tyre të udhëtimit.
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-5 flex items-start">
                    <Calendar className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Rezervime Fleksibël
                      </h3>
                      <p className="text-gray-600">
                        Mundësi për ndryshime dhe anulime të biletave të avionit
                        sipas politikave të kompanive ajrore.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Destinations Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Destinacionet Kryesore për Bileta Avioni
                </h2>
                <p className="mb-6">
                  Hima Travel është specialist në organizimin e udhëtimeve dhe
                  gjetjen e biletave të avionit me çmimet më të mira për
                  destinacionet më të kërkuara në botë. Rrjeti ynë i gjerë i
                  partnerëve na lejon të ofrojmë bileta avioni me çmime
                  konkurruese për çdo destinacion.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">
                      🇮🇹 Itali - Bileta Avioni
                    </h3>
                    <p className="text-sm">
                      Romë, Milano, Venecia - fluturime direkte dhe me ndalesë
                      me çmimet më të mira.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">
                      🇬🇧 Angli - Bileta Avioni
                    </h3>
                    <p className="text-sm">
                      Londër, Manchester - oferta speciale për bileta avioni
                      gjatë gjithë vitit.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">
                      🇩🇪 Gjermani - Bileta Avioni
                    </h3>
                    <p className="text-sm">
                      Frankfurt, Mynih, Berlin - bileta avioni me çmime të
                      favorshme për çdo buxhet.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">
                      🇹🇷 Turqi - Bileta Avioni
                    </h3>
                    <p className="text-sm">
                      Stamboll, Antalia - fluturime direkte dhe oferta për
                      pushime all-inclusive.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">
                      🇬🇷 Greqi - Bileta Avioni
                    </h3>
                    <p className="text-sm">
                      Athinë, Selanik, ishujt - bileta avioni dhe paketa
                      pushimesh për verë.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">
                      🇺🇸 SHBA - Bileta Avioni
                    </h3>
                    <p className="text-sm">
                      New York, Chicago, Los Angeles - bileta avioni me çmimet
                      më konkurruese në treg.
                    </p>
                  </div>
                </div>
              </section>

              {/* Services Section */}
              <section className="bg-white rounded-xl border border-gray-100 p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Plane className="w-6 h-6 text-blue-600 mr-2" />
                  Shërbimet Tona për Bileta Avioni dhe Më Shumë
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Plane className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Bileta Avioni Online dhe në Zyrë
                      </h3>
                      <p className="text-gray-600">
                        Rezervime për bileta avioni në të gjithë botën me çmimet
                        më të mira të garantuara.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Paketa Turistike me Guidë
                      </h3>
                      <p className="text-gray-600">
                        Udhëtime të organizuara në grup ose private me bileta
                        avioni të përfshira.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Hotele & Resorte</h3>
                      <p className="text-gray-600">
                        Akomodime të përzgjedhura me vlerësime të larta, të
                        kombinuara me bileta avioni.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Viza & Siguracione Udhëtimi
                      </h3>
                      <p className="text-gray-600">
                        Asistencë për dokumentacionin e nevojshëm për udhëtim
                        dhe bileta avioni.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Na Kontaktoni për Bileta Avioni
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Tirana Office */}
                  <div>
                    <h3 className="font-semibold mb-4">
                      Zyra në Tiranë - Bileta Avioni
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-start">
                        <MapPin className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span>
                          Tek kryqëzimi i Rrugës Muhamet Gjollesha me Myslym
                          Shyrin, Tiranë
                        </span>
                      </p>
                      <p className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span>E Hënë - E Shtunë: 09:00 - 19:00</span>
                      </p>
                      <p className="flex items-center">
                        <Plane className="w-5 h-5 text-blue-600 mr-2" />
                        <span>Tel: +355 694 767 427</span>
                      </p>
                    </div>
                  </div>
                  {/* Durres Office */}
                  <div>
                    <h3 className="font-semibold mb-4">
                      Zyra në Durrës - Bileta Avioni
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-start">
                        <MapPin className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                        <span>
                          Rruga Aleksander Goga, Përballë Shkollës Eftali Koci,
                          Durrës
                        </span>
                      </p>
                      <p className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        <span>E Hënë - E Shtunë: 09:00 - 19:00</span>
                      </p>
                      <p className="flex items-center">
                        <Plane className="w-5 h-5 text-blue-600 mr-2" />
                        <span>Tel: +355 699 868 907</span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Pyetje të Shpeshta për Bileta Avioni
                </h2>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Kur është koha më e mirë për të rezervuar bileta avioni?
                    </h3>
                    <p className="text-gray-600">
                      Rekomandojmë rezervimin e biletave të avionit 2-3 muaj
                      përpara udhëtimit për çmimet më të mira. Për sezonin e
                      lartë (verë, festat e fundvitit), është mirë të rezervoni
                      4-6 muaj përpara.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      A mund të anuloj ose ndryshoj biletën time të avionit?
                    </h3>
                    <p className="text-gray-600">
                      Mundësia për anulim ose ndryshim varet nga kushtet e
                      biletës së avionit. Disa bileta lejojnë ndryshime me një
                      tarifë shtesë, ndërsa të tjera mund të jenë jo të
                      rimbursueshme. Kontaktoni agjentët tanë për asistencë të
                      personalizuar.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Si mund të gjej bileta avioni me çmimet më të mira?
                    </h3>
                    <p className="text-gray-600">
                      Për të gjetur bileta avioni me çmimet më të mira,
                      rekomandojmë të jeni fleksibël me datat, të rezervoni
                      herët, të përdorni platformën tonë online për të krahasuar
                      çmimet, ose të kontaktoni direkt me agjentët tanë që mund
                      t'ju ofrojnë oferta ekskluzive.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      A ofron Hima Travel garanci çmimi për bileta avioni?
                    </h3>
                    <p className="text-gray-600">
                      Po, Hima Travel ofron garanci çmimi për bileta avioni.
                      Nëse gjeni të njëjtin fluturim me çmim më të ulët brenda
                      24 orëve pas rezervimit, ne do të rimbursojmë diferencën.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
