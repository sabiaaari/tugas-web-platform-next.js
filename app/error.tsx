"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Di dunia nyata, error ini bisa dicatat ke layanan seperti Sentry
    console.error("Terjadi kesalahan:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <span className="material-icons text-6xl text-primary mb-4">error_outline</span>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Ups! Ada Sesuatu yang Salah</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Kami gagal mengambil data katalog produk saat ini. Pastikan koneksi internetmu stabil.
      </p>
      <button
        onClick={() => reset()}
        className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-medium shadow-lg flex items-center gap-2"
      >
        <span className="material-icons text-sm">refresh</span> Coba Lagi
      </button>
    </div>
  );
}