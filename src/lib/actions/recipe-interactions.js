"use server";

const SERVER_URL = process.env.SERVER_URL;

export const toggleLike = async (recipeId, token) => {
  const res = await fetch(`${SERVER_URL}/recipes/${recipeId}/like`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const reportRecipe = async (recipeId, reason, details, token) => {
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

export const toggleFavourite = async (recipeId, token) => {
  const res = await fetch(`${SERVER_URL}/recipes/${recipeId}/favourite`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
