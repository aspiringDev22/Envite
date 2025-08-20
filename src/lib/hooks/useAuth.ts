import { useAuthStore } from "@/store/auth/auth-store";
import { useEffect } from "react";

export const useAuth = () => {
  const authStore = useAuthStore();

  useEffect(() => {
    const unsubscribe = authStore.initialize();
console.log("Auth initialized", unsubscribe, authStore.user);
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  return authStore;
};
