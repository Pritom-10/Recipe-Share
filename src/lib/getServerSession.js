
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getServerSession = async () => {
  const headersList = await headers();
  return await auth.api.getSession({ headers: headersList });
};
