import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";


const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "",
  description: "Aplicação para gerenciamento hospitalar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${rethinkSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
