import { payment } from "@/lib/actions/payment";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import {
  CheckCircle,
  Mail,
  ShoppingBag,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
    amount_total,
    currency,
    payment_intent,
    line_items,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items.data.price.product", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const pay_data = await payment({ ...metadata, session_id });

    // Format currency
    const formatCurrency = (amount, currency) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
      }).format(amount / 100);
    };

    // Get order items
    const items = line_items?.data || [];
    const orderNumber = payment_intent?.id?.slice(-8) || "N/A";
    const orderDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 md:p-8">
        <div className="max-w-4xl w-full">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Success Header with Gradient */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-12 md:py-16 text-center relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 shadow-lg">
                  <CheckCircle className="w-12 h-12 text-emerald-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Payment Successful!
                </h1>
                <p className="text-emerald-50 text-lg md:text-xl opacity-90">
                  Thank you for your purchase
                </p>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-6 md:px-10 py-8 md:py-12">
              {/* Order Summary */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-semibold text-gray-700">
                      Order Number
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    #{orderNumber}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-semibold text-gray-700">Order Date</h3>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {orderDate}
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-8 bg-emerald-500 rounded-full"></span>
                  Order Details
                </h2>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  {items.length > 0 ? (
                    <div className="space-y-4">
                      {items.map((item, index) => {
                        const product = item.price?.product;
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                          >
                            <div className="flex items-center gap-4">
                              {product?.images?.[0] && (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              )}
                              <div>
                                <p className="font-medium text-gray-800">
                                  {product?.name || "Product"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(item.amount_total, currency)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500">Order items loading...</p>
                  )}

                  {/* Total */}
                  <div className="mt-6 pt-6 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-700">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {formatCurrency(amount_total, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Confirmation */}
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Confirmation Email Sent
                    </h3>
                    <p className="text-gray-600">
                      A confirmation email has been sent to{" "}
                      <span className="font-medium text-gray-800">
                        {customerEmail}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      If you don&apos;t see it, please check your spam folder.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard/orders"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                >
                  View My Orders
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/recipes"
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-200 text-center hover:shadow-md"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Support Message */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  Need help? Contact us at{" "}
                  <a
                    href="mailto:orders@example.com"
                    className="text-emerald-600 hover:text-emerald-700 font-medium underline-offset-2 hover:underline"
                  >
                    orders@example.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              Secure Payment
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              30-Day Guarantee
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              Free Support
            </span>
          </div>
        </div>
      </section>
    );
  }
}
