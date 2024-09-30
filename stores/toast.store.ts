import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", () => {
  const toast = ref({
    isShow: false,
    isWarning: false,
    message: "",
  });

  function showToast(params: { _message?: string; _isWarning?: boolean }) {
    const { _message, _isWarning } = params;
    toast.value = {
      isShow: true,
      isWarning: _isWarning ?? false,
      message: _message ?? "",
    };
  }

  function closeToast() {
    toast.value = {
      isShow: false,
      isWarning: false,
      message: "",
    };
  }

  return {
    toast,
    showToast,
    closeToast,
  };
});
