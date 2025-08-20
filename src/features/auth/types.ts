import { User, Session } from '@supabase/supabase-js';

export interface UserCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  data?: {
    user: User | null;
    session: Session | null;
  }
}

export interface AuthState {
    user: User | null;
    session: Session | null;
    loading: boolean;
    error: string | null;
    email: string;
    password: string;
    initialize: () => any;
    signUp: (credentials: UserCredentials) => Promise<AuthResponse>;
    signIn: (credentials: UserCredentials) => Promise<AuthResponse>;
    signOut: () => Promise<void>;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    checkEmailExists: (email: string) => Promise<{ exists: boolean; error?: string }>;
} 











