import React from 'react';
import { Navbar } from '../components/Navbar';
import { GlobalFooter } from '../components/common/GlobalFooter';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SEOHead } from '../components/SEO/SEOHead';

export default function ContactPage() {
  // Create schema for contact page
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Hima Travel - Bileta Avioni',
    description: 'Kontaktoni Hima Travel për bileta avioni me çmimet më të mira. Rezervoni fluturime direkte dhe me ndalesë për destinacionet tuaja të preferuara.',
    url: 'https://biletaavioni.himatravel.com/contact',
    logo: 'https://himatravel.com/wp-content/uploads/2020/11/logo-768x277.png',
    telephone: '+355 694 767 427',
    email: 'kontakt@himatravel.com',
    openingHours: 'Mo-Sa 09:00-19:00',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rr.Myslym Shyri, Kryeqzimi me Muhamet Gjolleshen',
      addressLocality: 'Tiranë',
      addressRegion: 'Tiranë',
      postalCode: '1001',
      addressCountry: 'AL'
    },
    hasMap: 'https://www.google.com/maps/place/Hima+Travel+Agjensi+Udhetimi+%26+Turistike+-+Bileta+Avioni+Tirane',
    sameAs: [
      'https://facebook.com/himatravel',
      'https://instagram.com/himatravel'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Albania'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+355 694 767 427',
      contactType: 'customer service',
      areaServed: 'AL',
      availableLanguage: ['Albanian', 'English', 'Italian']
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Na Kontaktoni | Bileta Avioni | Rezervime Online | Hima Travel"
        description="Kontaktoni Hima Travel për bileta avioni me çmimet më të mira. Rezervoni fluturime direkte dhe me ndalesë për destinacionet tuaja të preferuara. Agjenci udhëtimi në Tiranë dhe Durrës."
        canonicalUrl="/contact"
        schema={contactSchema}
        keywords={[
          'bileta avioni',
          'kontakt bileta avioni',
          'rezervime bileta avioni',
          'agjenci udhetimi',
          'bileta avioni online',
          'cmime te lira',
          'fluturime',
          'rezervo bileta',
          'kontakt hima travel',
          'bileta avioni tirane',
          'bileta avioni durres',
          'fluturime direkte',
          'oferta udhetimi'
        ]}
        language="sq"
      />
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Na Kontaktoni për Bileta Avioni</h1>
            <p className="text-lg text-gray-600">
              Jemi këtu për t'ju ndihmuar me çdo pyetje ose rezervim për bileta avioni
            </p>
          </div>

          {/* Office Locations */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Tirana Office */}
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Zyra në Tiranë - Bileta Avioni</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    Tiranë, Tek kryqëzimi i Rrugës Muhamet Gjollesha me Myslym Shyrin
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <a href="tel:+355694767427" className="text-blue-600 hover:text-blue-800 transition-colors">
                    +355 694 767 427
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">E Hënë - E Shtunë: 09:00 - 19:00</span>
                </div>
              </div>

              <div className="w-full h-[300px] rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4053.628431047907!2d19.80204687678945!3d41.32344189995802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135031aa439cd9f9%3A0x3adc4758df5bcb79!2sHima%20Travel%20Agjensi%20Udhetimi%20%26%20Turistike%20-%20Bileta%20Avioni%20Tirane!5e1!3m2!1sen!2s!4v1741726786173!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hima Travel Tiranë - Bileta Avioni"
                ></iframe>
              </div>
            </div>

            {/* Durrës Office */}
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Zyra në Durrës - Bileta Avioni</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-600">
                    Rruga Aleksander Goga, Përballë Shkollës Eftali Koci
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <a href="tel:+355699868907" className="text-blue-600 hover:text-blue-800 transition-colors">
                    +355 699 868 907
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">E Hënë - E Shtunë: 09:00 - 19:00</span>
                </div>
              </div>

              <div className="w-full h-[300px] rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d348.09744179985995!2d19.445203970239138!3d41.3227227708329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134fdb581e5f506d%3A0x4d645fcf267865b9!2sBileta%20Avioni%20-%20Agjenci%20Udh%C3%ABtimi%20Hima%20Travel!5e1!3m2!1sen!2s!4v1741726913501!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hima Travel Durrës - Bileta Avioni"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kontaktoni me Ne për Bileta Avioni</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Email për Bileta Avioni</h3>
                <a 
                  href="mailto:kontakt@himatravel.com"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  kontakt@himatravel.com
                </a>
                <p className="text-sm text-gray-600">
                  Dërgoni kërkesën tuaj për bileta avioni dhe do t'ju përgjigjemi brenda 24 orëve
                </p>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Telefon për Bileta Avioni</h3>
                <div className="space-y-2">
                  <a 
                    href="tel:+355694767427"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    +355 694 767 427 (Tiranë)
                  </a>
                  <a 
                    href="tel:+355699868907"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    +355 699 868 907 (Durrës)
                  </a>
                </div>
                <p className="text-sm text-gray-600">
                  Telefononi për rezervime të menjëhershme të biletave të avionit
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Pyetje të Shpeshta për Bileta Avioni</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Si mund të rezervoj një biletë avioni?</h4>
                  <p className="text-gray-600">
                    Mund të rezervoni bileta avioni duke na kontaktuar në telefon, email, ose duke vizituar zyrat tona në Tiranë dhe Durrës. Gjithashtu mund të përdorni platformën tonë online për të kërkuar dhe rezervuar bileta.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Sa kohë përpara duhet të rezervoj biletën e avionit?</h4>
                  <p className="text-gray-600">
                    Rekomandojmë të rezervoni bileta avioni 2-3 muaj përpara udhëtimit për çmimet më të mira. Për sezonin e lartë (verë, festat e fundvitit), është mirë të rezervoni 4-6 muaj përpara.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">A ofron Hima Travel garanci çmimi për bileta avioni?</h4>
                  <p className="text-gray-600">
                    Po, Hima Travel ofron garanci çmimi për bileta avioni. Nëse gjeni të njëjtin fluturim me çmim më të ulët brenda 24 orëve pas rezervimit, ne do të rimbursojmë diferencën.
                  </p>
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