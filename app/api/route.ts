import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from '../../lib/supabaseClient'

export async function GET() {
    const cookieStore = cookies();
    const supabase = createClient();
  
    const { data: todos } = await supabase.from("pets").select();
    return NextResponse.json({ message: "Hello, Next.js!" });
}