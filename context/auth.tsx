'use client';
import { supabase } from "@/app/lib/supabaseClient";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: null,
});


export const AuthProvider = ({ children } : any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check for an existing session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getSession();

    // Listen for authentication changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event: any, session : any) => {
      setUser(session?.user || null);
    });

    // Cleanup the listener on unmount
    return () => {
      
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user } }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)