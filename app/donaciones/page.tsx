"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
export default function Donaciones() {
  const initialOptions = {
    clientId:
      "AYxoNEnDWM79W8AugCBZmo4CwvoTPnWWCA-fXSWEOW1YUtTWHo6ES3Xv_IBfmdCXeC1GQYAIlVD8umCl",
  };

  const [formData, setFormData] = useState({
    amount: "",
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (type: any, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [type]: value,
    }));
    
  };

  const handleCreateOrder = async () => {
    
    const formattedData = {
      ...formData,
      amount: parseInt(formData.amount),
    };
    

    const response = await fetch("/api/donacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      console.error("Error creating order", response.statusText);
      return;
    }

    const order = await response.json();
    
    return order.id;
  };

  return (
    <main>
      <section className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Dona a Amigos de los Animales!
            </h1>
            <p className="text-muted-foreground mb-8">
              Tus donaciones nos ayudan a proveer comida, albergue y atención
              médica para los animales en nuestra cuidado. Cada contribución
              hace una diferencia.
            </p>
            <div className="space-y-4">
              {/* <div>
                <Label htmlFor="amount">Cantidad de donación</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Ingrese cantidad"
                    onChange={(e) => handleChange("amount", e.target.value)}
                  />
                  <span className="text-muted-foreground">MXN</span>
                </div>
              </div> */}

              {/* <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu email"
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Input
                  id="message"
                  type="message"
                  placeholder="Escribe un mensaje"
                  onChange={(e) => handleChange("message", e.target.value)}
                />
              </div> */}
              <div className="">
                <Link href="https://www.paypal.com/donate/?business=S46SQQLH59WM6&no_recurring=0&item_name=Cualquier+cantidad+es+apreciada%2C+gracias%21&currency_code=MXN">
                  <Button variant="default" className="w-full">
                    Haz una Donación :)
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/pexels2.jpg"
              width={400}
              height={350}
              alt="Picture of the author"
              className="ml-auto  rounded-lg object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
