import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Optimasi font standar industri Next.js
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "AromaVibe - Katalog Parfum Wanita",
  description: "Pusat keanggunan dan aroma memikat untuk wanita modern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${montserrat.variable} scroll-smooth`}>
      <body className="bg-gray-50 text-gray-800 font-sans antialiased relative">
        {children}
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} AromaVibe. Dibuat oleh Sixta Tabia Ritawan - 247006111049.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}