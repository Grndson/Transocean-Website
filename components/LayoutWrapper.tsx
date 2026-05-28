"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import FloatingButtons from "@/components/FloatingButtons";
import ChatWidget from "@/components/ChatWidget";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Navbar />
      {/* Spacer — height of TopBar (36px) + Navbar (72px) */}
      <div style={{ height: "108px" }} />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
      <ChatWidget />
    </>
  );
}