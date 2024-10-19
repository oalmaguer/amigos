"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PetList({ pets }) {
  console.log(pets);
  const updatedPets = pets.filter((pet: any) => pet.status === 0);
  console.log(updatedPets);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {updatedPets.slice(0, 4).map((pet: any) => (
        <Card className="bg-white rounded-lg text-start" key={pet.id}>
          <img
            src={`${pet.picture}`}
            width={500}
            height={500}
            alt="Pet"
            className="w-full p-2 h-80 object-cover rounded-3xl hover:scale-105 transition-all duration-300"
          />
          <CardContent className="flex flex-col gap-2 p-4">
            <h3 className="text-2xl font-bold">{pet.name}</h3>
            <p className="text-md font-thin text-muted-foreground ">
              Edad: {pet.age}
            </p>
            <div className="flex justify-between">
              <Link
                href={`/petdetails/${pet.id}`}
                className="inline-flex items-center gap-2 text-sky-500 hover:underline"
                prefetch={false}
              >
                Ver mas detalles
              </Link>
              <Badge className="bg-green-500 text-white"> Disponible </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
      {/* <Carousel className="w-full ">
        <CarouselContent className="w-full">
          {pets.pets
            .map((_: any, index: number) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3 "
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
                    <div className="w-full text-center text-white flex justify-center p-2 bg-orange-400 hover:bg-orange-500 transition-colors ">
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
      </Carousel> */}
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
