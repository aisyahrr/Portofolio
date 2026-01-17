import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Aisyah Rahmawati | Frontend Engineer",
  description: "Portfolio website built with Next.js",
  appleWebApp: {
    title: "Aisyah Rahmawati",
  },
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
      </body>
    </html>
  );
}
