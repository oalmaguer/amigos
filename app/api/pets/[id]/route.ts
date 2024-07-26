import { NextResponse } from "next/server";
// import pets from '../../../lib/pets.json'
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request, context: any) {
    
    // return <pre>{JSON.stringify(pets, null, 2)}</pre>;
    const { params } = context;
    
    // const pet = pets.filter(pet => pet.id == params.id.toString())
    const supabase = createClient();
    const { data: pets } = await supabase.from("pets").select().eq("id", params.id);
    
    return NextResponse.json({
        pets
    })
}