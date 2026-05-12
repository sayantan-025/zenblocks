import { Manrope, Instrument_Sans } from "next/font/google"
import "./globals.css"
import SmoothScroll from "./components/ui/smooth-scroll"
import { baseMetadata } from "./lib/metadata"

export { baseMetadata }

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
})

export const metadata = baseMetadata

export default function QuillTemplateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScroll>
      <div className={`${manrope.variable} ${instrumentSans.variable} font-sans antialiased bg-zinc-950 text-zinc-100`}>
        <link
          href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%2309090B'/><path d='M10 24C10 24 8 18 12 14C14 12 18 10 22 8C22 8 20 12 18 16C16 20 14 24 14 24' fill='%2352525B'/><path d='M22 8C22 8 24 10 24 14C24 18 22 22 20 24L22 8Z' fill='%23FAFAFA'/><circle cx='10' cy='24' r='2' fill='%23A1A1AA'/></svg>"
        />
        {children}
      </div>
    </SmoothScroll>
  )
}
