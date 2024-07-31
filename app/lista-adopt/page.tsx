import { createClient } from "@/utils/supabase/server";
import AdoptionTable from "../ui/adoptiontable/page";
import { redirect } from "next/navigation";

export default async function AdoptList() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  return <AdoptionTable />;
}
