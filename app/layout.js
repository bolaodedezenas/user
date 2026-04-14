import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

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
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Vendedores",
  description: "Bolão de Dezenas - Vendedores",
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
        className={`${roboto.variable} ${geistSans.variable} ${geistMono.variable} flex flex-col h-[calc(100svh)] 
         `}
      >
         {children} 
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
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
