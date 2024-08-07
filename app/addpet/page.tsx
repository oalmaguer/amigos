"use client";
import { useEffect, useState } from "react";
import AddPetForm from "../ui/addpetform/page";
import { redirect, useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "@/context/auth";

export default function AddPet() {
  const router = useRouter();
  const [session, setSession] = useState<any>("");

  useEffect(() => {
    const getPetsession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) router.push("/login");
      setSession(session);
    };

    getPetsession();
  }, [router]);
  return session ? <AddPetForm /> : <h1 className="text-center">Loading...</h1>;
}
