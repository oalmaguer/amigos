"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Navbar from "../navbar/page";

export default function PetDetails(props: any) {
  const { id } = props;
  const [pets, setPets] = useState<any>([]);
  useEffect(() => {
    fetch("/api/pets/" + id)
      .then((response) => response.json())
      .then((data) => {
        setPets(data.pets[0]);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f8f9fa]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9fa]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#343a40]">
                    Conoce a {pets.name}
                  </h1>
                  <p className="max-w-[600px] text-[#6c757d] md:text-xl">
                    {pets.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/petlist"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#6c757d] px-8 text-sm font-medium text-[#f8f9fa] shadow transition-colors hover:bg-[#495057] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#343a40] disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Ver todas las mascotas
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#6c757d] px-8 text-sm font-medium text-[#f8f9fa] shadow transition-colors hover:bg-[#495057] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#343a40] disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Adoptar a {pets.name}
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-[#6c757d] bg-[#f8f9fa] px-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#e9ecef] hover:text-[#495057] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#343a40] disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Contactar refugio
                  </Link>
                </div>
              </div>
              <img
                src={`${pets.picture}`}
                width="550"
                height="550"
                alt="Buddy"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full bg-[#f8f9fa]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#343a40]">
                  Adopta a {pets.name}
                </h2>
                <p className="max-w-[900px] text-[#6c757d] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Llena este formulario para ponernos en contacto.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-md py-6">
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-[#343a40]">
                    Nombre
                  </Label>
                  <Input id="name" placeholder="Tu Nombre" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-[#343a40]">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="Tu Email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message" className="text-[#343a40]">
                    Mensaje
                  </Label>
                  <Textarea id="message" rows={5} placeholder="Tu Mensaje" />
                </div>
                <Button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#6c757d] px-8 text-sm font-medium text-[#f8f9fa] shadow transition-colors hover:bg-[#495057] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#343a40] disabled:pointer-events-none disabled:opacity-50"
                >
                  Enviar
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#f8f9fa]">
        <p className="text-xs text-[#6c757d]">
          &copy; 2024 Paw Pals Animal Shelter. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-xs hover:underline underline-offset-4 text-[#6c757d]"
            prefetch={false}
          >
            Privacy
          </Link>
          <Link
            href="/"
            className="text-xs hover:underline underline-offset-4 text-[#6c757d]"
            prefetch={false}
          >
            Terms
          </Link>
        </nav>
      </footer>
    </div>
  );
}
