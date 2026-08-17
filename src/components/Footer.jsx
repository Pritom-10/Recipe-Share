// components/Footer.jsx
"use client";
import Link from "next/link";
import { Mail, Phone, MapPin, ChefHat } from "lucide-react";
import { usePathname } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import Logo from "@/components/Logo";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.includes("dashboard")) {
    return null;
  }

  return (
    <footer className="mt-16 border-t border-gray-100 dark:border-gray-800 bg-gradient-to-br from-orange-50/50 via-white to-rose-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo className="w-9 h-9" />
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Tech Bazaar
              </span>
            </Link>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              হাজারো রেসিপি খুঁজে বের করো, নিজের রান্নার গল্প শেয়ার করো, আর
              কমিউনিটি থেকে অনুপ্রেরণা নাও।
            </p>

            <div className="mt-5 flex items-center gap-3">
              {[FaFacebook, BsInstagram, BsTwitter, LiaLinkedin].map(
                (Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="rounded-full border border-gray-200 dark:border-gray-700 p-2 transition hover:bg-orange-50 dark:hover:bg-orange-950 hover:border-orange-200 dark:hover:border-orange-900 hover:text-orange-600 dark:hover:text-orange-400 text-gray-600 dark:text-gray-400"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/recipes"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  All Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=Main Course"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Main Course
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes?category=Dessert"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Desserts
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Share Your Recipe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">
              Contact
            </h3>
            <div className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-orange-500" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-orange-500" />
                <span>support@techbazaar.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400 md:flex-row">
          <p className="flex items-center gap-1.5">
            <ChefHat className="w-4 h-4 text-orange-500" />©{" "}
            {new Date().getFullYear()} Tech Bazaar. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
