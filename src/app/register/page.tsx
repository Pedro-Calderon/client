"use client";
import RegisterPage from "./RegisterPage";
import { ErrorProvider } from "@/app/Context/ErrorContext";
export default function RegisterRoute() {
  return (
    <ErrorProvider>

      <RegisterPage />
      </ErrorProvider >

      )
}
