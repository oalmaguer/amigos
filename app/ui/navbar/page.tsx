"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  // const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { user } = useAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      // Redirect to login page or home page after sign out
      router.push("/login");
    }
  };

  const { setTheme } = useTheme();

  return (
    <header className="container mx-auto py-8 px-4 md:px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="mb-2">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <PawPrintIcon className="h-6 w-6  text-orange-600  hover:text-orange-500" />
          <span className="text-xl font-bold text-orange-600">
            Amigos de los Animales
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium hover:underline hover:text-orange-500 transition duration-200 ease-in-out"
            prefetch={false}
          >
            Inicio
          </Link>
          <Link
            href="/petlist"
            className="text-sm font-medium hover:underline hover:text-orange-500  transition duration-200 ease-in-out"
            prefetch={false}
          >
            Adopta!
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline hover:text-orange-500  transition duration-200 ease-in-out"
            prefetch={false}
          >
            Quiénes Somos
          </Link>
          {/* <Link
            href="/adopta"
            className="text-sm font-medium hover:underline  hover:text-orange-500  transition duration-200 ease-in-out"
            prefetch={false}
          >
            Adopta
          </Link> */}

          <Link
            href="/donaciones"
            className="text-sm font-medium hover:underline  hover:text-orange-500  transition duration-200 ease-in-out"
            prefetch={false}
          >
            Donaciones
          </Link>

          {user && (
            <Link
              href="/addpet"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Agregar una Mascota
            </Link>
          )}

          {user && (
            <Link
              href="/lista-adopt"
              className="text-sm font-medium hover:underline"
              prefetch={false}
            >
              Ver lista de Adopciones
            </Link>
          )}
          {user && (
            <Button size="sm" variant="destructive" onClick={handleSignOut}>
              Cerrar Sesión
            </Button>
          )}
        </nav>
        <a href="mailto:almaguero95@gmail.com">
          <Button
            size="sm"
            className="hidden md:inline-flex bg-orange-600 text-white"
          >
            Contáctanos
          </Button>
        </a>
        <button className="md:hidden text-primary" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden flex flex-col gap-4 mt-4">
          <Link
            href="/"
            className="text-sm font-medium hover:underline"
            prefetch={false}
            onClick={toggleMobileMenu}
          >
            Inicio
          </Link>
          <Link
            href="/petlist"
            className="text-sm font-medium hover:underline"
            prefetch={false}
            onClick={toggleMobileMenu}
          >
            Ver todas las Mascotas
          </Link>
          <Link
            href="/adopta"
            className="text-sm font-medium hover:underline"
            prefetch={false}
            onClick={toggleMobileMenu}
          >
            Adopta
          </Link>
          <Link
            href="/donaciones"
            className="text-sm font-medium hover:underline"
            prefetch={false}
            onClick={toggleMobileMenu}
          >
            Donaciones
          </Link>
          <a
            href="mailto:almaguero95@gmail.com"
            className="text-sm font-medium hover:underline"
            onClick={toggleMobileMenu}
          >
            Contáctanos
          </a>
          {user && (
            <>
              <Link
                href="/addpet"
                className="text-sm font-medium hover:underline"
                prefetch={false}
                onClick={toggleMobileMenu}
              >
                Agregar una Mascota
              </Link>

              <Link
                href="/lista-adopt"
                className="text-sm font-medium hover:underline"
                prefetch={false}
                onClick={toggleMobileMenu}
              >
                Ver lista de Adopciones
              </Link>
              <Button size="sm" variant="destructive" onClick={handleSignOut}>
                Cerrar Sesión
              </Button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

function PawPrintIcon(props: any) {
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
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  );
}

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function MenuIcon(props: any) {
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
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
