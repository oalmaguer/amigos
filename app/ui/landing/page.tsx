"use client";

import Link from "next/link";
import PetList from "../petlist/page";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart, Info, PawPrint } from "lucide-react";
import { supabase } from "@/app/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Component() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase.from("pets").select();
      if (error) {
        console.error("Error fetching pets:", error);
      } else {
        setPets(data);
      }
    };

    fetchPets();
  }, []); // Empty dependency array means this runs once when the component mounts
  console.log(pets);
  return (
    <div className="bg-background text-foreground container flex flex-col gap-20">
      <main className="flex ">
        <div className="text flex self-center h-100 flex-col gap-4 justify-start w-3/4">
          <h1 className="text-7xl font-bold">Adopta una mascota</h1>
          <p className="text-lg w-4/6 font-medium text-muted-foreground">
            En amigos de los animales nos esforzamos por encontrar a cada
            mascota un hogar ideal, llena nuestro formulario de adopción y
            comienza tu nueva aventura.
          </p>
          <div className="buttons flex gap-4 ">
            <Link href="/about">
              <Button className="bg-orange-500 shadow-[0_4px_15px_rgba(255,165,0,0.5)] hover:shadow-[0_8px_20px_rgba(255,165,0,0.7)]  w-40 py-8 rounded-lg text-white hover:bg-orange-400 mt-10 self-start hover:scale-105 transition-all duration-300">
                Quiénes Somos
              </Button>
            </Link>
            <Link href="/petlist">
              <Button className="bg-sky-500 shadow-[0_4px_15px_rgba(100,149,237,0.5)] hover:shadow-[0_8px_20px_rgba(100,149,237,0.7)]  w-40 py-8 rounded-lg text-white hover:bg-sky-400 mt-10 hover:scale-105 transition-all duration-300">
                Ver Mascotas
              </Button>
            </Link>
          </div>
        </div>
        <div className="petimage mx-auto drop-shadow-xl">
          <Image src="/dog.png" alt="pet" width={300} height={300} />
        </div>
      </main>

      <div className="latest text-center">
        <h2 className="text-6xl text-center font-bold mb-16">
          Últimas Mascotas
        </h2>
        <PetList pets={pets} />
        <Link href="/petlist">
          <Button className="bg-orange-500 shadow-[0_4px_15px_rgba(255,165,0,0.5)] hover:shadow-[0_8px_20px_rgba(255,165,0,0.7)]  w-60 py-8 rounded-lg text-white hover:bg-orange-400 mt-16 self-start hover:scale-105 transition-all duration-300">
            Ver todas las Mascotas
          </Button>
        </Link>
      </div>
      <div className="abouth-100 flex flex-col  justify-between items-center">
        <h1 className="text-6xl font-bold text-center mb-16">
          Adopta con Nosotros!
        </h1>

        <div className="info flex flex-wrap gap-4">
          <div className="text sm:w-full md:w-1/2 lg:w-1/2 h-100 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">Amigos de los Animales</h2>
            <p className="text-start text-muted-foreground text-lg font-light">
              Somos una organización sin fines de lucro dedicada a promover la
              adopción responsable y el cuidado de animales. Nuestro objetivo es
              reducir la tasa de animales en período de desamparo y brindarles
              un hogar permanente a aquellos que lo necesitan.
            </p>
            <ul className="space-y-2 mt-5">
              <li className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-sky-500" />
                <span>Comprometidos con el bienestar animal</span>
              </li>
              <li className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-sky-500" />
                <span>Asesoría y apoyo en todo el proceso de adopción</span>
              </li>
              <li className="flex items-center space-x-2">
                <PawPrint className="w-4 h-4 text-sky-500" />
                <span>Variedad de mascotas</span>
              </li>
            </ul>
          </div>
          <div className="image ">
            <div className="image-container h-100 bg-white rounded-2xl w-full px-4 py-4 drop-shadow-xl">
              <Image
                src="/dogscalle.jpg"
                alt="about"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
