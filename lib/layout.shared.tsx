import { ZenBlocksLogo } from "@/components/branding/zenblocks-logo";
import { HeaderPro } from "@/components/landing/header-pro";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <ZenBlocksLogo />
        </div>
      </div>
    ),
  },
  links: [
    {
      type: "custom",
      children: <HeaderPro />,
    },
  ],
};
