import Link from "next/link";
import PetList from "../petlist/page";

export default function Component() {
  return (
    <div className="bg-background text-foreground">
      <main>
        <section className="container text-center justify-center flex flex-col align-middle mx-auto py-12 px-4 md:px-6">
          <PetList />
        </section>
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">
              ¿Por qué Adoptar un Nuevo Amigo?
            </h2>
            <main className="flex-1 py-8 px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={PawPrintIcon}
                  title="Mascotas Verificadas"
                  description="Todas nuestras mascotas se entregan vacunadas y con su certificado médico."
                />
                <FeatureCard
                  icon={HeartIcon}
                  title="Cuidado"
                  description="Nuestro dedicado equipo de voluntarios y staff se encargan de brindar amor y cuidado a cada una de nuestras mascotas."
                />
                <FeatureCard
                  icon={HomeIcon}
                  title="Hogar"
                  description="Trabajamos durante todo el proceso de adopción para que cada una de nuestras mascotas tenga un hogar perfecto."
                />
              </div>
            </main>
          </div>
        </section>
        <section className="container mx-auto py-12 px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Cómo Adoptar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StepCard
              title="Paso 1: Explora las Mascotas"
              description="Echa un vistazo a nuestras mascotas disponibles para adoptar."
              link="/petlist"
              linkText="Ver Mascotas"
            />
            <StepCard
              title="Paso 2: Aplica para Adoptar"
              description="Llena el formulario de solicitud para adoptar una mascota y nuestro equipo revisará para asegurar la mejor coincidencia para usted y la mascota."
              link="/adopta"
              linkText="Aplicar para Adopción"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-background text-foreground shadow-md rounded-lg p-6 flex flex-col items-center justify-center gap-4 transition-colors">
      <Icon className="h-8 w-8 text-purple-500 mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({ title, description, link, linkText }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      <Link
        href={link}
        className="inline-flex items-center gap-2 text-purple-500 hover:underline"
        prefetch={false}
      >
        {linkText}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
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

function HeartIcon(props) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PawPrintIcon(props) {
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
