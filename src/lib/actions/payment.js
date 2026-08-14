"use server";

const SERVER_URL = process.env.SERVER_URL;

export const payment = async (data) => {
  const res = await fetch(`${SERVER_URL}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};
