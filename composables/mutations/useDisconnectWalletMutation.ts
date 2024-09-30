import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { QUERY_KEY } from "~/constants/keys";
import { metamask } from "~/services/metamask.service";

export const useDisconnectWalletMutation = () => {
  const queryClient = useQueryClient();
  const { setWallet } = useWalletStore();

  async function disconnectWallet() {
    await metamask.revoke();
    setWallet(undefined);
  }

  const {
    mutate: disconnect,
    mutateAsync: disconnectAsync,
    isPending,
  } = useMutation({
    mutationFn: disconnectWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.wallet_check] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.token_balance],
      });
    },
    onError: () => {},
  });

  return {
    disconnect,
    disconnectAsync,
    isPending,
  };
};
