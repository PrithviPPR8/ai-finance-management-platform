import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"]})

export const metadata: Metadata = {
  title: "AI Finance Platform",
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
