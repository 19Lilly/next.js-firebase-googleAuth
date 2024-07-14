import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Time Tracker App",
  description: "Know how long exactly it takes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`{ inter.className } bg-zinc-950 w-full max-h-screen h-full p-4`}>{children}</body>
    </html>
  );
}
