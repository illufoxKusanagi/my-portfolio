import { useState } from "#imports";

export interface CyberToast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  telemetryTag?: string;
  duration?: number;
}

export function useCyberToast() {
  const toasts = useState<CyberToast[]>("cyber_toasts", () => []);

  const showToast = (toast: Omit<CyberToast, "id">) => {
    const id = "toast_" + Math.random().toString(36).substring(2, 9);
    const duration = toast.duration ?? 5000;

    const newToast: CyberToast = {
      ...toast,
      id,
      duration,
      telemetryTag:
        toast.telemetryTag ||
        (toast.type === "success"
          ? "STATUS // 200 OK"
          : toast.type === "error"
          ? "ERROR // REJECTED"
          : "ALERT // NOTICE"),
    };

    toasts.value = [...toasts.value, newToast];

    if (duration > 0 && typeof window !== "undefined") {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return {
    toasts,
    showToast,
    removeToast,
  };
}
