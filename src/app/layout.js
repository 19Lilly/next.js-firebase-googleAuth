import { Inter } from "next/font/google";
import "./globals.css";
import ThemeSwitcher from "./components/ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Time Tracker App",
  description: "Know how long exactly it takes",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`{ inter.className } bg-zinc-200 dark:bg-zinc-950 h-dvh max-w-6xl mx-auto p-4 text-2xl`}
      >
        <nav className='flex justify-end p-2'>
          <ThemeSwitcher />
        </nav>
        {children}
      </body>
    </html>
  );
}
