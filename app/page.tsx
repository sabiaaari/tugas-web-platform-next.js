import KatalogClient, { Product } from "./KatalogClient";

// Ini adalah implementasi Static Site Generation (SSG)
export default async function Home() {
  
  // Mengambil data spesifik kategori parfum dari API publik dummyjson
  const res = await fetch("https://dummyjson.com/products/category/fragrances", {
    cache: "force-cache" // Memaksa Next.js menjadikannya halaman statis (SSG)
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data dari API");
  }

  // DummyJSON membungkus array produknya di dalam properti "products"
  const data = await res.json();
  const products: Product[] = data.products;

  // Mengoper data API ke Client Component
  return <KatalogClient initialProducts={products} />;
}