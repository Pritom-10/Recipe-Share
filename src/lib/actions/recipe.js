"use server";

const SERVER_URL = process.env.SERVER_URL;


export const addRecipe = async (data, token) => {
  const res = await fetch(`${SERVER_URL}/add-recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};

export const updateRecipe = async (id, recipeData, token) => {
  const res = await fetch(`${SERVER_URL}/recipes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });
  return await res.json();
};

export const deleteRecipe = async (id, token) => {
  const res = await fetch(`${SERVER_URL}/recipes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
