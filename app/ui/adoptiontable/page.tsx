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
import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { get } from "http";
import { revalidatePath } from "next/cache";
import { use, useEffect, useState } from "react";

export default function AdoptionTable({ adoptions }: any) {
  const [data, setData] = useState(adoptions);
  const [value, setValue] = useState<any>(null);

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

      if (error) throw error;
      toast({ title: "Adopción actualizada correctamente." });
      setData((prevData: any) =>
        prevData?.map((adoption: any) =>
          adoption.id === adoptionId ? { ...adoption, status: true } : adoption
        )
      );
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
                  <TableCell>{adoption.reason}</TableCell>
                  <TableCell>{adoption.residencia}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="link">
                          {adoption.pet.pets[0].name}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {adoption.pet.pets[0].name}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <img src={adoption.pet.pets[0].picture} alt="" />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cerrar</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                  <TableCell>{adoption.pet.pets[0].color}</TableCell>
                  <TableCell>{adoption.pet.pets[0].type}</TableCell>
                  <TableCell>{adoption.pet.pets[0].age}</TableCell>

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
