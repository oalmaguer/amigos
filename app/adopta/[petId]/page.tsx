"use client";

import { usePets } from "@/context/petsprovider";
import AdoptionForm from "../../ui/adoptionform/page";
import { useParams } from "next/navigation";

export default function Adopta() {
  const pets2: any = usePets();
  const { petId }: any = useParams();
  console.log(petId);
  console.log(pets2);
  if (pets2) {
    const pet = pets2.pets.find((pet: any) => pet.id === parseInt(petId));
    console.log(pet);
    return <AdoptionForm pet={pet} />;
  }
  return <div>No pet found</div>;
}
