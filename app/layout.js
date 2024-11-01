import localFont from "next/font/local";
import { Poppins } from 'next/font/google';
import "./globals.css";
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],  // Specify weights you need
  variable: '--font-poppins', // Optional variable for Tailwind CSS
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "PhotoPedia",
  description: "A web app for photographers to share there photos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
    >
      {children}
    </body>
  </html>
  );
}
