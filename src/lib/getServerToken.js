
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getServerToken = async () => {
  const headersList = await headers();
  const { token } = await auth.api.getToken({ headers: headersList });
  return token;
};