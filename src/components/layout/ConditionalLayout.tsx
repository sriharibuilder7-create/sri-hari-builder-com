"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <ScrollProgress />
      {children}
      <WhatsAppButton />
      <Footer />
    </>
  );
}
