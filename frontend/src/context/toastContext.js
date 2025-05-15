import React, { createContext, useContext, useState, useCallback } from "react";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
} from "../components/ui/toast";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    ({ title, description, variant = "default", duration = 3000 }) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      <ToastProvider>
        {children}
        <ToastViewport />
        {toasts.map((toast) => (
          <Toast key={toast.id} variant={toast.variant}>
            <div className="grid gap-1">
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        ))}
      </ToastProvider>
    </ToastContext.Provider>
  );
};
