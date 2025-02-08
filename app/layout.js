import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const merchant = localFont({
  src: "/fonts/Merchant-Medium.woff2",
  variable: "--font-merchant",
  preload: true,
  display: "swap",
});

const neueMontrealFontRegular = localFont({
  src: "fonts/NeueMontreal-Regular.woff2",
  variable: "--font-neue-montreal-regular",
  preload: true,
  display: "swap",
});
const neueMontrealFont = localFont({
  src: "fonts/NeueMontreal-Medium.woff2",
  variable: "--font-neue-montreal",
  preload: true,
  display: "swap",
});

const everettFont = localFont({
  src: "fonts/Everett-Regular.ttf",
  variable: "--font-everett",
  preload: true,
  display: "swap",
});

export const metadata = {
  title: "Happy Birthday RHO",
  description: "Happy Birthday Reverend Helen Oyegoke",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${merchant.variable} ${neueMontrealFontRegular.variable} ${neueMontrealFont.variable} ${everettFont.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
