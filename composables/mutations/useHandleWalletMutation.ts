import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { metamask } from "~/services/metamask.service";
import { useConnectWalletMutation } from "./useConnectWalletMutation";
import { QUERY_KEY } from "~/constants/keys";
import { useMintTokenMutation } from "./useMintTokenMutation";
import { useTokenBalanceQuery } from "../queries/useTokenBalanceQuery";

export const useHandleWalletMutation = () => {
  const queryClient = useQueryClient();
  const { setWallet } = useWalletStore();
  const { account, isConnected } = storeToRefs(useWalletStore());
  const { connectAsync } = useConnectWalletMutation();

  const { mintTokenAsync } = useMintTokenMutation();
  const { isMintable } = useTokenBalanceQuery();

  async function _handleWallet(cb?: {
    func: (...args: any) => any | Promise<any>;
    isBalanceCheckRequired?: boolean;
  }) {
    if (!isConnected.value) {
      await connectAsync();
    }

    const walletAddress = await metamask.getAddress();
    if (walletAddress.toLowerCase() !== account.value?.toLowerCase()) {
      setWallet(undefined);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.wallet_check] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.token_balance],
      });
      return;
    }

    const walletChainId = await metamask.getChainId();

    const {
      public: { chainId },
    } = useRuntimeConfig();
    if (walletChainId !== Number(chainId)) {
      await metamask.switchChain();
    }

    const { func, isBalanceCheckRequired } = cb ?? {};

    if (isBalanceCheckRequired && isMintable.value) {
      await mintTokenAsync();
    }

    if (func) {
      // @ts-ignore
      return await func.apply();
    }
  }

  const {
    mutate: handleWallet,
    mutateAsync: handleWalletAsync,
    isPending,
  } = useMutation({
    mutationFn: _handleWallet,
    onSuccess(data, variables, context) {
      return data;
    },
    onError: (e) => {},
  });

  return {
    handleWallet,
    handleWalletAsync,
    isPending,
  };
};
