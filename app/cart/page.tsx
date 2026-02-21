import Link from "next/link";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-lg w-full">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-icons text-5xl text-primary">shopping_bag</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Belanja</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Keranjangmu masih kosong nih. Yuk, temukan aroma tanda tanganmu di katalog eksklusif kami!
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/" className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition font-bold shadow-lg shadow-primary/30 w-full block">
            Mulai Belanja
          </Link>
          <Link href="/" className="text-gray-500 hover:text-primary transition font-medium py-2 block">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}