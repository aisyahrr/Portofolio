import Navbar from "@/components/dashboard/Navbar";
import Footer from "@/components/dashboard/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="bg-black min-h-screen flex flex-col text-white">
            <Navbar />
                <main className="flex-1 p-6">{children}</main>
            <Footer />
        </div>
  );
}
