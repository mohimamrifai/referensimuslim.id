import { Mail, MapPin, Phone, Users, Shield, BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
             src="/window.svg"
             alt="Pattern"
             fill
             className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tentang Kami
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Menghadirkan referensi keislaman yang terpercaya, ilmiah, dan menyejukkan hati untuk umat.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-medium mb-4">
               <BookOpen className="w-4 h-4" /> Visi & Misi
             </div>
             <h2 className="text-3xl font-bold text-gray-900 mb-6">
               Menjadi Rujukan Utama Literasi Islam Digital
             </h2>
             <p className="text-gray-600 mb-6 leading-relaxed">
               Referensimuslim.id lahir dari kerinduan akan konten keislaman yang tidak hanya informatif, tetapi juga valid secara dalil dan disampaikan dengan bahasa yang santun serta mudah dipahami oleh berbagai kalangan.
             </p>
             <ul className="space-y-4">
               {[
                 'Menyajikan konten berdasarkan Al-Quran dan Sunnah dengan pemahaman para sahabat.',
                 'Mengedepankan validitas data dan referensi yang jelas.',
                 'Menghadirkan tampilan visual yang nyaman dan modern.',
                 'Menjadi wadah bagi asatidzah untuk menyebarkan ilmu yang bermanfaat.'
               ].map((item, idx) => (
                 <li key={idx} className="flex items-start gap-3">
                   <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                     <div className="w-2 h-2 rounded-full bg-emerald-600" />
                   </div>
                   <span className="text-gray-700">{item}</span>
                 </li>
               ))}
             </ul>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
             {/* Placeholder Image */}
             <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <span className="text-gray-400 font-medium">Ilustrasi Visi Misi</span>
             </div>
          </div>
        </div>

        {/* Nilai Kami */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prinsip yang kami pegang teguh dalam setiap konten yang kami sajikan.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Amanah Ilmiah',
                desc: 'Setiap artikel dan konten telah melalui proses kurasi ketat untuk memastikan kebenaran dalil dan referensinya.'
              },
              {
                icon: Users,
                title: 'Inklusif & Santun',
                desc: 'Menyampaikan kebenaran dengan cara yang hikmah, merangkul semua kalangan tanpa menghakimi.'
              },
              {
                icon: BookOpen,
                title: 'Komprehensif',
                desc: 'Membahas berbagai aspek kehidupan muslim mulai dari aqidah, ibadah, muamalah, hingga gaya hidup.'
              }
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-orange-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kontak */}
        <div id="contact" className="bg-emerald-50 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Hubungi Kami</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Punya pertanyaan, saran, atau ingin berkolaborasi? Kami sangat terbuka untuk mendengar dari Anda. Silakan hubungi kami melalui saluran berikut.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-gray-900">salam@referensimuslim.id</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">WhatsApp</div>
                    <div className="font-medium text-gray-900">+62 812-3456-7890</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Alamat</div>
                    <div className="font-medium text-gray-900">Jakarta Selatan, Indonesia</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
               <h3 className="text-lg font-bold text-gray-900 mb-4">Kirim Pesan</h3>
               <form className="space-y-4">
                 <div>
                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                   <input type="text" id="name" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Nama Anda" />
                 </div>
                 <div>
                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                   <input type="email" id="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="email@contoh.com" />
                 </div>
                 <div>
                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                   <textarea id="message" rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Tulis pesan Anda di sini..."></textarea>
                 </div>
                 <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                   Kirim Pesan
                 </button>
               </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
