import LoaderRing from "@/components/shared/Loading";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return <LoaderRing/>;
  }
  return <>{children}</>;
}
