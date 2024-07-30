"use client";
import Image from "next/image";
import PetDetails from "../../ui/petdetails/page";

import { useParams } from "next/navigation";
import Toast from "@/toast";
export default function Home() {
  const { id } = useParams();

  return <PetDetails id={id} />;
}
