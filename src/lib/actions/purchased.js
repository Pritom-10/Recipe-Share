"use server";

const SERVER_URL = process.env.SERVER_URL;

export const getMyPurchased = async (token, page = 1, limit = 8) => {
  const res = await fetch(
    `${SERVER_URL}/customer/my-purchased?page=${page}&limit=${limit}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  return await res.json();
};
