import { Shield, Lock, Server, FileText } from 'lucide-react';
import Image from 'next/image';

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
             src="/window.svg"
             alt="Pattern"
             fill
             className="object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-base md:text-lg text-emerald-100 max-w-2xl mx-auto">
            Komitmen kami untuk melindungi privasi dan data pribadi Anda saat mengakses Referensimuslim.id.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        <div className="prose prose-base md:prose-lg prose-emerald max-w-none text-gray-600">
          <p className="lead text-lg md:text-xl text-gray-700 mb-6 md:mb-8">
            Di Referensimuslim.id, privasi pengunjung adalah prioritas utama kami. Dokumen Kebijakan Privasi ini menguraikan jenis informasi yang kami kumpulkan dan bagaimana kami menggunakannya.
          </p>

          <div className="space-y-8 md:space-y-12">
            
            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Server className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Penggunaan Informasi</h2>
              </div>
              <p>
                Informasi yang kami kumpulkan digunakan untuk berbagai tujuan, termasuk:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Menyediakan, mengoperasikan, dan memelihara website kami.</li>
                <li>Meningkatkan, mempersonalisasi, dan memperluas website kami.</li>
                <li>Memahami dan menganalisis bagaimana Anda menggunakan website kami.</li>
                <li>Mengembangkan produk, layanan, fitur, dan fungsionalitas baru.</li>
                <li>Mencegah penipuan dan menjaga keamanan website.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Lock className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Perlindungan Data</h2>
              </div>
              <p>
                Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi terhadap akses tidak sah, perubahan, pengungkapan, atau perusakan data pribadi Anda. Namun, perlu diingat bahwa tidak ada metode transmisi melalui internet atau metode penyimpanan elektronik yang 100% aman.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Shield className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Kebijakan Pihak Ketiga</h2>
              </div>
              <p>
                Kebijakan Privasi Referensimuslim.id tidak berlaku untuk pengiklan atau situs web lain. Karena itu, kami menyarankan Anda untuk berkonsultasi dengan Kebijakan Privasi masing-masing dari server iklan pihak ketiga ini untuk informasi lebih rinci. Ini mungkin termasuk praktik mereka dan instruksi tentang cara <em>opt-out</em> dari opsi tertentu.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <FileText className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Persetujuan</h2>
              </div>
              <p>
                Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui Syarat dan Ketentuannya.
              </p>
            </section>

          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-500 text-center">
            <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
