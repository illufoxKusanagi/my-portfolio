import { ref, computed } from "vue";
import { useCyberToast } from "~/composables/useCyberToast";

export function useContactForm() {
  const name = ref("");
  const email = ref("");
  const message = ref("");
  const companyUrl = ref(""); // Honeypot field

  const status = ref<"idle" | "submitting" | "success" | "error">("idle");
  const errorMessage = ref("");
  const fieldErrors = ref<Record<string, string>>({});

  const { showToast } = useCyberToast();

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

      showToast({
        type: "success",
        title: "Transmission Acknowledged",
        message: response.message || "Message transmitted successfully.",
        telemetryTag: "TRANSMISSION // 200 OK",
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

      showToast({
        type: "error",
        title: "Transmission Failed",
        message: errorMsg,
        telemetryTag: `ERR // ${err?.statusCode || 400}`,
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
