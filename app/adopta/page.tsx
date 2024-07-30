"use client";

import { usePets } from "@/context";
import AdoptionForm from "../ui/adoptionform/page";

export default function Adopta() {
  const pets2: any = usePets();

  return <AdoptionForm pets={pets2} />;
}
