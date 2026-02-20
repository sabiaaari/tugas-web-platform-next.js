"use client";

import Link from "next/link";
import { useState, useMemo, KeyboardEvent } from "react";

// Tipe Data menyesuaikan struktur dari dummyjson.com
export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    thumbnail: string;
    brand?: string;
}

interface ChatMessage {
    sender: "ai" | "user";
    text: string;
}

export default function KatalogClient({ initialProducts }: { initialProducts: Product[] }) {
    // State Management (Memenuhi Syarat Wajib)
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [chatInput, setChatInput] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        { sender: "ai", text: "Halo! Saya AI asisten AromaVibe. Ingin mencari rekomendasi parfum yang elegan hari ini?" }
    ]);

    // Format ke Rupiah (Asumsi 1 USD = Rp 15.000)
    const formatRupiah = (usdPrice: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(usdPrice * 15000);
    };

    // Logika Filter Produk (CSR)
    const filteredProducts = useMemo(() => {
        const keyword = searchQuery.toLowerCase();
        return initialProducts.filter((p) =>
            p.title.toLowerCase().includes(keyword) ||
            (p.brand && p.brand.toLowerCase().includes(keyword))
        );
    }, [searchQuery, initialProducts]);

    const processTransaction = (name: string) => {
        const confirmBuy = window.confirm(`Lanjutkan ke pembayaran untuk parfum: ${name}?`);
        if (confirmBuy) {
            alert(`Mengarahkan ke halaman payment gateway (Midtrans/Stripe) untuk ${name}.`);
        }
    };

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    const sendMessage = () => {
        if (!chatInput.trim()) return;
        setChatMessages((prev) => [...prev, { sender: "user", text: chatInput.trim() }]);
        setChatInput("");

        setTimeout(() => {
            setChatMessages((prev) => [
                ...prev,
                { sender: "ai", text: 'Pilihan yang menarik! Untuk aroma yang mewah, saya merekomendasikan Dior atau Chanel. Ketik merek tersebut di kotak pencarian ya.' }
            ]);
        }, 1000);
    };

    const handleChatPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <>
            {/* 1. Navbar (Dikembalikan dengan ikon keranjang) */}
            <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <span className="material-icons text-primary text-3xl">spa</span>
                            <span className="font-bold text-xl tracking-wide text-gray-900">AromaVibe</span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#beranda" className="text-gray-600 hover:text-primary transition font-medium">Beranda</a>
                            <a href="#katalog" className="text-gray-600 hover:text-primary transition font-medium">Katalog</a>
                            <a href="/tentang" className="text-gray-600 hover:text-primary transition font-medium">Tentang Toko</a>
                        </div>
                        <div>
                            <button
                                className="text-gray-600 hover:text-primary transition relative p-2"
                                onClick={() => alert("Keranjang belanja sedang dikembangkan.")}
                            >
                                <span className="material-icons">shopping_bag</span>
                                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">0</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 2. Hero Section (Desain ala Marketplace Profesional) */}
            <section id="beranda" className="relative bg-gray-900 overflow-hidden">
                {/* Background Image dengan Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1616933934399-56ce5b40e704?auto=format&fit=crop&q=80&w=1920"
                        alt="Koleksi Parfum Mewah"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
                </div>

                {/* Konten Hero */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-start justify-center min-h-[70vh]">
                    <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block animate-fade-in">
                        Elegansi dalam Setiap Semprotan
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-2xl">
                        Temukan Aroma <br /> <span className="text-secondary font-serif italic">Tanda Tanganmu</span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-10 max-w-xl leading-relaxed">
                        Eksplorasi koleksi eksklusif parfum internasional. Dari aroma floral yang lembut hingga musk yang memikat, temukan identitas aromamu hari ini.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#katalog" className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-700 transition shadow-lg shadow-primary/30 flex items-center gap-2">
                            <span className="material-icons text-sm">local_mall</span> Belanja Sekarang
                        </a>
                        <button
                            onClick={toggleChat}
                            className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition flex items-center gap-2"
                        >
                            <span className="material-icons text-sm">auto_awesome</span> Tanya Asisten AI
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. Katalog & Pencarian */}
            <section id="katalog" className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                        <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-primary pl-3">Katalog Parfum</h2>
                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                placeholder="Cari parfum atau brand..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                            <span className="material-icons absolute left-3 top-2 text-gray-400">search</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col p-4">
                                    <div className="h-48 w-full relative mb-4 flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
                                        <img src={product.thumbnail} alt={product.title} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{product.brand || 'Luxury Fragrance'}</span>
                                        <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
                                        <p className="text-gray-900 font-bold text-lg mb-4 mt-auto">{formatRupiah(product.price)}</p>
                                        <Link
                                            href={`/product/${product.id}`}
                                            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium text-sm flex items-center justify-center gap-2"
                                        >
                                            <span className="material-icons text-sm">visibility</span> Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full text-center py-8">Parfum tidak ditemukan.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* 4. Informasi Toko & Lokasi (Dikembalikan!) */}
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
                <button onClick={toggleChat} className="bg-primary text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-pink-700 transition transform hover:scale-105">
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
                                <div key={idx} className={`p-3 rounded-lg max-w-[80%] shadow-sm ${msg.sender === "ai" ? "bg-secondary/40 text-gray-800 self-start rounded-tl-none" : "bg-primary text-white self-end rounded-tr-none"}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-t bg-white flex items-center gap-2">
                            <input type="text" placeholder="Ketik sesuatu..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={handleChatPress} className="w-full text-sm py-2 px-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
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