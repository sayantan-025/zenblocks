import { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "./constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | High-Performance SaaS Landing Page`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
  },
};

export default function SaasLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate">
      {children}
    </div>
  );
}
