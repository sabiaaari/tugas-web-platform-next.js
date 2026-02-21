import Link from "next/link";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar Simple untuk Halaman Tentang */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="material-icons text-primary text-3xl">spa</span>
              <span className="font-bold text-xl tracking-wide text-gray-900">AromaVibe</span>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-primary transition font-medium flex items-center gap-1">
              <span className="material-icons text-sm">arrow_back</span> Kembali ke Katalog
            </Link>
          </div>
        </div>
      </nav>

      {/* Konten Halaman */}
      <div className="flex-grow max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Image */}
          <div className="h-64 w-full relative">
            <img
              src="https://images.unsplash.com/photo-1765568691251-07bdb8bcd935?q=80&w=1200&auto=format&fit=crop"
              alt="Koleksi AromaVibe"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white tracking-wider">Tentang Kami</h1>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mendefinisikan Ulang Keanggunan</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              AromaVibe hadir sebagai destinasi utama bagi para wanita modern untuk menemukan aroma yang merepresentasikan identitas mereka. Kami mengkurasi parfum mewah dari berbagai penjuru dunia, memastikan setiap semprotan memberikan rasa percaya diri dan pesona yang tak terlupakan.
            </p>

            <div className="grid md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
              {/* Kontak */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary">support_agent</span> Hubungi Kami
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center gap-3">
                    <span className="material-icons text-gray-400">email</span>
                    <a href="mailto:hello@aromavibe.com" className="hover:text-primary transition">hello@aromavibe.com</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-icons text-gray-400">phone</span>
                    <span>+62 812 3456 7890 (WhatsApp)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-icons text-gray-400">location_on</span>
                    <span>Ruko Asia Plaza, Jl. HZ Mustofa Blok B-01, Yudanegara, Kec, Cihideung, Kota. Tasikmalaya, Jawa Barat</span>
                  </li>
                </ul>
              </div>

              {/* Media Sosial */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary">public</span> Media Sosial
                </h3>
                <div className="flex flex-col gap-3">
                  <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary transition">
                    <span className="material-icons text-gray-400">camera_alt</span> @aromavibe.id (Instagram)
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary transition">
                    <span className="material-icons text-gray-400">thumb_up</span> AromaVibe Official (Facebook)
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-primary transition">
                    <span className="material-icons text-gray-400">play_circle</span> AromaVibe Beauty (YouTube)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}