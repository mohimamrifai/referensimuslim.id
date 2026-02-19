import RegistrationForm from '@/components/ngaji/RegistrationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daftar Ngaji | Referensimuslim.id',
  description: 'Pendaftaran grup kajian Islam dan pengembangan pribadi Muslim.',
};

export default function DaftarNgajiPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-900">Daftar Ngaji</h1>
          
          <div className="prose prose-indigo max-w-none text-gray-700">
            <p className="lead text-lg text-center font-medium">
              Ykh Sholihin dan Sholihat
            </p>
            <p>
              Melalui formulir singkat ini membuka kesempatan pembentukan grup / kelompok Kajian Islam dan pengembangan pribadi Muslim. 
              Terbuka untuk seluruh muslim di manapun kota dan domisilinya.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">A. Tujuan Kajian</h3>
            <p>
              Di dalam pelaksanaannya, Aktivitas Tarbiyah Islamiyah (Pendidikan Islam) yang kami jalankan bertujuan membentuk pribadi muslim dengan 10 Kriteria berikut ini:
            </p>

            <div className="space-y-4 mt-4">
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">1</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Salimul Aqidah (Aqidah yang lurus dan selamat)</h4>
                  <p className="text-sm text-gray-600">Aqidahnya lurus dan bersih dari syirik, bid’ah, dan keraguan. Ia yakin sepenuh hati kepada Allah, Rasul, dan hari akhir.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">2</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Shahihul Ibadah (Ibadah sesuai tuntunan Nabi)</h4>
                  <p className="text-sm text-gray-600">Ibadahnya benar sesuai tuntunan Rasulullah ﷺ — shalat, tilawah, doa, dan semua ibadah dilakukan dengan disiplin dan adab.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">3</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Matinul Khuluq (akhlak yang kokoh)</h4>
                  <p className="text-sm text-gray-600">Memiliki akhlak yang kokoh: jujur, amanah, santun, tidak menyakiti, dan menjaga kehormatan diri serta orang lain.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">4</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Qawiyul Jism (fisik yang Bugar)</h4>
                  <p className="text-sm text-gray-600">Tubuh sehat, kuat, dan terjaga. Ia menjaga pola makan, tidur, kebersihan, dan kebugaran untuk menunjang amal dakwah.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">5</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Mutsaqqoful Fikri (wawasan yang luas)</h4>
                  <p className="text-sm text-gray-600">Wawasan luas dan terbuka. Ia memahami dasar-dasar Islam, isu masyarakat, ilmu kontemporer, dan mampu berpikir kritis.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">6</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Mujahidun Linafsihi (pandai Menjaga diri)</h4>
                  <p className="text-sm text-gray-600">Mampu melawan hawa nafsu dan godaan. Ia disiplin, sanggup menahan diri dari maksiat, dan berjuang memperbaiki diri.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">7</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Harishun ‘Ala Waqtihi (pandai kelola waktu)</h4>
                  <p className="text-sm text-gray-600">Sangat menjaga waktu. Tidak menunda, mampu mengatur prioritas, dan menggunakan waktunya untuk hal halal & bermanfaat.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">8</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Munazhzhamun Fi Syu’unihi (pandai ilmu manajemen)</h4>
                  <p className="text-sm text-gray-600">Tertata dalam urusan hidup: rapi, terencana, profesional, dan bertanggung jawab dalam tugas maupun kegiatan.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">9</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Qadirun ‘Alal Kasbi (mandiri)</h4>
                  <p className="text-sm text-gray-600">Mampu bekerja dan mandiri secara ekonomi. Ia tidak bergantung pada orang lain dan menjaga izzah hidupnya.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">10</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Nafi’un Lighairihi (bermanfaat bagi masyarakat)</h4>
                  <p className="text-sm text-gray-600">Bermanfaat bagi masyarakat: melayani, membantu, mengajar, menggerakkan, dan memberi solusi atas masalah di sekitarnya.</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8">B. Metode Kajian</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Peserta mendapatkan penempatan grup sesuai gender</li>
              <li>Dalam tiap grup terdapat pembina untuk memimpin kelas pembelajaran</li>
              <li>Sudah tersedia Kurikulum kajian yang terbukti membantu pembentukan karakter diri seorang muslim</li>
              <li>Pertemuan dilakukan secara Tatap Muka (offline)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-8">C. Metode Pengelompokkan</h3>
            <p>Peserta dikelompokkan berdasarkan:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Kedekatan Usia</li>
              <li>Domisili / Tempat Tinggal Saat ini</li>
              <li>Latar belakang Pendidikan</li>
              <li>Status Marital</li>
            </ul>
            
            <p className="mt-4 italic">
              Tujuannya agar memudahkan proses perkenalan dan mendapatkan banyak kesamaan yang dapat mewujudkan suasana belajar yang nyaman.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div id="form-daftar" className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white">
            <h2 className="text-2xl font-bold text-center">Formulir Pendaftaran</h2>
            <p className="text-center text-indigo-100 mt-2">Silakan lengkapi data diri Anda di bawah ini</p>
          </div>
          <div className="p-6 sm:p-8">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
