import { BentoMosaic } from "@/components/landing/bento-mosaic";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Integration } from "@/components/landing/integration";
import BentoGrid from "@/components/zenblocks/bento-grid";
import React from "react";

const page = () => {
    return <div>
        <Hero />
        <BentoMosaic />
        <Features />
        <Integration />
        <Footer />
    </div>;
};

export default page;