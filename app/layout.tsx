import "./globals.css";
import Providers from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata = {
  title: "Aisyah Rahmawati | Frontend Engineer",
  description: "Portfolio website built with Next.js",
  appleWebApp: {
    title: "Aisyah Rahmawati",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-inter bg-(--background)">
        {children}
        <Providers />
        <SpeedInsights />
      </body>
    </html>
  );
}
