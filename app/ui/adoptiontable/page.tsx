"use client";
import { Badge } from "@/components/ui/badge";
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
import { get } from "http";
import { use, useEffect, useState } from "react";

export default function AdoptionTable() {
  const [adoptions, setAdoptions] = useState<any>([]);
  const [petData, setPetData] = useState<any>([]);

  useEffect(() => {
    getAdoptions();
  }, []);
  const getAdoptions = async () => {
    const response = await fetch("/api/adoption", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.error) return result.error;

    const convert = await Promise.all(
      result.data.map(async (elem: any) => {
        return { ...elem, pet: await getPets(elem.pet) };
      })
    );
    console.log(convert);

    setAdoptions(convert);
  };

  const getPets = async (id: any) => {
    const response = await fetch(`/api/pets/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result;
    }
  };

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
                <TableHead>Raza</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Detalles</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adoptions?.map((adoption: any) => (
                <TableRow key={adoption.id}>
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
                  <TableCell>{adoption.pet.pets[0].name}</TableCell>
                  <TableCell>{adoption.pet.pets[0].type}</TableCell>
                  <TableCell>{adoption.pet.pets[0].age}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Available</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell className="font-medium">Buddy</TableCell>
                <TableCell>Labrador Retriever</TableCell>
                <TableCell>3</TableCell>
                <TableCell>
                  <Badge variant="secondary">Available</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Daisy</TableCell>
                <TableCell>Domestic Shorthair</TableCell>
                <TableCell>1</TableCell>
                <TableCell>
                  <Badge variant="secondary">Available</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Max</TableCell>
                <TableCell>German Shepherd</TableCell>
                <TableCell>5</TableCell>
                <TableCell>
                  <Badge variant="outline">Adopted</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Luna</TableCell>
                <TableCell>Domestic Longhair</TableCell>
                <TableCell>2</TableCell>
                <TableCell>
                  <Badge variant="secondary">Available</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Bella</TableCell>
                <TableCell>Pitbull Terrier</TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <Badge variant="secondary">Available</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
