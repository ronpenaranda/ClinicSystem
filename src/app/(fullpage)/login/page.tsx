"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const [user, setUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [checkEmpty, setCheckEmpty] = useState<string>("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!user) {
      return setCheckEmpty("Token cannot be empty");
    }
    setLoading(true);
    const response = await login(user, user);
    if (response) router.push("/dashboard");
    setLoading(false);
    setCheckEmpty("");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-5">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription className="text-xs">
              Enter token below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Token</Label>
                <Input
                  onChange={(e) => setUser(e.target.value)}
                  type="password"
                  className={
                    checkEmpty
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  placeholder="token ..."
                  required
                />
                <p className="text-xs text-red-400">
                  {checkEmpty ? checkEmpty : ""}
                </p>
              </div>
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
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
export default Page;
