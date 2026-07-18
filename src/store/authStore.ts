import { create } from "zustand";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/services/supabase";

interface AuthState {
  user: SupabaseUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;
  setSession: (session: Session | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  hasSeenOnboarding: true, // Skipping onboarding for now based on your preferences
  completeOnboarding: () => set({ hasSeenOnboarding: true }),
  setSession: (session) => set({ 
    session, 
    user: session?.user ?? null, 
    isAuthenticated: !!session 
  }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isAuthenticated: false });
  },
}));

// Set up the listener for auth state changes globally
supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.getState().setSession(session);
});
