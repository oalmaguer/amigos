"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
// Define the shape of the context data
interface PetsContextType {
  pets: any[];
  setPets: React.Dispatch<React.SetStateAction<any[]>>; // Add setPets to the context type
}

// Create the context
const PetsContext = createContext<PetsContextType | undefined>(undefined);

// Create a provider component
export const PetsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pets, setPets] = useState<any[]>([]);

  const fetchPets = async () => {
    const { data, error } = await supabase.from("pets").select("*");
    if (error) {
      console.error("Error fetching pets:", error);
    } else {
      setPets(data);
    }
  };

  useEffect(() => {
    fetchPets();
    const interval = setInterval(fetchPets, 60000); // Refresh every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <PetsContext.Provider value={{ pets, setPets }}>
      {children}
    </PetsContext.Provider>
  );
};

// Create a custom hook to use the PetsContext
export const usePets = () => {
  const context = useContext(PetsContext);
  if (context === undefined) {
    throw new Error("usePets must be used within a PetsProvider");
  }
  return context;
};
