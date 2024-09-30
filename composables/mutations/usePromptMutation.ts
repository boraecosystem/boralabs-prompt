import { useMutation } from "@tanstack/vue-query";
import ShopService from "~/services/apis/shop.service";
import { useHandleWalletMutation } from "./useHandleWalletMutation";

const DEFAULT_PROMPT =
  "this is example of Prompt this is example of Prompt this is example of Prompt this is example of Prompt this is example of Prompt this is example of Prompt this is example of Prompt this is example of Prompt";

export const usePromptMutation = () => {
  const shopApi = new ShopService();
  const prompt = ref<{
    prompt: string;
    engineOption: {
      cfg_scale: number;
      seed: number;
      steps: number;
      width: number;
      height: number;
      style: string;
    };
  }>({
    prompt: DEFAULT_PROMPT,
    engineOption: {
      cfg_scale: 0,
      seed: 0,
      steps: 0,
      width: 0,
      height: 0,
      style: "",
    },
  });
  const isLocked = ref(true);

  const { handleWalletAsync } = useHandleWalletMutation();

  async function unlockPrompt(promptId: number) {
    return await handleWalletAsync({
      func: async () => {
        return await shopApi.getShopPrompt(promptId);
      },
    });
  }

  const {
    mutate: showPrompt,
    mutateAsync: showPromptAsync,
    isPending,
  } = useMutation({
    mutationFn: unlockPrompt,
    onSuccess(data) {
      const replaceSlot = (str: string) => str.replace(/<slot::>/g, "_______");
      prompt.value = {
        prompt: replaceSlot(data.prompt),
        engineOption: data.engineOption,
      };
      isLocked.value = false;
    },
    onError() {
      prompt.value.prompt = DEFAULT_PROMPT;
      isLocked.value = true;
    },
  });

  return {
    prompt,
    isLocked,
    showPrompt,
    showPromptAsync,
    isPending,
  };
};
