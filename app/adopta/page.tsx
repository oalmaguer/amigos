"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { CONSTANTS } from "../lib/constants";
import { use, useContext, useEffect, useState } from "react";
import { usePets } from "@/context";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { parse } from "path";
import AdoptionForm from "../ui/adoptionform/page";

export default function Adopta() {
  const pets2: any = usePets();
  
  return (
    <AdoptionForm pets={pets2} />
  );
}
