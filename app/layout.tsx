import { Nunito } from "next/font/google";

import './globals.css'
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import { Html } from "next/document";

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

const font = Nunito({
  subsets: ["latin"]
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
          <ClientOnly>
            <Navbar />
          </ClientOnly>
        {children}
      </body>
    </html>
  )
}
