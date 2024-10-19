"use client";
import PetDetails from "../../ui/petdetails/page";

import { useParams } from "next/navigation";
export default function Home() {
  const { id } = useParams();

  return <PetDetails id={id} />;
}
