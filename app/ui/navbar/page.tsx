import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <PawPrintIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Amigos de los Animales</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Inicio
          </Link>
          <Link
            href="/petlist"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Ver todas las Mascotas
          </Link>
          <Link
            href="/adopta"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Adopta
          </Link>
          {/* <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Voluntariado
          </Link> */}
          <Link
            href="/donaciones"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Donaciones
          </Link>
          {/* <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Sobre Nosotros
          </Link> */}
          <Link
            href="/addpet"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Agregar una Mascota
          </Link>
        </nav>
        <a href="mailto:almaguero95@gmail.com">
          <Button size="sm" className="hidden md:inline-flex">
            Contáctanos
          </Button>
        </a>
      </div>
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
