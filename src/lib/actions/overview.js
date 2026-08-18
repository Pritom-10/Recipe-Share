
"use server";
import { getServerToken } from "@/lib/getServerToken";
const SERVER_URL = process.env.SERVER_URL;

export const getMyRecipesOverview = async () => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/customer/my-recipes-overview`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return await res.json();
};
