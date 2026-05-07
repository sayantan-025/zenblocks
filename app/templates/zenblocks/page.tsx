import { BentoMosaic } from "@/components/landing/bento-mosaic";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Integration } from "@/components/landing/integration";

export default function ZenBlocksTemplatePreview() {
    return (
        <div className="relative">
            <Hero />
            <BentoMosaic />
            <Features />
            <Integration />
            <Footer />
        </div>
    );
}
