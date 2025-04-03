import React from 'react';
import { Navbar } from '../components/Navbar';
import { GlobalFooter } from '../components/common/GlobalFooter';
import { Plane, Users, Globe, ChevronDown, Plus, Minus, Info, MapPin, Phone, Mail, ArrowRight, Briefcase, Award, Calculator } from 'lucide-react';
import { SEOHead } from '../components/SEO/SEOHead';

export default function CareersPage() {
  const handleApply = () => {
    const subject = encodeURIComponent('Aplikim për Punë - Hima Travel');
    const body = encodeURIComponent('Përshëndetje,\n\nPo aplikoj për pozicionin...');
    window.location.href = `mailto:kontakt@himatravel.com?subject=${subject}&body=${body}`;
  };

  // SEO schema for job posting
  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Këshilltar/e Udhëtimesh & Rezervimesh Bileta Avioni',
    description: 'Kërkojmë një këshilltar/e udhëtimesh me përvojë në shitjen e biletave të avionit dhe paketave turistike. Duhet të keni njohuri të mira të gjuhëve të huaja dhe aftësi të shkëlqyera komunikuese.',
    datePosted: new Date().toISOString(),
    validThrough: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Hima Travel',
      sameAs: 'https://himatravel.com',
      logo: 'https://himatravel.com/wp-content/uploads/2020/11/logo-768x277.png'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rr.Myslym Shyri, Kryeqzimi me Muhamet Gjolleshen',
        addressLocality: 'Tiranë',
        addressRegion: 'Tiranë',
        postalCode: '1001',
        addressCountry: 'AL'
      }
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: 400,
        maxValue: 800,
        unitText: 'MONTH'
      }
    },
    skills: 'Bileta avioni, Rezervime hotelesh, Paketa turistike, Komunikim, Shitje'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Mundësi Karriere | Bileta Avioni | Hima Travel | Punë në Turizëm"
        description="Zbuloni mundësitë e karrierës në Hima Travel. Bashkohuni me ekipin tonë të specializuar në bileta avioni dhe shërbime turistike. Apliko tani për pozicione në shitje, marketing dhe rezervime."
        canonicalUrl="/careers"
        schema={jobPostingSchema}
        keywords={[
          'bileta avioni',
          'punë në turizëm',
          'karrierë hima travel',
          'punë agjenci udhëtimi',
          'këshilltar udhëtimi',
          'specialist bileta avioni',
          'punë në tiranë',
          'punë në agjenci turistike',
          'punë në rezervime',
          'punë në shitje bileta avioni'
        ]}
        language="sq"
      />
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <div className="relative bg-blue-600 text-white py-16 md:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80"
              alt="Travel background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply" />
          </div>

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Bashkohu me Hima Travel – Ekspertët e Biletave të Avionit
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Je pasionant për udhëtimet dhe ke përvojë në shitjen e biletave të avionit? Kërkojmë njerëz me eksperiencë, 
                energji dhe kreativitet për t'u bërë pjesë e ekipit tonë!
              </p>
              <button
                onClick={handleApply}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg 
                  font-semibold hover:bg-blue-50 transition-colors duration-200 transform hover:scale-105"
              >
                <Plane className="w-5 h-5 mr-2" />
                Apliko Tani
              </button>
            </div>
          </div>
        </div>

        {/* Why Join Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Në Hima Travel, nuk është vetëm punë – është një eksperiencë!
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Bëhu pjesë e një ekipi që ofron shërbimin më të mirë për bileta avioni dhe paketa turistike në Shqipëri.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-blue-50 rounded-xl p-6 transform hover:-translate-y-1 transition-transform duration-200">
                <Globe className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Agjenci e Njohur
                </h3>
                <p className="text-gray-600">
                  Jemi një nga agjencitë më të njohura në Shqipëri për bileta avioni që nga viti 2011
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 transform hover:-translate-y-1 transition-transform duration-200">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ambient Dinamik
                </h3>
                <p className="text-gray-600">
                  Ambienti ynë është dinamik, kreativ dhe me mundësi zhvillimi në fushën e biletave të avionit
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 transform hover:-translate-y-1 transition-transform duration-200">
                <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ekspertë Biletash Avioni
                </h3>
                <p className="text-gray-600">
                  Puno me ekspertët më të mirë të biletave të avionit dhe udhëto në destinacionet më të njohura
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 transform hover:-translate-y-1 transition-transform duration-200">
                <Calculator className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Pagë Konkurruese
                </h3>
                <p className="text-gray-600">
                  Pagë e konkurrueshme & bonuse për performancën në shitjen e biletave të avionit
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Pozicionet e Hapura për Bileta Avioni
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Travel Advisor Position */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Këshilltar/e Biletash Avioni & Rezervimesh
                    </h3>
                    <div className="space-y-2 text-gray-600 mb-4">
                      <p>• Eksperiencë në shitjen e biletave të avionit dhe paketave turistike</p>
                      <p>• Njohuri të gjuhëve të huaja (anglisht, italisht)</p>
                      <p>• Aftësi të shkëlqyera komunikuese dhe shitëse</p>
                      <p>• Njohuri të sistemeve të rezervimit të biletave të avionit</p>
                    </div>
                    <button
                      onClick={handleApply}
                      className="text-blue-600 font-medium hover:text-blue-800"
                    >
                      Apliko për këtë pozicion →
                    </button>
                  </div>
                </div>
              </div>

              {/* Marketing Specialist Position */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Specialist Marketingu për Bileta Avioni
                    </h3>
                    <div className="space-y-2 text-gray-600 mb-4">
                      <p>• Eksperiencë në menaxhimin e fushatave për bileta avioni</p>
                      <p>• Aftësi për të krijuar përmbajtje vizuale për oferta fluturimesh</p>
                      <p>• Njohuri të Facebook, Instagram dhe Google Ads</p>
                      <p>• Eksperiencë në SEO për faqe biletash avioni</p>
                    </div>
                    <button
                      onClick={handleApply}
                      className="text-blue-600 font-medium hover:text-blue-800"
                    >
                      Apliko për këtë pozicion →
                    </button>
                  </div>
                </div>
              </div>

              {/* Finance Specialist Position */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calculator className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Specialist Finance për Bileta Avioni
                    </h3>
                    <div className="space-y-2 text-gray-600 mb-4">
                      <p>• Menaxhimi i detyrave financiare për shitjen e biletave të avionit</p>
                      <p>• Kontroll i detajuar në CRM dhe sistemet e rezervimit</p>
                      <p>• Monitorimi i arkës dhe transaksioneve të biletave</p>
                      <p>• Eksperiencë në kontabilitet dhe financa</p>
                    </div>
                    <button
                      onClick={handleApply}
                      className="text-blue-600 font-medium hover:text-blue-800"
                    >
                      Apliko për këtë pozicion →
                    </button>
                  </div>
                </div>
              </div>

              {/* Open Position Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Apliko për Pozicion në Bileta Avioni
                    </h3>
                    <p className="text-blue-100 mb-4">
                      Nuk gjeni pozicionin e duhur? Na tregoni për aftësitë tuaja dhe 
                      se si mund të kontribuoni në suksesin e shitjes së biletave të avionit.
                    </p>
                    <button
                      onClick={handleApply}
                      className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg 
                        font-medium hover:bg-blue-50 transition-colors"
                    >
                      <Plane className="w-4 h-4 mr-2" />
                      Dërgo Aplikimin
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Përfitimet e Punës me Bileta Avioni
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Udhëtime me Çmime Speciale</h3>
                <p className="text-gray-600">
                  Stafi ynë përfiton çmime speciale për bileta avioni dhe paketa turistike për vete dhe familjarët.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Trajnime Profesionale</h3>
                <p className="text-gray-600">
                  Ofrojmë trajnime të vazhdueshme për sistemet e rezervimit të biletave të avionit dhe teknikat e shitjes.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Bonuse Bazuar në Performancë</h3>
                <p className="text-gray-600">
                  Sistem bonusesh bazuar në shitjet e biletave të avionit dhe kënaqësinë e klientëve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Si të Aplikosh për Bileta Avioni?</h2>
              
              <div className="bg-blue-50 rounded-xl p-8 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Dërgo CV dhe Letër Motivimi
                </h3>
                <div className="flex justify-center mb-6">
                  <a
                    href="mailto:kontakt@himatravel.com"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg 
                      font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    kontakt@himatravel.com
                  </a>
                </div>
                <p className="text-gray-600">
                  Ose na vizito në zyrat tona për një bisedë të lirë rreth mundësive në fushën e biletave të avionit!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Zyra në Tiranë</h4>
                  <p className="text-gray-600">
                    Kryqëzimi i Rrugës Muhamet Gjollesha me Myslym Shyrin
                  </p>
                  <p className="text-blue-600 mt-2">
                    <Phone className="w-4 h-4 inline mr-1" /> +355 694 767 427
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Zyra në Durrës</h4>
                  <p className="text-gray-600">
                    Rruga Aleksandër Goga, përballë Shkollës Eftali Koçi
                  </p>
                  <p className="text-blue-600 mt-2">
                    <Phone className="w-4 h-4 inline mr-1" /> +355 699 868 907
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-xl text-blue-600 font-medium">
                  Nëse je gati për një karrierë në fushën e biletave të avionit, Hima Travel është vendi i duhur për ty! 🚀
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Pyetje të Shpeshta për Karrierën në Bileta Avioni
            </h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">Çfarë kualifikimesh nevojiten për të punuar me bileta avioni?</h3>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-4 bg-gray-50">
                    <p className="text-gray-600">
                      Për të punuar me bileta avioni, zakonisht kërkohet një diplomë në turizëm ose fushë të ngjashme, njohuri të sistemeve të rezervimit (Amadeus, Sabre, etj.), aftësi të mira komunikimi dhe njohuri të gjuhëve të huaja. Eksperienca e mëparshme në agjenci udhëtimi është një avantazh i madh.
                    </p>
                  </div>
                </details>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">A ofron Hima Travel trajnime për sistemet e rezervimit të biletave?</h3>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-4 bg-gray-50">
                    <p className="text-gray-600">
                      Po, Hima Travel ofron trajnime të plota për të gjitha sistemet e rezervimit të biletave të avionit që përdorim. Edhe nëse nuk keni përvojë të mëparshme me këto sisteme, por keni aftësi të mira dhe dëshirë për të mësuar, ne do t'ju trajnojmë plotësisht.
                    </p>
                  </div>
                </details>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">Si funksionon sistemi i bonuseve për shitjen e biletave të avionit?</h3>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-4 bg-gray-50">
                    <p className="text-gray-600">
                      Sistemi ynë i bonuseve bazohet në numrin e biletave të avionit të shitura dhe vlerën e tyre. Çdo punonjës ka objektiva mujore dhe për çdo biletë mbi objektivin, fiton një bonus shtesë. Gjithashtu, kemi bonuse speciale për shitjen e biletave në destinacione të caktuara ose gjatë periudhave të pikut.
                    </p>
                  </div>
                </details>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">A mund të aplikoj nëse nuk kam përvojë në shitjen e biletave të avionit?</h3>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-4 bg-gray-50">
                    <p className="text-gray-600">
                      Ndërsa përvoja në shitjen e biletave të avionit është e preferuar, ne shpesh pranojmë kandidatë pa përvojë specifike nëse kanë aftësi të forta komunikimi, njohuri të gjuhëve të huaja dhe pasion për industrinë e udhëtimit. Ofrojmë trajnime të plota për të gjithë punonjësit e rinj.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}