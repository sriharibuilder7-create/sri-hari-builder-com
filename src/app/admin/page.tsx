"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/admin/login");
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center">
      <Loader2 className="animate-spin text-gold" size={48} />
    </div>
  );
}
