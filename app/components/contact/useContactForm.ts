import { ref, computed } from "vue";

export function useContactForm() {
  const name = ref("");
  const email = ref("");
  const message = ref("");
  const companyUrl = ref(""); // Honeypot field

  const status = ref<"idle" | "submitting" | "success" | "error">("idle");
  const errorMessage = ref("");
  const fieldErrors = ref<Record<string, string>>({});

  const toast = useToast();

  const isFormValid = computed(() => {
    return (
      name.value.trim().length >= 2 &&
      email.value.trim().length >= 5 &&
      message.value.trim().length >= 10 &&
      email.value.includes("@")
    );
  });

  async function submitForm() {
    if (!isFormValid.value || status.value === "submitting") return;

    status.value = "submitting";
    errorMessage.value = "";
    fieldErrors.value = {};

    try {
      const response = await $fetch<{ success: boolean; message: string }>("/api/contact", {
        method: "POST",
        body: {
          name: name.value,
          email: email.value,
          message: message.value,
          company_url: companyUrl.value,
        },
      });

      // Clear fields on success
      name.value = "";
      email.value = "";
      message.value = "";
      companyUrl.value = "";
      status.value = "success";

      toast.add({
        title: "Transmission Acknowledged",
        description: response.message || "Message transmitted successfully.",
        color: "success",
        icon: "i-lucide-check-circle",
        duration: 6000,
      });

      // Reset success status after 6s
      setTimeout(() => {
        if (status.value === "success") {
          status.value = "idle";
        }
      }, 6000);
    } catch (err: any) {
      status.value = "error";

      const serverData = err?.data?.data;
      const errorMsg =
        serverData?.message ||
        err?.data?.statusMessage ||
        err?.message ||
        "An unexpected transmission error occurred. Please try again.";

      errorMessage.value = errorMsg;
      if (serverData?.errors) {
        fieldErrors.value = serverData.errors;
      }

      toast.add({
        title: "Transmission Failed",
        description: errorMsg,
        color: "error",
        icon: "i-lucide-alert-circle",
        duration: 7000,
      });
    }
  }

  return {
    name,
    email,
    message,
    companyUrl,
    status,
    errorMessage,
    fieldErrors,
    isFormValid,
    submitForm,
  };
}
