"use client";
import AdoptionTable from "../ui/adoptiontable/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdoptList() {
  const router = useRouter();
  const [adoptions, setAdoptions] = useState<any>([]);

  const getPetsession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) router.push("/login");
  };
  useEffect(() => {
    getPetsession();
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
    console.log(result);
    if (result.error) return result.error;
    setAdoptions(result.data);

    // const convert = await Promise.all(
    //   result.data.map(async (elem: any) => {
    //     return { ...elem, pet: await getPets(elem.pet) };
    //   })
    // );

    // setAdoptions(convert);
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

      return result;
    }
  };

  // const mascotAdopted = async (adoptionId: any) => {
  //   try {
  //     const { data: updatedData, error } = await supabase
  //       .from("adopciones")
  //       .update({ status: true })
  //       .eq("id", adoptionId)
  //       .select();

  //     if (error) throw error;

  //     // Update the pet's status in the pets context
  //     const petId = updatedData[0].pet; // Assuming updatedData contains the pet ID
  //     setPets((prevPets) =>
  //       prevPets.map((pet) => (pet.id === petId ? { ...pet, status: 1 } : pet))
  //     );

  //     // Optionally, you can also update the local state of adoptions
  //     setAdoptions((prevAdoptions) =>
  //       prevAdoptions.map((adoption) =>
  //         adoption.id === adoptionId ? { ...adoption, status: true } : adoption
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating adoption status:", error);
  //   }
  // };
  return <AdoptionTable adoptions={adoptions} />;
}
