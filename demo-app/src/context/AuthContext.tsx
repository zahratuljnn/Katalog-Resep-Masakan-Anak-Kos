// MODUL 4 - Global AuthContext & Real-time Session Subscription
// Menyimpan status login di satu tempat, lalu membagikannya ke semua layar.
import { Session, User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { supabase } from "../lib/supabase";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean; // true selama sesi lama sedang dibaca dari SecureStore
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    // 1. REHIDRASI: saat aplikasi dibuka, minta Supabase membaca token dari SecureStore
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (active) setSession(data.session);
      })
      .catch(() => {
        if (active) setSession(null); // gagal membaca -> anggap belum login
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    // 2. REAL-TIME: berlangganan perubahan sesi (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED)
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth Event Fired:", event);
      setSession(newSession);
      setLoading(false);
    });

    // 3. Berhenti berlangganan saat provider dilepas (cegah kebocoran memori)
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user: session?.user ?? null, session, loading }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook agar layar mana pun bisa membaca status login: const { user } = useAuth();
export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
