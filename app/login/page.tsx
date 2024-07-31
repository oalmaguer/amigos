"use client";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        console.log(data);
        if (data === null) {
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    fetchData();
  }, []);
  console.log("supabase", supabase);
  const signIn = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("entra");

    console.log(user);

    //3: log in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "almaguero95@gmail.com",
      password: "123456",
    });
    console.log(data, error);

    if (!error) {
      redirect("/");
    }
  };

  return (
    <form action={signIn}>
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email and password to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign in</Button>
          </CardFooter>
        </Card>
      </div>
    </form>

    // <form>
    //   <label htmlFor="email">Email:</label>
    //   <input id="email" name="email" type="email" required />
    //   <label htmlFor="password">Password:</label>
    //   <input id="password" name="password" type="password" required />
    //   <button  >Log in</button>
    //   <button formAction={signUp}>Sign up</button>
    //   <button formAction={logout}>Logout</button>
    // </form>
  );
}
