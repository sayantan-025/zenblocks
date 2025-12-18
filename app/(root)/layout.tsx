import Header from "@/components/landing/header";
import Footer from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "ZenBlocks - Open Source Components for Developers",
    default: "ZenBlocks",
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className="relative w-full pt-10 md:pt-0 bg-background text-foreground transition-colors duration-300 min h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
