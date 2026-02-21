import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <span className="material-icons text-6xl text-primary mb-4">account_balance_wallet</span>
          <h1 className="text-2xl font-bold text-gray-900">Pembayaran Aman</h1>
          <p className="text-gray-500 mt-2">Silakan selesaikan pembayaran Anda melalui metode di bawah ini.</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-200">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <span className="text-gray-600 font-medium">Total Tagihan</span>
            <span className="font-bold text-lg text-gray-900">Rp Sesuai Produk</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Metode</span>
            <span className="font-semibold text-gray-900">Virtual Account / QRIS</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status</span>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">Menunggu</span>
          </div>
        </div>

        <button 
          className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition font-bold shadow-lg mb-3 flex items-center justify-center gap-2"
        >
          <span className="material-icons text-sm">qr_code_scanner</span> Tampilkan QRIS
        </button>

        <Link href="/" className="w-full bg-white text-gray-600 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition font-bold flex items-center justify-center gap-2">
          Batalkan & Kembali
        </Link>
      </div>
    </main>
  );
}