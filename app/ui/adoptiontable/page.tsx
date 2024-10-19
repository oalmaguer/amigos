"use client";
import { CONSTANTS } from "@/app/lib/constants";
import { supabase } from "@/app/lib/supabaseClient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { usePets } from "@/context/petsprovider";
import { get } from "http";
import { revalidatePath } from "next/cache";
import { use, useEffect, useState } from "react";

export default function AdoptionTable({ adoptions }: any) {
  console.log(adoptions);
  const [data, setData] = useState(adoptions);
  const [value, setValue] = useState<any>(null);
  const { pets, setPets } = usePets();
  const [updated, setUpdated] = useState<any>([]);
  useEffect(() => {
    setData(adoptions);
  }, [adoptions]);

  const { toast } = useToast();

  const deleteAdoption = async (adoptionId: any) => {
    try {
      const { data: deletedData, error } = await supabase
        .from("adopciones")
        .delete()
        .eq("id", adoptionId)
        .select();

      if (error) throw error;
      const { id } = deletedData[0];
      toast({ title: "Eliminación exitosa." });
      setData((prevData: any) =>
        prevData.filter((adoption: any) => adoption.id !== id)
      );
    } catch (error) {
      toast({ title: "Ha ocurrido un error. Intenta de nuevo." });
    }
  };

  const mascotAdopted = async (adoptionId: any) => {
    try {
      const { data: updatedData, error } = await supabase
        .from("adopciones")
        .update({ status: true })
        .eq("id", adoptionId)
        .select();

      console.log(updatedData);

      //status 0 for not adopted and 1 for adopted, did it this way in case I add more status
      const { data: petData, error: petError } = await supabase
        .from("pets")
        .update({ status: 1 })
        .eq("id", updatedData[0].pet)
        .select();

      if (error || petError) {
        toast({ title: "Ha ocurrido un error. Intenta de nuevo." });
        return;
      }
      console.log(adoptions);
      const petId = updatedData[0].pet; // Assuming updatedData contains the pet ID
      console.log(petId);

      toast({ title: "Adopción actualizada correctamente." });
      setPets((prevPets) =>
        prevPets.map((pet) => (pet.id === petId ? { ...pet, status: 1 } : pet))
      );
      console.log(pets);
    } catch (error) {
      toast({ title: "Ha ocurrido un error. Intenta de nuevo." });
    }
  };

  const saveChanges = async () => {};
  return (
    <div className=" mx-auto py-8 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Adopciones</CardTitle>
          <CardDescription>
            Ver ultimas solicitudes de adopción.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre Dueño</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Razón</TableHead>
                <TableHead>Estado Civil</TableHead>
                <TableHead>Nombre Mascota</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Marcar como adoptado</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((adoption: any) => (
                <TableRow
                  key={adoption.id}
                  className={
                    adoption.status
                      ? "bg-gray-200 opacity-50 cursor-not-allowed"
                      : ""
                  }
                >
                  {/* {JSON.stringify(adoption)} */}
                  <TableCell className="font-medium">{adoption.name}</TableCell>
                  <TableCell>{adoption.email}</TableCell>
                  <TableCell>
                    {new Date(adoption.created_at).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{adoption.address}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="link">Leer</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Razón</AlertDialogTitle>
                          <AlertDialogDescription>
                            {adoption.reason}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cerrar</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                  <TableCell>{adoption.residencia}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="link">
                          {
                            pets.find((pet: any) => pet.id === adoption.pet)
                              .name
                          }
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {
                              pets.find((pet: any) => pet.id === adoption.pet)
                                .name
                            }
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <img
                              src={
                                pets.find((pet: any) => pet.id === adoption.pet)
                                  .picture
                              }
                              alt=""
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cerrar</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                  {
                    <TableCell>
                      {pets.find((pet: any) => pet.id === adoption.pet).color}
                    </TableCell>
                  }
                  {
                    <TableCell>
                      {pets.find((pet: any) => pet.id === adoption.pet).type}
                    </TableCell>
                  }
                  {
                    <TableCell>
                      {pets.find((pet: any) => pet.id === adoption.pet).age}
                    </TableCell>
                  }

                  <TableCell>
                    <Button
                      disabled={adoption.status}
                      className={
                        adoption.status
                          ? "bg-gray-200 opacity-50 cursor-not-allowed "
                          : "bg-green-500 text-white"
                      }
                      variant="outline"
                      size="sm"
                      onClick={() => mascotAdopted(adoption.id)}
                    >
                      {adoption.status ? "Adoptado" : "Marcar como adoptado"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="bg-red-500 text-white"
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAdoption(adoption.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {updated.length > 0 && (
            <Button
              onClick={() => saveChanges()}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Guardar cambios
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
