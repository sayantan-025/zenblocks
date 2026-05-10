# Setup Guide

## Step 1 — Install dependencies
Run the following command to install the required npm packages:
```bash
npm install
```

## Step 2 — Init Shadcn UI
Initialize Shadcn UI in your project:
```bash
npx shadcn@latest init
```
**Recommended prompts:**
- Style: `Default`
- Color: `Zinc`
- CSS variables: `Yes`

## Step 3 — Install additional packages
Ensure these animation and theme packages are installed:
```bash
npm install framer-motion next-themes lucide-react
```

## Step 4 — Add Shadcn components
Add the necessary Shadcn UI components used in the template:
```bash
npx shadcn@latest add button card badge avatar accordion sheet separator
```

## Step 5 — Dark mode setup
Ensure your `app/layout.tsx` includes the `ThemeProvider`. It should look something like this:

```tsx
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Step 6 — Run dev server
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customizing Content
All the landing page content is centralized in the `data/` folder. You only need to edit these files to customize the template:
- `data/features.ts`: Edit the features list and icons.
- `data/testimonials.ts`: Update the developer testimonials.
- `data/pricing.ts`: Change the pricing plans and features.
- `data/faqs.ts`: Modify the frequently asked questions.

## Troubleshooting
- **Module not found**: Run `npm install` again to ensure all dependencies are resolved.
- **Dark mode broken**: Double check that the `ThemeProvider` is correctly wrapped around the `children` in `app/layout.tsx` and that the `class` attribute is being used.
- **Shadcn missing**: If a component looks unstyled or causes an error, re-run the `npx shadcn@latest add <component>` command.
- **Port in use**: Run `npm run dev -- -p 3001` to use a different port.
