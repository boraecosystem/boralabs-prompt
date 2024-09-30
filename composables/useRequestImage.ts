import { useRequestImageMutation } from "./mutations/useRequestImageMutation";
import { useRequestLimitQuery } from "./queries/useRequestLimitQuery";

export const useRequestImage = () => {
  const { showToast } = useToastStore();
  const { setRequestImageInfo } = useCheckoutStore();
  const { requestImageInfo } = storeToRefs(useCheckoutStore());
  const { rest, refetch } = useRequestLimitQuery();
  const { requestImageAsync, isPending: isRequest } = useRequestImageMutation();

  const promptInput = ref<string>(requestImageInfo.value?.prompt!);
  const isBlocked = computed(
    () => isRequest.value || rest.value === 0 || !promptInput.value
  );

  async function requestPromptImage() {
    const { key, type, base64 } = await requestImageAsync(promptInput.value);
    await refetch();
    const image = `data:${type};base64,${base64}`;
    setRequestImageInfo({
      key,
      image,
      prompt: promptInput.value,
    });
    showRequestImageToast(rest.value ?? 0);
  }

  function showRequestImageToast(rest: number) {
    showToast({
      _isWarning: rest === 0 ? true : false,
      _message:
        rest === 0
          ? "No attempts left. Please try again in 1 hour."
          : `You have ${rest} tryout attempts left this hour.`,
    });
  }

  onUnmounted(() => (promptInput.value = ""));

  return {
    promptInput,
    isRequest,
    isBlocked,
    requestPromptImage,
  };
};
