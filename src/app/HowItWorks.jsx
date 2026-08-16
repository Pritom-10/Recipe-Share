"use client";

import { motion } from "framer-motion";
import { Search, ChefHat, Heart } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "নাম, ক্যাটাগরি, বা cuisine দিয়ে হাজারো রেসিপি খুঁজে বের করো।",
  },
  {
    icon: ChefHat,
    title: "Cook",
    description: "ধাপে ধাপে ইনস্ট্রাকশন অনুসরণ করে নিজের রান্নাঘরে বানাও।",
  },
  {
    icon: Heart,
    title: "Share & Like",
    description: "নিজের রেসিপি যোগ করো, অন্যদের পছন্দ করো, favourite এ রাখো।",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            How It Works
          </h2>
          <p className="text-gray-500">তিনটা সহজ ধাপে শুরু করো</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center mb-4 shadow-lg">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
