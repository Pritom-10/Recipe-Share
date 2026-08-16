import { getFeaturedRecipes } from "@/lib/actions/recipe";
import { ChefHat, Users, Star } from "lucide-react";

const stats = [
  { icon: ChefHat, label: "Recipes Shared", value: "1,000+" },
  { icon: Users, label: "Active Cooks", value: "500+" },
  { icon: Star, label: "Cuisines Covered", value: "20+" },
];

const PlatformStats = () => {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-rose-500 py-14">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="text-white">
            <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-orange-50">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlatformStats;
