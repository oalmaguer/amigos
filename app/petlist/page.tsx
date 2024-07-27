"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CONSTANTS } from "../lib/constants";
import { usePets } from "@/context";

export default function PetList() {
  // const [pets, setPets] = useState<any>([]);
  const [filters, setFilters] = useState({
    color: "todos",
    name: "",
    type: "todos",
  });

  const pets: any = usePets();

  const handleFilterChange = (type: any, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  const filteredPets = useMemo(() => {
    return pets.pets.filter((pet: any) => {
      const matchesColor =
        filters.color === "todos" || pet.color.includes(filters.color);
      const matchesName = pet.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesType =
        filters.type === "todos" || pet.type.includes(filters.type);
      return matchesColor && matchesName && matchesType;
    });
  }, [pets, filters]);

  return (
    <div className="w-full">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid md:grid-cols-[240px_1fr] gap-8">
          <div className="bg-background p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="grid gap-4">
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium mb-2"
                >
                  Color
                </label>
                <Select
                  value={filters.color}
                  onValueChange={(value) => handleFilterChange("color", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="todos" value="todos">
                      Todos
                    </SelectItem>
                    {CONSTANTS.COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Search by name"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium mb-2"
                >
                  Type
                </label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="todos" value="todos">
                      Todos
                    </SelectItem>
                    {CONSTANTS.TIPO.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPets.map((pet: any) => (
              <div
                key={pet.id}
                className="bg-background p-4 rounded-lg shadow-lg"
              >
                <img
                  src={`${pet.picture}`}
                  alt={pet.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{pet.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Color: {pet.color}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Type: {pet.type}
                </p>
                <Link
                  href={`/petdetails/${pet.id}`}
                  className="w-full h-9 inline-flex items-center justify-center border-[#6c757d] text-sm font-medium py-2 rounded-lg"
                >
                  Ver Detalles
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
