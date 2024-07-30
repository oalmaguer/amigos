import { NextResponse } from "next/server";
// import pets from '../../../lib/pets.json'
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  // return <pre>{JSON.stringify(pets, null, 2)}</pre>;

  const form = await request.json();

  // const pet = pets.filter(pet => pet.id == params.id.toString())
  const supabase = createClient();

  const { data, error } = await supabase
    .from("adopciones")
    .insert({ ...form })
    .select();

  return NextResponse.json({ data, error });
}

export async function GET() {
  // return <pre>{JSON.stringify(pets, null, 2)}</pre>;

  // const pet = pets.filter(pet => pet.id == params.id.toString())
  const supabase = createClient();

  const { data, error } = await supabase.from("adopciones").select();

  return NextResponse.json({ data, error });
}
