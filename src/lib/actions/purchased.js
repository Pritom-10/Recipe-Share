"use server";
import { getServerToken } from "@/lib/getServerToken";
const SERVER_URL = process.env.SERVER_URL;

export const getMyPurchased = async (page = 1, limit = 8) => {
  const token = await getServerToken();
  const res = await fetch(
    `${SERVER_URL}/customer/my-purchased?page=${page}&limit=${limit}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  return await res.json();
};
