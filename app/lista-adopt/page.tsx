'use client';
import { createClient } from "@/utils/supabase/server";
import AdoptionTable from "../ui/adoptiontable/page";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";

export default function AdoptList() {
  const router = useRouter();
  const { user } = useAuth();
  console.log('user', user)
  const [adoptions, setAdoptions] = useState<any>([]);
  const [petData, setPetData] = useState<any>([]);
  
  useEffect(() => {
if (!user) router.push('/login')
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
    console.log(convert);

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
      console.log(result);
      return result;
    }
  };

  return <AdoptionTable adoptions={adoptions} />;
}
