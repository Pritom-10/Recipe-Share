// app/HeroBanner.jsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChefHat, ArrowRight } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-300/30 dark:bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-300/30 dark:bg-rose-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900 mb-6"
        >
          <ChefHat className="w-4 h-4" />
          Discover & Share Recipes
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
        >
          Cook, Share, and{" "}
          <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
            Savor
          </span>{" "}
          Every Recipe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10"
        >
          একটা জায়গায় হাজারো রেসিপি খুঁজে বের করো, নিজের রান্নার গল্প শেয়ার
          করো, আর কমিউনিটি থেকে অনুপ্রেরণা নাও।
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-orange-200 dark:hover:shadow-orange-900/30 transition-all"
          >
            Explore Recipes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;