import { AuthService } from "@/features/auth/services/auth-service";
import { supabase } from "@/utils/supabase/client";
import { AuthState, UserCredentials } from "@/features/auth/types";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  email: "",
  password: "",

  initialize: async () => {
    set({ loading: true });

    //get init session
    const { data } = await AuthService.getSession();
    if (data) {
      set({ user: data.session?.user, session: data.session, loading: false });
    }

    //setup auth state change listener: subscribing to login/logout events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        set({
          user: session?.user,
          session: session,
        });
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  },

  checkEmailExists: async (email: string) => {
    set({ loading: true });
    const result = await AuthService.checkEmailExists(email);
    set({ loading: false });
    return result;
  },

  signUp: async (credentials: UserCredentials) => {
    set({ loading: true, error: null });
    // First check if email exists
    const { exists, error: checkError } = await AuthService.checkEmailExists(
      credentials.email
    );

    if (checkError) {
      set({ loading: false, error: checkError });
      return { success: false, error: checkError };
    }

    if (exists) {
      const errorMsg =
        "Email already exists!";
      set({ loading: false, error: errorMsg });
      return { success: false, error: errorMsg };
    }
    const response = await AuthService.signUp(credentials);
    if (!response.success) {
      set({ loading: false, error: response.error || "Signup Failed" });
      return response;
    }
    set({ loading: false, error: null });
    return response;
  },

  signIn: async (credentials: UserCredentials) => {
    set({ loading: true, error: null });
    const response = await AuthService.signIn(credentials);
    if (!response.success) {
      set({ loading: false, error: response.error || "Signin Failed" });
      return { success: false, error: response.error || "Signin Failed" };
    }
    set({ loading: false, error: null });
    return response;
  },

  signOut: async () => {
    set({ loading: true, error: null });
    const { error } = await AuthService.signOut();
    if (!error) {
      set({
        loading: false,
        error: null,
        session: null,
        user: null,
      });
    } else {
      set({
        loading: false,
        error: error,
      });
    }
  },

  setEmail: (email: string) => {
    set({ email });
  },

  setPassword: (password: string) => {
    set({ password });
  },
}));
