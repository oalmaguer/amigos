"use client";
import { supabase } from "@/app/lib/supabaseClient";
import React, { createContext, useContext, useEffect, useState } from "react";

const PetsContext = createContext({
  pets: [],
});

export const PetsProvider = ({ children }: any) => {
  const [pets, setPets] = useState<any>([]);

  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase.from("pets").select("*");
      if (error) {
        console.error(error);
      } else {
        setPets(data);
      }
    };

    fetchPets();
  }, []);

  return (
    <PetsContext.Provider value={{ pets }}>{children}</PetsContext.Provider>
  );
};

export const usePets = () => useContext(PetsContext);
