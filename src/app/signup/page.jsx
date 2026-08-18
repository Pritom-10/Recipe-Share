
"use client";

import { authClient } from "@/lib/auth-client";
import { imageUploader } from "@/lib/imageUpload";
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
import { ChefHat, ImagePlus, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const imageFile = formData.get("image");

    // নতুন — password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and contain both uppercase and lowercase letters.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (imageFile && imageFile.size > 0) {
        const imageRes = await imageUploader(imageFile);
        imageUrl = imageRes.url;
      }

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: imageUrl,
        plan: "free",
      });

      if (error) {
        toast.error(error.message || "Failed to sign up");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign up with Google");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 relative overflow-hidden bg-gradient-to-br from-orange-100 via-rose-50 to-amber-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute top-10 left-10 w-80 h-80 bg-orange-400/40 rounded-full blur-3xl dark:bg-orange-500/10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-400/40 rounded-full blur-3xl dark:bg-rose-500/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl dark:bg-amber-400/10" />

      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-3xl shadow-2xl p-8 dark:bg-gray-900/70 dark:border-gray-800">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center mb-3 shadow-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
              Join and start sharing your recipes
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-2.5 bg-white/80 border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-white hover:shadow-md transition-all disabled:opacity-60 mb-5 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <FcGoogle className="w-5 h-5" />
            {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400 dark:text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full">
              <Fieldset.Group className="space-y-4">
                <div className="flex justify-center mb-2">
                  <label className="relative cursor-pointer group">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white/70 border-2 border-dashed border-orange-200 flex items-center justify-center dark:bg-gray-800 dark:border-gray-700">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-orange-300" />
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ImagePlus className="w-5 h-5 text-white" />
                    </div>
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <TextField isRequired name="name">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </Label>
                  <Input
                    placeholder="John Doe"
                    variant="secondary"
                    className="bg-white/70 rounded-xl dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
                  />
                  <FieldError />
                </TextField>

                <TextField isRequired name="email" type="email">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </Label>
                  <Input
                    placeholder="john@example.com"
                    variant="secondary"
                    className="bg-white/70 rounded-xl dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
                  />
                  <FieldError />
                </TextField>

                <TextField isRequired name="password" type="password">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <Input
                    placeholder="Password"
                    variant="secondary"
                    className="bg-white/70 rounded-xl dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Password must be at least 6 characters long and contain both uppercase and lowercase letters.
                  </p>
                  <FieldError />
                </TextField>
              </Fieldset.Group>

              <Button
                type="submit"
                isDisabled={isSubmitting}
                className="!w-full !mt-6 !bg-gradient-to-r !from-orange-500 !to-rose-500 !text-white !border-0 !rounded-xl !py-3 hover:!shadow-lg transition-all"
              >
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </Button>
            </Fieldset>
          </Form>

          <p className="text-center text-sm text-gray-500 mt-6 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-orange-600 font-medium hover:underline dark:text-orange-400"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}