import { createClient } from "@/utils/supabase/server";
import AddPetForm from "../ui/addpetform/page";
import { redirect } from "next/navigation";

export default async function AddPet() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (!user) {
    redirect("/login");
  }
  return <AddPetForm />;
}
