'use client';
import { useEffect, useState } from "react";
import AddPetForm from "../ui/addpetform/page";
import { redirect, useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "@/context/auth";

export default function AddPet() {
  const router = useRouter();

  const { user } = useAuth();
  console.log('user', user)
  if (!user) router.push('/login')


  return <AddPetForm />;
}
