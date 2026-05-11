# ZenBlocks Project Instructions

## Design System Mandate
All UI development must strictly adhere to the ZenBlocks Design System located in `./design-system/zenblocks/MASTER.md`.

### Core Aesthetic
- **Style:** Enterprise-grade Modernism (Zinc monochrome, high contrast).
- **Buttons:** Always pill-shaped (`rounded-full`), balanced widths (`sm:w-64`), and no arrows in primary actions.
- **Typography:** Geist Sans/Mono.
- **Animation:** Use `framer-motion` for physics-based interactions.

### Architecture Rules
- Follow the **Focus Funnel** pattern for conversion pages (e.g., templates/docs).
- Maintain consistent spacing using Tailwind's standard scales as defined in the master file.
- **Template Management:** Template metadata for the gallery page is managed modularly in `./config/templates/`. Each template has its own file, and the registry is centralized in `./config/templates/index.ts`.

## Quality Standards
- No emojis as icons (use Lucide).
- `cursor-pointer` on all interactive elements.
- Ensure full dark mode compatibility using Zinc-950 for backgrounds.


