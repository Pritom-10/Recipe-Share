"use server";
import { getServerToken } from "@/lib/getServerToken";
const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getUsers = async (page = 1, search = "") => {
  const token = await getServerToken();
  const res = await fetch(
    `${SERVER_URL}/admin/users?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  return await res.json();
};

export const blockUser = async (id) => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/admin/users/${id}/block`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const unblockUser = async (id) => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/admin/users/${id}/unblock`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const getAdminRecipes = async (page = 1, search = "") => {
  const token = await getServerToken();
  const res = await fetch(
    `${SERVER_URL}/admin/recipes?page=${page}&limit=10&search=${encodeURIComponent(search)}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  return await res.json();
};

export const adminDeleteRecipe = async (id) => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/admin/recipes/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  });
  return await res.json();
};

export const adminUpdateRecipe = async (id, data) => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/admin/recipes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const removeReportedRecipe = async (reportId) => {
  const token = await getServerToken();
  const res = await fetch(
    `${SERVER_URL}/admin/reports/${reportId}/remove-recipe`,
    {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    },
  );
  return await res.json();
};

export const getAdminReports = async (page = 1) => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/admin/reports?page=${page}&limit=10`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return await res.json();
};

export const updateReportStatus = async (id, status) => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/admin/reports/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return await res.json();
};

export const getAdminTransactions = async (page = 1) => {
  const token = await getServerToken();
  const res = await fetch(
    `${SERVER_URL}/admin/transactions?page=${page}&limit=10`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  return await res.json();
};

export const toggleFeatureRecipe = async (id) => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/admin/recipes/${id}/feature`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${token}` },
  });
  return await res.json();
};


export const getAdminOverview = async () => {
  const token = await getServerToken();
  const res = await fetch(`${SERVER_URL}/admin/overview`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return await res.json();
};
