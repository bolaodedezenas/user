import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
// components
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "700"], // pesos corretos
  style: ["normal", "italic"], // estilos corretos
  subsets: ["latin"],
});

export const metadata = {
  title: "Bolão de Dezenas - usuários",
  description: "Bolão de Dezenas - Jogue e ganhe prêmios incríveis!",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${roboto.variable} ${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen flex flex-col `}
      >
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          toastOptions={{
            style: {
              fontSize: "1rem",
            },
          }}
        />
      </body>
    </html>
  );
}
