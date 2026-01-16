import Sidebar from "@/components/sidebar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative lg:flex min-h-screen bg-(--background) px-4 lg:pr-32 lg:pl-24 py-5">
      <Sidebar />

      <main className="flex-1 md:px-8 md:py-2 overflow-y-auto overflow-x-hidden no-scrollbar bg-none ml-0 lg:ml-4 mt-3 lg:mt-0 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
