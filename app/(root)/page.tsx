import { BentoMosaic } from "@/components/landing/bento-mosaic";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Integration } from "@/components/landing/integration";
import { FloatingDock } from "@/components/zenblocks/floating-dock";


import { Home, Settings } from "lucide-react";

const items = [
    { title: "Home", icon: <Home />, href: "/" },
    { title: "Settings", icon: <Settings />, href: "/settings" }
];


const page = () => {
    return (
        <div className="relative">
            <Hero />
            <BentoMosaic />
            <Features />
            <Integration />
            <Footer />
            <div>
                <FloatingDock items={items} />

            </div>
        </div>
    );
};


export default page;