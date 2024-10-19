"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Navbar from "../navbar/page";
import { usePets } from "@/context/petsprovider";
import AdoptionForm from "../adoptionform/page";

export default function PetDetails(props: any) {
  const { id } = props;
  const pets2: any = usePets();
  const [pet, setPet] = useState<any>([]);

  useEffect(() => {
    const selectedPet = pets2.pets.find((pet: any) => pet.id === parseInt(id));

    if (!selectedPet) {
      fetchPet();
    } else {
      setPet(selectedPet);
    }
  }, [id, pets2.pets]); // Add dependencies to re-run effect when id or pets change

  const fetchPet = () => {
    fetch("/api/pets/" + id)
      .then((response) => response.json())
      .then((data) => {
        setPet(data.pets[0]);
      })
      .catch((error) => console.error(error));
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log(pet);
  return (
    <div className="flex flex-col min-h-[100dvh] ">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-orange-500">
                    Conoce a {pet.name}
                  </h1>
                  <p className="max-w-[600px] text-lg">{pet.description}</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/petlist"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-blue-400 px-8 text-sm font-medium text-[#f8f9fa] shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#343a40] disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Ver todas las mascotas
                  </Link>
                  <Button
                    onClick={() => scrollToSection("petform")}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-green-500 px-8 text-sm font-medium text-[#f8f9fa] shadow transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#343a40] disabled:pointer-events-none disabled:opacity-50"
                  >
                    Adoptar a {pet.name}
                  </Button>
                  {/* <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-[#6c757d] bg-[#f8f9fa] px-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#e9ecef] hover:text-[#495057] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#343a40] disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Contactar refugio
                  </Link> */}
                </div>
              </div>
              <img
                src={`${pet.picture}`}
                width="550"
                height="550"
                alt="Buddy"
                className="mx-auto  overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
      </main>

      <AdoptionForm pet={pet.id} />
    </div>
  );
}
