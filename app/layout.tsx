{/* <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript" async />

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
// import Modal from "./components/modals/Modal";

import RentModal from "./components/modals/RentModal";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentuser from "./actions/getCurrentUser";


const font = Nunito({
  // variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata:Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default  async function RootLayout({
  children,
}: {
  children:React.ReactNode
}){
  const currentUser =await getCurrentuser();

  

  return (
    <html lang="en">
      <body
        className={font.className}>
         
         
        
         {/* <Modal actionLabel ="submit" title="Hello Folks!" isOpen /> */}
         
//           <ClientOnly>
//          <ToasterProvider/>
//          <RentModal/>
//          <LoginModal/>
//          <RegisterModal/>
//          <Navbar currentUser={currentUser} />
//          </ClientOnly>

//          <div className="pb-20 pt-28">

//          {children}

//          </div>
          
       
      
//       </body>
//     </html>
//   );
// } */}

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";

import RentModal from "./components/modals/RentModal";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import SearchModal from "./components/modals/SearchModal";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentuser from "./actions/getCurrentUser";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentuser();

  return (
    <html lang="en">
      <body className={font.className}>
        {/* Cloudinary Upload Widget */}
        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="beforeInteractive"
        />

        <ClientOnly>
          <ToasterProvider />
          <SearchModal/>
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>

        <div className="pb-20 pt-32">{children}</div>
      </body>
    </html>
  );
}

