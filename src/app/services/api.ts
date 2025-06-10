// src/Context/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" },
});

// ---- Members endpoints --------------------------------------------------
export const getMembers = async () => {
  const { data } = await api.get<Member[]>("/members");
  return data;
};
export const getMemberById = async (id: string) => {
  const { data } = await api.get<Member>(`/members/${id}`);
  return data;
};

export const addMember = async (
  payload: Omit<Member, "id" > & { password: string }
) => api.post<Member>("/members/register", payload);

 
export const resetPassword = async (payload: {
  token: string;
  newPassword: string;
}) => api.post("/members/reset-password", payload);

export const sendPasswordResetEmail = async (email: string) =>
  api.post("/members/forgot-password", { email });

export const validateResetToken = async (token: string) =>
  api.post("/members/validate-token", { token });

 
// -------------------------------------------------------------------------
export default api;

// ---------- Tipos --------------------------------------------------------
export interface Member {
  _id: string; // ← Mongo devuelve _id
  nombre: string;
  apellidos: string;
  nombreUser: string;
  email: string;
  password?: string; // Solo al crear o actualizar
 }
export interface LoginPayload {
  email: string;
  password: string;
}
