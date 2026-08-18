
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import HeroBanner from "./HeroBanner";
import FeaturedRecipes from "./FeaturedRecipes";
import PopularRecipes from "./PopularRecipes";
import HowItWorks from "./HowItWorks";
import PlatformStats from "./PlatformStats";

export default async function Home() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (session?.user?.role === "admin") {
    redirect("/dashboard/admin");
  }

  return (
    <div>
      <HeroBanner />
      <FeaturedRecipes />
      <PopularRecipes />
      <HowItWorks />
      <PlatformStats />
    </div>
  );
}
