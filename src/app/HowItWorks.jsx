"use client";

import { motion } from "framer-motion";
import { Search, ChefHat, Heart } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Discover thousands of recipes by name, category, or cuisine.",
  },
  {
    icon: ChefHat,
    title: "Cook",
    description:
      "Follow the step-by-step instructions and cook in your own kitcheno.",
  },
  {
    icon: Heart,
    title: "Share & Like",
    description: "Add your own recipes, like others', and save to favorites.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white dark:bg-gray-950 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            How It Works
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Get started in 3 easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div key={step.title} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center mb-4 shadow-lg">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
