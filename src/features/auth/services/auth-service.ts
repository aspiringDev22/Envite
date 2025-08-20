'use client'

import { AuthResponse, UserCredentials } from "@/features/auth/types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const AuthService = {
  //User signup
  signUp: async (credentials: UserCredentials): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      },
    );

      if (error || !data.user) {
        return { success: false, error: error?.message || "Signup failed." };
      }

      return {
        success: true,
        data: {
          user: data.user,
          session: data.session,
        },
      };
    } catch (error: any) {
      console.log("Error signing up:", error);
      return { success: false, error: error.message };
    }
  },

  //User signin
  signIn: async (credentials: UserCredentials): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return {
        success: true,
        data: {
          user: data.user,
          session: data.session,
        },
      };
    } catch (error: any) {
      console.log("error signing in", error);
      return { success: false, error: error.message };
    }
  },

  //User signout
  signOut: async (): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.log("error singing out", error);
      return { success: false, error: error.message };
    }
  },

  //Get User Session
  getSession: async (): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        return { success: false, error: error.message };
      }

      return {
        success: true,
        data: {
          user: data?.session?.user || null,
          session: data?.session || null,
        },
      };
    } catch (error: any) {
      console.log("error getting session", error);
      return { success: false, error: error.message };
    }
  },

  checkEmailExists: async (email: string): Promise<{ exists: boolean; error?: string }> => {
    try {
      // Using RPC to call a server-side function that checks if the email exists
      // You'll need to create this function in Supabase
      const { data, error } = await supabase.rpc('check_email_exists', {
        email_to_check: email
      });

      if (error) {
        console.error("Error checking email:", error);
        return { exists: false, error: error.message };
      }

      return { exists: data };
    } catch (error: any) {
      console.error("Exception checking email:", error);
      return { exists: false, error: error.message };
    }
  },

};
