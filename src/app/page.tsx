'use client';

import { useAuthStore } from "@/features/auth/store/auth-store";
import ProtectedRoute from "@/providers/protected-route";

export default function Home() {
  const {signOut} = useAuthStore();
  return (
    // <ProtectedRoute>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h2 className="color-[hsl(var(--geist-foreground))]">hi</h2>
          <button onClick={signOut}>Signout</button>
        </main>
      </div>
    // </ProtectedRoute>
  );
}
