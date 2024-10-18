import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from 'next/image'
import Logo from '../../public/app_logo.png'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WEB BUS",
  description: "Conver JSON to XML, XML formater, JSON formater, sitemap generater, web learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>  
        <div className="min-h-screen flex flex-col">      
          <header className="flex justify-between w-full mx-auto h-16 gradient-border-image text-white items-center">
            <nav className="container mx-auto h-full flex gap-4 items-center w-main">
              <div className="logo">
                <Image src={Logo} alt="webbus" width="143" height="80" />
              </div>
              <ul className="flex gap-4" id="menu">
                <li className="bg-blue-400 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"><Link href="/">HOME</Link></li>
                <li className="bg-blue-400 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"><Link href="/formatjson">FORMATJSON</Link></li>
                <li className="bg-blue-400 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"><Link href="/jsontoxml">JSONTOXML</Link></li>
              </ul>
            </nav>
          </header>
          <main className="container mx-auto main-container-min-hight">
            {children}
          </main> 
          <footer className="gradient-border-image text-white h-16">
            <div className="container h-full text-center w-main m-auto">
                &copy; {new Date().getFullYear()} My Website. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
