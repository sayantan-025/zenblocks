import { BentoMosaic } from "@/components/landing/bento-mosaic";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Integration } from "@/components/landing/integration";

const page = () => {
    return (
        <div className="relative">
            <Hero />
            <BentoMosaic />
            <Features />
            <Integration />
            <Footer />
        </div>
    );
};


export default page;