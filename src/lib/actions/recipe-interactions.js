"use server";
import { getServerToken } from "@/lib/getServerToken";
const SERVER_URL = process.env.SERVER_URL;

export const toggleLike = async (recipeId) => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/recipes/${recipeId}/like`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};


export const reportRecipe = async (recipeId, reason, details) => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/recipes/${recipeId}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reason, details }),
  });
  return await res.json();
};


export const toggleFavourite = async (recipeId) => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/recipes/${recipeId}/favourite`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  console.log("Status:", res.status);
  console.log("SERVER_URL used:", SERVER_URL);

  if (!res.ok) {
    const text = await res.text();
    console.log("Response body:", text);
    throw new Error("Favourite toggle failed");
  }

  return await res.json();
};
