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
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONSTANTS } from "@/app/lib/constants";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

export default function AddPetForm() {
  const router = useRouter();
  const [creador, setCreador] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState<any>("");
  const [description, setDescription] = useState("");
  const [showLoading, setshowLoading] = useState(false);
  const { toast } = useToast();
  const [image, setImage] = useState<any>(null);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const toggleElement = (status: any) => {
    setshowLoading(status);
  };
  const handleSubmit = async (e: any) => {
    toggleElement(true);
    e.preventDefault();

    const body = {
      name,
      color,
      type,
      age,
      description,
    };
    if (
      !creador ||
      !color ||
      !type ||
      !age ||
      !description ||
      !image ||
      !image
    ) {
      toast({
        title: "Favor de rellenar todos los campos.",
      });
      setshowLoading(false);
      return;
    }
    const formattedData = {
      ...body,
      age: parseInt(body.age),
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
    const { data, error } = await supabase
      .from("pets")
      .upsert({
        id: pet.data[0].id,
        picture: `https://typoamhjuylsgwfpsroq.supabase.co/storage/v1/object/public/avatars/${pet.data[0].id}/${pet.data[0].name}-${pet.data[0].id}`,
      })
      .select();

    if (data) {
      toast({
        title: "Formulario enviado con éxito",
      });
      toggleElement(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setColor("");
    setType("");
    setAge("");
    setDescription("");
    setImage(null);
    setCreador("");
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
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nombre de la Mascota
              </Label>
              <Input
                name="name"
                placeholder="Nombre de la Mascota"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="color" className="text-sm font-medium">
                  Color
                </Label>
                <Select
                  value={color}
                  onValueChange={(event) => setColor(event)}
                  name="color"
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
                  type
                </Label>
                <Select value={type} onValueChange={(event) => setType(event)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="type" />
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
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
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
                value={description}
                onChange={(event) => setDescription(event.target.value)}
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
                value={creador}
                onChange={(event) => setCreador(event.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end">
          <Button
            className="bg-orange-500 hover:bg-purple-600 p-2 rounded text-white"
            onClick={handleSubmit}
          >
            Agregar Mascota
          </Button>
          {showLoading && (
            <div className="ml-4 flex items-center justify-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
