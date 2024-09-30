import { useMutation } from "@tanstack/vue-query";
import RequestService from "~/services/apis/request.service";
import { useHandleWalletMutation } from "./useHandleWalletMutation";

export const useRequestImageMutation = () => {
  const route = useRoute();
  const requestApi = new RequestService();
  const { account } = storeToRefs(useWalletStore());
  const { showToast } = useToastStore();
  const { handleWalletAsync } = useHandleWalletMutation();

  async function _requestImage(userInput: string) {
    return handleWalletAsync({
      func: async () => {
        return await requestApi.postRequest({
          location: route.path,
          userInput,
          sender: account.value!,
          shopId: Number(route.params.promptId),
        });
      },
    });
  }

  const {
    mutate: requestImage,
    mutateAsync: requestImageAsync,
    isPending,
  } = useMutation({
    mutationFn: _requestImage,
    onSuccess(data, variables, context) {
      return data;
    },
    onError(error: any) {
      showToast({
        _message: error.data.message,
        _isWarning: true,
      });
    },
  });

  return {
    requestImage,
    requestImageAsync,
    isPending,
  };
};
