import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import PreviewWrapper from "./preview-wrapper";
import { ThemeSwitcher } from "@/components/zenblocks/theme-switcher";

// Arrays to categorize components
const CENTERED_COMPONENTS = [
  "blocks/navbar",
  "animated-clock",
  "floating-dock",
  "modal-dialog",
  "image-gallery",
  "image-trail",
  "logo-loop",
  "pressure-test",
  "shuffle",
  "animated-button",
  "theme-switcher",
  "toast",
  "get-started-modal",
];

// const FULL_WIDTH_COMPONENTS = ["hero"];

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const { hideTheme } = await searchParams;
  if (!slug.length) return notFound();

  const componentName = slug.join("/");

  try {
    const shouldCenter = CENTERED_COMPONENTS.some((component) =>
      componentName.startsWith(component)
    );

    return (
      <div className="relative min-h-screen">
        {shouldCenter ? (
          <div className="min-h-screen flex items-center justify-center">
            <PreviewWrapper componentName={componentName} />
          </div>
        ) : (
          <PreviewWrapper componentName={componentName} />
        )}
        {!hideTheme && (
          <div className="fixed top-6 right-6 z-[100]">
            <ThemeSwitcher />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading component:", error);
    return notFound();
  }
}
