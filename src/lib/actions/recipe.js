"use server";
import { getTokenServer } from "../getTokenServer";
const SERVER_URL = process.env.SERVER_URL;

export const addRecipe = async (recipeData) => {
      const token = await getTokenServer();
  const res = await fetch(`${SERVER_URL}/add-recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });

  const result = await res.json();

  return result;
};
