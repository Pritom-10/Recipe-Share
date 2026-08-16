import HeroBanner from "./HeroBanner";
import FeaturedRecipes from "./FeaturedRecipes";
import PopularRecipes from "./PopularRecipes";
import HowItWorks from "./HowItWorks";
import PlatformStats from "./PlatformStats";

export default function Home() {
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
