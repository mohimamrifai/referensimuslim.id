import { Copyright, AlertTriangle, Link, Gavel, FileSignature } from 'lucide-react';
import Image from 'next/image';

export default function TermsPage() {
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
            Syarat dan Ketentuan
          </h1>
          <p className="text-base md:text-lg text-emerald-100 max-w-2xl mx-auto">
            Harap membaca syarat dan ketentuan ini dengan saksama sebelum menggunakan layanan Referensimuslim.id.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        <div className="prose prose-base md:prose-lg prose-emerald max-w-none text-gray-600">
          <p className="lead text-lg md:text-xl text-gray-700 mb-6 md:mb-8">
            Selamat datang di Referensimuslim.id. Dengan mengakses atau menggunakan situs web ini, Anda setuju untuk terikat oleh syarat dan ketentuan berikut. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak diperkenankan menggunakan layanan kami.
          </p>

          <div className="space-y-8 md:space-y-12">
            
            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Copyright className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Hak Kekayaan Intelektual</h2>
              </div>
              <p>
                Kecuali dinyatakan lain, Referensimuslim.id dan/atau pemberi lisensinya memiliki hak kekayaan intelektual atas semua materi di situs web ini. Semua hak kekayaan intelektual dilindungi undang-undang. Anda dapat mengakses ini dari Referensimuslim.id untuk penggunaan pribadi Anda sendiri dengan tunduk pada batasan yang ditetapkan dalam syarat dan ketentuan ini.
              </p>
              <p className="mt-4">Anda dilarang untuk:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Mempublikasikan ulang materi dari Referensimuslim.id tanpa izin tertulis.</li>
                <li>Menjual, menyewakan, atau mensublisensikan materi dari Referensimuslim.id.</li>
                <li>Mereproduksi, menggandakan, atau menyalin materi dari Referensimuslim.id untuk tujuan komersial.</li>
                <li>Mendistribusikan ulang konten dari Referensimuslim.id (kecuali konten yang khusus dibuat untuk redistribusi).</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Batasan Tanggung Jawab</h2>
              </div>
              <p>
                Materi di situs web Referensimuslim.id disediakan &quot;apa adanya&quot;. Referensimuslim.id tidak memberikan jaminan, baik tersurat maupun tersirat, dan dengan ini menafikan dan meniadakan semua jaminan lainnya, termasuk tanpa batasan, jaminan tersirat atau kondisi yang dapat diperjualbelikan, kesesuaian untuk tujuan tertentu, atau non-pelanggaran atas kekayaan intelektual atau pelanggaran hak lainnya.
              </p>
              <p className="mt-4">
                Selanjutnya, Referensimuslim.id tidak menjamin atau membuat representasi apa pun mengenai keakuratan, kemungkinan hasil, atau keandalan penggunaan materi di situs webnya atau yang berkaitan dengan materi tersebut atau pada situs apa pun yang tertaut ke situs ini.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Link className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Tautan Pihak Ketiga</h2>
              </div>
              <p>
                Referensimuslim.id belum meninjau semua situs yang tertaut ke situs webnya dan tidak bertanggung jawab atas isi dari situs yang tertaut tersebut. Pencantuman tautan apa pun tidak menyiratkan pengesahan oleh Referensimuslim.id terhadap situs tersebut. Penggunaan situs web tertaut tersebut merupakan risiko pengguna sendiri.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <FileSignature className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Perubahan Syarat</h2>
              </div>
              <p>
                Referensimuslim.id dapat merevisi syarat layanan ini untuk situs webnya sewaktu-waktu tanpa pemberitahuan. Dengan menggunakan situs web ini, Anda setuju untuk terikat oleh versi Syarat dan Ketentuan Penggunaan yang berlaku saat itu.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Gavel className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 m-0">Hukum yang Berlaku</h2>
              </div>
              <p>
                Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Negara Republik Indonesia, dan Anda dengan tidak dapat ditarik kembali tunduk pada yurisdiksi eksklusif pengadilan di Negara atau lokasi tersebut.
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
