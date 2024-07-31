import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignOutButton() {
  const supabase = createClient();
  const signOut = async () => {
    //4: log out
    const { error } = await supabase.auth.signOut();
    console.log(error);

    if (!error) {
      redirect("/login");
    }
  };
  signOut();

  return <Button>Sign Out</Button>;
}
