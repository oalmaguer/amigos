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
import { useRouter } from 'next/navigation'
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session:', session); 
      if (session) {
        // Redirect if user is already logged in
        router.push('/'); // Adjust this path as needed
      }
    };

    checkSession();
  }, []);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { user, error }: any = await supabase.auth.signInWithPassword({ email, password });

    console.log(user);

    if (error) {
      setError(error.message);
    } else {
      // Autenticación exitosa, redirigir o realizar acciones necesarias
      console.log('User logged in:', user);

      router.push("/")
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin}>
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password"  onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Sign in</Button>
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
