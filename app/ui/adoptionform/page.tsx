"use client";
import { CONSTANTS } from "@/app/lib/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useState } from "react";

export default function AdoptionForm({ pets }: any) {
  const pets2 = pets;
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [residencia, setResidencia] = useState("");
  const [pet, setPet] = useState("");
  const [reason, setReason] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  let defaultFilter = {
    name: "",
    address: "",
    email: "",
    phone: "",
    residencia: "",
    pet: "",
    reason: "",
  };

  const [formData, setFormData] = useState(defaultFilter);

  const handleChange = (type: any, value: any) => {
    setFormData({
      ...formData,
      [type]: value.id ? value.id : value,
    });
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setResidencia("");
    setReason("");
    setPet("");
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const body = {
      name,
      email,
      phone,
      pet,
      reason,
      residencia,
      address,
    };
    if (
      !name ||
      !email ||
      !phone ||
      !pet ||
      !reason ||
      !residencia ||
      !address
    ) {
      toast({
        title:
          "Adopción fallida, intentalo de nuevo y asegurate de llenar todos los campos.",
      });
      return;
    }
    const formattedData = {
      ...body,
      pet: parseInt(body.pet),
    };

    const response = await fetch("/api/adoption", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Read the response body
    const data = await response.json();

    if (data.error) {
      toast({
        title:
          "Adopción fallida, intentalo de nuevo y asegurate de llenar todos los campos.",
      });
      console.error("Error creating adoption", response.statusText);
      return;
    }
    setFormData(defaultFilter);

    toast({
      title: "Adopción exitosa",
      description: "Tu solicitud de adopción ha sido enviada exitosamente.",
    });
    resetForm();
  };

  return (
    <main>
      <section className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8">Formulario de Adopción</h1>
        <Card className="rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Ingresa tu teléfono"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="residencia">Estado Civil</Label>
                  <Select
                    value={residencia}
                    onValueChange={(value) => setResidencia(value)}
                    name="residencia"
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Estado Civil" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONSTANTS.RESIDENCIA.map((residencia) => (
                        <SelectItem key={residencia} value={residencia}>
                          {residencia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pet">Mascota</Label>
                  <Select
                    name="pet"
                    value={pet}
                    onValueChange={(value) => setPet(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Mascota" />
                    </SelectTrigger>
                    <SelectContent>
                      {pets2?.pets.map((tipo: any) => (
                        <SelectItem key={tipo.id} value={tipo.id.toString()}>
                          <div className="flex items-center">
                            <Image
                              src={tipo.picture}
                              alt={tipo.name}
                              width={30}
                              height={30}
                            />
                            <span>{tipo.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="address">Dirección</Label>
              <Textarea
                name="address"
                id="address"
                placeholder="Ingresa tu dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <Label htmlFor="reason">
                Por qué quieres adoptar a una mascota?
              </Label>
              <Textarea
                name="reason"
                id="reason"
                placeholder="Ingresa tu razón"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white"
                type="submit"
                onClick={handleSubmit}
              >
                Enviar solicitud
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
}
