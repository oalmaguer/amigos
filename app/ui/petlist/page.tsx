"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
    <div className="grid grid-cols-1 ">
      <Carousel className="w-full ">
        <CarouselContent className="w-full">
          {pets.pets.map((_: any, index: number) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/4 items-stretch h-full"
            >
              <div className="p-1">
                <Card className="w-full max-w-sm rounded-lg  overflow-hidden shadow-md border-2 border-gray-300 ">
                  <img
                    src={`${_.picture}`}
                    width={300}
                    height={300}
                    alt="Pet"
                    className="w-full h-80 object-cover"
                  />
                  <CardContent className="flex flex-col  gap-2 items-center p-6">
                    <div className="flex flex-col justify-center w-full">
                      <h3 className="text-xl font-bold mb-2">{_.name}</h3>
                      <p className="text-sm  text-muted-foreground mb-4">
                        Edad: {_.age}
                      </p>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      {" "}
                      Disponible
                    </Badge>
                  </CardContent>
                  <div className="w-full text-center text-white flex justify-center p-2 bg-purple-500 hover:bg-purple-600 ">
                    <Link
                      href={`/petdetails/${_.id}`}
                      className="w-full h-9 font-medium text-lg"
                    >
                      Ver mas detalles
                    </Link>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* {pets.pets.map((pet: any) => (
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
              className="inline-flex w-full h-9 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-[#f8f9fa] shadow transition-colors hover:bg-[#495057] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#343a40] disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Adopta a {pet.name}
            </Link>
          </CardFooter>
        </Card>
      ))} */}
    </div>
  );
}
