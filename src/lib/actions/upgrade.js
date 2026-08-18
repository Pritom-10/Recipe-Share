"use server";
import { getServerToken } from "@/lib/getServerToken";
const SERVER_URL = process.env.SERVER_URL;

export const confirmUpgrade = async () => {
 const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/customer/upgrade-premium`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const getRecipeStatus = async () => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/customer/recipe-status`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return await res.json();
};
