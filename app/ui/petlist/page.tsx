"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { usePets } from "@/context";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
const PetsContext = createContext([]);

export default function PetList() {
  // const [pets, setPets] = useState([]);
  const pets: any = usePets();

  // useEffect(() => {
  //   fetch("/api/pets")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPets(data);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pets.pets.map((pet: any) => (
        <Card className="bg-muted rounded-lg overflow-hidden h-30" key={pet.id}>
          <img
            src={`${pet.picture}`}
            width={300}
            height={300}
            alt="Pet"
            className="w-full h-48 object-cover"
          />
          <CardContent className="p-4">
            <h3 className="text-xl font-bold mb-2">{pet.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Edad: {pet.age}
            </p>
            <p className="text-sm">{pet.description}</p>
          </CardContent>
          <CardFooter>
            <Link
              href={`/petdetails/${pet.id}`}
              className="inline-flex w-full h-9 items-center justify-center rounded-md bg-[#6c757d] px-4 py-2 text-sm font-medium text-[#f8f9fa] shadow transition-colors hover:bg-[#495057] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#343a40] disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Adopta a {pet.name}
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
