"use client";

import { useState, useMemo, FormEvent, KeyboardEvent } from "react";

// Tipe Data TypeScript (Standar Profesional)
interface Product {
  id: number;
  name: string;
  notes: string;
  price: number;
  img: string;
}

interface ChatMessage {
  sender: "ai" | "user";
  text: string;
}

// Data Dummy Katalog Produk
const PRODUCTS_DATA: Product[] = [
  { id: 1, name: "Midnight Rose", notes: "Floral, Woody", price: 450000, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Vanilla Mist", notes: "Sweet, Vanilla", price: 320000, img: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Ocean Breeze", notes: "Fresh, Citrus", price: 380000, img: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Jasmine Bloom", notes: "Floral, Musky", price: 410000, img: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=400" },
];

export default function Home() {
  // State Management (Memenuhi Syarat Tugas)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: "ai", text: "Halo! Saya AI asisten AromaVibe. Aroma seperti apa yang sedang kamu cari hari ini?" }
  ]);

  // Format Mata Uang Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);
  };

  // Logika Filter Produk yang teroptimasi
  const filteredProducts = useMemo(() => {
    const keyword = searchQuery.toLowerCase();
    return PRODUCTS_DATA.filter((p) =>
      p.name.toLowerCase().includes(keyword) || p.notes.toLowerCase().includes(keyword)
    );
  }, [searchQuery]);

  // Handler Transaksi
  const processTransaction = (name: string) => {
    const confirmBuy = window.confirm(`Lanjutkan ke pembayaran untuk produk: ${name}?`);
    if (confirmBuy) {
      alert(`Redirecting... Mengarahkan ke halaman payment gateway (Midtrans/Stripe) untuk ${name}.`);
    }
  };

  // Handler Chatbot
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    // Tambah pesan user
    setChatMessages((prev) => [...prev, { sender: "user", text: chatInput.trim() }]);
    setChatInput("");

    // Simulasi respons AI
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", text: 'Berdasarkan preferensimu, saya merekomendasikan aroma yang menyegarkan. Coba ketik "floral" di kotak pencarian produk!' }
      ]);
    }, 1000);
  };

  const handleChatPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* 1. Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="material-icons text-primary text-3xl">spa</span>
              <span className="font-bold text-xl tracking-wide text-gray-900">AromaVibe</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#beranda" className="text-gray-600 hover:text-primary transition font-medium">Beranda</a>
              <a href="#katalog" className="text-gray-600 hover:text-primary transition font-medium">Katalog</a>
              <a href="#lokasi" className="text-gray-600 hover:text-primary transition font-medium">Lokasi</a>
            </div>
            <div>
              <button 
                className="text-gray-600 hover:text-primary transition relative" 
                onClick={() => alert("Keranjang belanja sedang dikembangkan.")}
              >
                <span className="material-icons">shopping_bag</span>
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section id="beranda" className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Temukan Aroma <br /> Tanda Tanganmu
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Koleksi eksklusif parfum wanita. Tidak yakin mana yang cocok? Tanya langsung pada Asisten AI kami untuk rekomendasi terbaik.
          </p>
          <div className="flex gap-4">
            <a href="#katalog" className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition shadow-lg">Lihat Katalog</a>
            <button 
              onClick={toggleChat} 
              className="bg-white text-primary border border-primary px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition shadow-lg flex items-center gap-2"
            >
              <span className="material-icons">smart_toy</span> Tanya AI
            </button>
          </div>
        </div>
      </section>

      {/* 3. Katalog & Pencarian */}
      <section id="katalog" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-primary pl-3">Katalog Produk</h2>
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Cari aroma (mis. floral, vanilla)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
              <span className="material-icons absolute left-3 top-2 text-gray-400">search</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
                  <div className="h-64 overflow-hidden relative group">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-gray-700">
                      {product.notes}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-primary font-bold text-xl mb-4 mt-auto">{formatRupiah(product.price)}</p>
                    <button 
                      onClick={() => processTransaction(product.name)} 
                      className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition font-medium flex items-center justify-center gap-2"
                    >
                      <span className="material-icons text-sm">shopping_cart_checkout</span> Beli Sekarang
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-8">Produk tidak ditemukan.</p>
            )}
          </div>
        </div>
      </section>

      {/* 4. Informasi Toko & Lokasi */}
      <section id="lokasi" className="bg-gray-900 text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-icons text-primary">storefront</span>
              <h3 className="text-2xl font-bold">AromaVibe Studio</h3>
            </div>
            <p className="text-gray-400 mb-4">Pusat keanggunan dan aroma memikat untuk wanita modern.</p>
            <div className="flex items-center gap-3 text-gray-300 mb-2">
              <span className="material-icons">location_on</span>
              <p>Jl. Teknologi No. 42, Kota Inovasi, 12345</p>
            </div>
            <div className="flex items-center gap-3 text-gray-300 mb-2">
              <span className="material-icons">schedule</span>
              <p>Senin - Sabtu: 09.00 - 20.00 WIB</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg flex items-center justify-center p-8 text-center border border-gray-700">
            <div>
              <span className="material-icons text-4xl text-gray-500 mb-2">map</span>
              <p className="text-gray-400">Integrasi Google Maps dapat disematkan di sini.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Floating Chatbot AI */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleChat} 
          className="bg-primary text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-pink-700 transition transform hover:scale-105"
        >
          <span className="material-icons text-3xl">auto_awesome</span>
        </button>

        {isChatOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all origin-bottom-right">
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-icons">smart_toy</span>
                <h4 className="font-bold">AromaBot AI</h4>
              </div>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="h-64 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50 text-sm">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg max-w-[80%] shadow-sm ${
                    msg.sender === "ai" 
                    ? "bg-secondary/40 text-gray-800 self-start rounded-tl-none" 
                    : "bg-primary text-white self-end rounded-tr-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-3 border-t bg-white flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Ketik sesuatu..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleChatPress}
                className="w-full text-sm py-2 px-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button onClick={sendMessage} className="bg-primary text-white p-2 rounded-lg hover:bg-pink-700 flex items-center justify-center">
                <span className="material-icons text-sm">send</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}