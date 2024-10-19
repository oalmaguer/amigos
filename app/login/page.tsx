"use client";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // Redirect if user is already logged in
        router.push("/"); // Adjust this path as needed
      }
    };

    checkSession();
  }, []);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const { user, error }: any = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Autenticación exitosa, redirigir o realizar acciones necesarias
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex items-center flex-col gap-4 justify-center h-[calc(100vh-3.5rem)]">
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="footer flex flex-col gap-2 w-full">
              {errorMessage && (
                <p className="text-red-500 text-center font-bold">
                  {errorMessage}
                </p>
              )}
              <Button
                type="submit"
                className="w-full text-white bg-orange-500 hover:bg-purple-600"
              >
                Sign in
              </Button>
            </div>
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
