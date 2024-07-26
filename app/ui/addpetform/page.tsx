"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONSTANTS } from "@/app/lib/constants";

export default function AddPetForm({ onAddRecord }: any) {
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    name: "",
    picture: "",
    description: "",
    age: "",
    color: "",
    type: "",
  });

  const [image, setImage] = useState<any>(null);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      age: parseInt(formData.age),
      picture: `https://typoamhjuylsgwfpsroq.supabase.co/storage/v1/object/public/avatars/1/${image.name}`,
    };

    const response = await fetch("/api/pets/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    const result = await response.json();

    if (result.error) return result.error;

    //upload image to supabase
    const file: any = image;

    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(
        `${result.data[0].id}/${result.data[0].name}-${result.data[0].id}`,
        file,
        {
          cacheControl: "3600",
          upsert: false,
        }
      );

    if (data) {
      updateImg(result);
    }
  };

  const updateImg = async (pet: any) => {
    const ext = pet.data[0].picture.split(".").pop();
    const { data, error } = await supabase.from("pets").upsert({
      id: pet.data[0].id,
      picture: `https://typoamhjuylsgwfpsroq.supabase.co/storage/v1/object/public/avatars/${pet.data[0].id}/${pet.data[0].name}-${pet.data[0].id}`,
    });
  };
  const handleChange = (type: any, value: any) => {
    setFormData({
      ...formData,
      [type]: value,
    });
  };
  return (
    <Card className="mt-8 mb-8 border-0 max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Agregar una Mascota
        </CardTitle>
        <CardDescription>
          Completa los datos para agregar una nueva mascota al refugio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nombre de la Mascota
              </Label>
              <Input
                name="name"
                placeholder="Nombre de la Mascota"
                onChange={(value) => handleChange("name", value.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="color" className="text-sm font-medium">
                  Color
                </Label>
                <Select
                  name="color"
                  onValueChange={(value) => handleChange("color", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONSTANTS.COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type" className="text-sm font-medium">
                  Especie
                </Label>
                <Select onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Especie" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONSTANTS.TIPO.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="age" className="text-sm font-medium">
                  Edad
                </Label>
                <Input
                  name="age"
                  type="number"
                  placeholder="Edad"
                  onChange={(value) => handleChange("age", value.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="picture" className="text-sm font-medium">
                  Foto
                </Label>
                <Input
                  name="picture"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Descripción
              </Label>
              <Textarea
                name="description"
                rows={5}
                placeholder="Describir"
                onChange={(value) =>
                  handleChange("description", value.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="creador" className="text-sm font-medium">
                Tu Nombre
              </Label>
              <Input
                name="creador"
                placeholder="Tu Nombre"
                onChange={(value) =>
                  handleChange("creador", value.target.value)
                }
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Agregar Mascota</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
