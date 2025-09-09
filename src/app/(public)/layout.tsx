import Navbar from "@/components/layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gradient-to-r from-[#1e1d1d] via-[#262626] to-[#1e1d1d]">{children}</div>
    </div>
  );
}
