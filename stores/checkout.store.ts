import { defineStore } from "pinia";
import type { IPrepareInfo } from "~/types/stamp.type";

interface IRequestImageInfo {
  key: string;
  image: string;
  prompt: string;
}

export const useCheckoutStore = defineStore(
  "checkout",
  () => {
    const requestImageInfo = ref<IRequestImageInfo>();
    function setRequestImageInfo(info: IRequestImageInfo | undefined) {
      requestImageInfo.value = info;
    }

    const prepareInfo = ref<IPrepareInfo>();

    const checkoutSession = computed(() => prepareInfo.value?.session || "");

    function setPrepareInfo(_prepareInfo: IPrepareInfo) {
      prepareInfo.value = _prepareInfo;
    }

    return {
      requestImageInfo,
      setRequestImageInfo,
      prepareInfo,
      checkoutSession,
      setPrepareInfo,
    };
  },

  {
    // persist: true,
  }
);
