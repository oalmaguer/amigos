import type { Metadata } from "next";
import "./ui/globals.css";
import Navbar from "./ui/navbar/page";
import Footer from "./ui/footer/page";
import { PetsProvider } from "@/context";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth";
import { ThemeProvider } from "@/components/ui/themeprovider";

export const metadata: Metadata = {
  title: "Amigos App",
  description: "Hecho por OLiver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <AuthProvider>
          <PetsProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div className="flex-grow">{children}</div>
              <Footer />
            </ThemeProvider>
          </PetsProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
