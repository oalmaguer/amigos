"use client";
import { createClient } from "@/utils/supabase/server";
import AdoptionTable from "../ui/adoptiontable/page";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { get } from "http";

export default function AdoptList() {
  const router = useRouter();
  const [adoptions, setAdoptions] = useState<any>([]);
  const [session, setSession] = useState<any>(null);

  const getPetsession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) router.push("/login");

    setSession(session);
  };
  useEffect(() => {
    getPetsession();
    getAdoptions();
  }, []);
  const getAdoptions = async () => {
    const response = await fetch("/api/adoption", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.error) return result.error;

    const convert = await Promise.all(
      result.data.map(async (elem: any) => {
        return { ...elem, pet: await getPets(elem.pet) };
      })
    );

    setAdoptions(convert);
  };

  const getPets = async (id: any) => {
    const response = await fetch(`/api/pets/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();

      return result;
    }
  };

  return <AdoptionTable adoptions={adoptions} />;
}
