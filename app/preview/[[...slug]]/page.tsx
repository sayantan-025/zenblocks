import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import PreviewWrapper from "./preview-wrapper";

// Arrays to categorize components
const CENTERED_COMPONENTS = [
  "blocks/navbar",
  "animated-clock",
  "floating-dock",
  "image-gallery",
  "image-trail",
  "logo-loop",
  "pressure-test",
  "shuffle",
];

// const FULL_WIDTH_COMPONENTS = ["hero"];

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (!slug.length) return notFound();

  const componentName = slug.join("/");

  try {
    const shouldCenter = CENTERED_COMPONENTS.some((component) =>
      componentName.startsWith(component)
    );

    return shouldCenter ? (
      <div className="min-h-screen flex items-center justify-center">
        <PreviewWrapper componentName={componentName} />
      </div>
    ) : (
      <PreviewWrapper componentName={componentName} />
    );
  } catch (error) {
    console.error("Error loading component:", error);
    return notFound();
  }
}
