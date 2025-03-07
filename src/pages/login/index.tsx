"use client";

import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("@/components/ui/button").then((mod) => mod.default), { ssr: false });

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("I am called")
    try {
      if (data.username === "patilandsons" && data.password === "sandeepSir@11th") {
        if (typeof window !== "undefined") {
          localStorage.setItem("isLoggedIn", "true");
        }
        router.push("/properties");
      }else{
      setErrorMessage("Invalid Username/Password");

      }
    } catch (error: any) {
    
      setErrorMessage(error.message || "Login failed");
    }
  };

  useEffect(() => {
    if (isAdmin) {
      router.push("/");
    }
  }, [isAdmin, router]);
  console.log("errorMessageerrorMessageerrorMessage",errorMessage)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="bg-blue-500 text-white text-center py-4">
            <CardTitle className="text-xl font-bold">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                <Input id="username" type="text" {...form.register("username")} className="mt-1" />
                {form.formState.errors.username && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.username.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input id="password" type="password" {...form.register("password")} className="mt-1" />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.password.message}</p>
                )}
              </div>
              {errorMessage && <p className="text-sm text-red-500 text-center mt-2">{errorMessage}</p>}
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300 cursor-pointer">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}