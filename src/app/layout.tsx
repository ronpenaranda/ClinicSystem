import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lucky P & A Hardware",
  description: "This is a web portfolio made using next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="en">
      <body>
        <link
          rel="stylesheet"
          href="https://unpkg.com/primeicons/primeicons.css"
        />
        {children}
      </body>
    </html>
  );
}
