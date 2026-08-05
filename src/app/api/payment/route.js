import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const formData = await request.formData();

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;

    const recipeName = formData.get("recipeName");
    const preparationTime = formData.get("preparationTime");
  
    const recipeId = formData.get("recipeId");
    const userId = user?.id;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: recipeName,
            },
            unit_amount: Number(preparationTime) * 100,
          },

          quantity: 1,
        },
      ],
      metadata: {
        userId,
        recipeId,
        recipeName,
        preparationTime,
      },
      mode: "payment",
      success_url: `${origin}/recipes/success-payment?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
