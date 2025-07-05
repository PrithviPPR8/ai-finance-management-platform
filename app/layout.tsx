import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider} from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"]})

export const metadata: Metadata = {
  title: "AI Finance Management Platform",
  description: "One stop fincance platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className}`}
        >
          {/* header */}
          <Header />
          <main className="min-h-screen">
            {children}  
          </main>
          <Toaster richColors />
          {/* footer */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made with ❤️ by Prithvi</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
