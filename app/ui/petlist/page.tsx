"use client";
import { Button } from "@/components/ui/button";
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
    <div className="grid grid-cols-1">
      <Carousel className="w-full ">
        <CarouselContent className="w-full">
          {pets.pets
            .map((_: any, index: number) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3 "
              >
                <Card
                  key="1"
                  className="rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto hover:shadow-xl transition-all duration-200"
                >
                  <img
                    alt="Profile picture"
                    className="object-cover w-full"
                    height="320"
                    src={_.picture}
                    style={{ aspectRatio: "320/320", objectFit: "cover" }}
                    width="320"
                  />
                  <CardContent className="p-4">
                    <h2 className="text-2xl font-bold hover:text-gray-700 transition-all duration-200">
                      {_.name}
                    </h2>
                    <h3 className="text-gray-500 hover:text-gray-600 transition-all duration-200">
                      {_.breed}
                    </h3>
                    <p className="mt-2 text-gray-600 hover:text-gray-700 transition-all duration-200">
                      Edad: {_.age}
                    </p>
                    <div className="flex mt-4 space-x-2">
                      <Link
                        className="w-full bg-green-700 hover:bg-green-800 text-white border border-gray-100 p-1 rounded hover:border-gray-200 transition-all duration-200"
                        href={`/adopta`}
                      >
                        Adopta
                      </Link>
                      <Link
                        className="w-full bg-gray-0 hover:bg-gray-100 border border-gray-300 p-1 rounded hover:border-gray-200 transition-all duration-200"
                        href={`/petdetails/${_.id}`}
                      >
                        Ver mas detalles
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
            .reverse()}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
