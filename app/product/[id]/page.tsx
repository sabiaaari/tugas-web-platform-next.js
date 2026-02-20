import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  thumbnail: string;
  brand?: string;
}

// Ini adalah implementasi Server-Side Rendering (SSR)
export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  // Di Next.js versi terbaru, params harus di-await terlebih dahulu
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Mengambil data spesifik 1 produk dari API
  // Parameter { cache: "no-store" } adalah KUNCI dari SSR. 
  // Ini memaksa Next.js untuk tidak men-cache halaman, melainkan selalu merender ulang di server setiap kali diakses.
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Produk tidak ditemukan.</h1>
      </div>
    );
  }

  const product: Product = await res.json();

  // Format ke Rupiah
  const formatRupiah = (usdPrice: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(usdPrice * 15000);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition mb-8 font-medium">
          <span className="material-icons text-sm">arrow_back</span> Kembali ke Katalog
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* Gambar Produk */}
          <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="max-w-full h-auto object-contain mix-blend-multiply drop-shadow-xl"
            />
          </div>

          {/* Detail Produk */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              {product.brand || 'Luxury Fragrance'}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
            
            <div className="mt-auto pt-8 border-t border-gray-100">
              <p className="text-3xl font-bold text-gray-900 mb-6">{formatRupiah(product.price)}</p>
              
              <Link href="/" className="w-full bg-primary text-white py-4 rounded-xl hover:bg-pink-700 transition font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                <span className="material-icons">shopping_bag</span> Kembali Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}