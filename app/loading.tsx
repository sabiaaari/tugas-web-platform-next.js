export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Animasi Spinner menggunakan Tailwind CSS */}
      <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700 animate-pulse">
        Menyiapkan Aroma Terbaik...
      </h2>
      <p className="text-gray-500 mt-2 text-sm">Sedang mengambil data dari server</p>
    </div>
  );
}