// app/(auth)/signin/page.jsx
"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ChefHat } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "লগইন করতে সমস্যা হয়েছে");
        return;
      }

      toast.success("লগইন সফল হয়েছে!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-300/30 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center mb-3 shadow-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to continue exploring recipes
            </p>
          </div>

          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full">
              <Fieldset.Group className="space-y-4">
                <TextField isRequired name="email" type="email">
                  <Label className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    placeholder="john@example.com"
                    variant="secondary"
                    className="bg-white/70 rounded-xl"
                  />
                  <FieldError />
                </TextField>

                <TextField isRequired name="password" type="password">
                  <Label className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    placeholder="Password"
                    variant="secondary"
                    className="bg-white/70 rounded-xl"
                  />
                  <FieldError />
                </TextField>
              </Fieldset.Group>

              <Button
                type="submit"
                isDisabled={isSubmitting}
                className="!w-full !mt-6 !bg-gradient-to-r !from-orange-500 !to-rose-500 !text-white !border-0 !rounded-xl !py-3 hover:!shadow-lg transition-all"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </Fieldset>
          </Form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-orange-600 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
