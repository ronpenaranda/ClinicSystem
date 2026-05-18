"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import useAuth from "@/hooks/useAuth";

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      return setError("Username and password are required");
    }
    setLoading(true);
    setError("");
    const response = await login(username, password);
    if (response?.success) {
      router.push("/dashboard");
    } else {
      setError(response?.message ?? "Login failed");
    }
    setLoading(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-5">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription className="text-xs">
              Enter your credentials below to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className={
                    error ? "border-red-500 focus-visible:ring-red-500" : ""
                  }
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className={
                    error ? "border-red-500 focus-visible:ring-red-500" : ""
                  }
                  placeholder="Enter password"
                  required
                />
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={handleLogin}>
              {loading ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
export default Page;
