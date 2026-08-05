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
// "use server";


// const SERVER_URL = process.env.SERVER_URL?.replace(/\/$/, "");

// export const addRecipe = async (data) => {
//   if (!SERVER_URL) {
//     console.error("SERVER_URL missing in .env.local!");
//     return { success: false, error: "Server configuration missing" };
//   }

//   try {
//     const res = await fetch(`${SERVER_URL}/add-recipe`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!res.ok) {
//       console.error(` Server Error: ${res.status}`);
//       return { success: false, error: `Backend returned status ${res.status}` };
//     }

//     const result = await res.json();
//     return result; 
//   } catch (error) {
//     console.error("Fetch failed:", error);
//     return { success: false, error: error.message };
//   }
// };