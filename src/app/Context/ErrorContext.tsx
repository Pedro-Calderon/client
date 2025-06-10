"use client";

import { createContext, useContext, useState, ReactNode} from "react";
import { Alert, AlertTitle } from "@mui/material";

type AlertType = "error" | "warning" | "info" | "success";

interface FieldError {
  field: string;
  message: string;
}

interface ErrorContextType {
  showAlert: (msg: string, type?: AlertType) => void;
  setFormError: (error: FieldError) => void;
  formError: FieldError | null;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError debe usarse dentro de ErrorProvider");
  }
  return context;
};

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertType>("error");
  const [showAlertBox, setShowAlertBox] = useState(false);

  const [formError, setFormErrorState] = useState<FieldError | null>(null);

  const showAlert = (msg: string, type: AlertType = "error") => {
    setAlertMessage(msg);
    setAlertType(type);
    setShowAlertBox(true);
    setTimeout(() => setShowAlertBox(false), 4000);
  };

  const setFormError = (error: FieldError) => {
    setFormErrorState(error);
    setTimeout(() => setFormErrorState(null), 5000);
  };

  return (
    <ErrorContext.Provider value={{ showAlert, setFormError, formError }}>
      {children}

      {showAlertBox && (
        <Alert
          severity={alertType}
          sx={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            minWidth: "320px",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <AlertTitle>{alertType.toUpperCase()}</AlertTitle>
          {alertMessage}
        </Alert>
      )}
    </ErrorContext.Provider>
  );
};
