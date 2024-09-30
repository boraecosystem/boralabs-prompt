import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { QUERY_KEY } from "~/constants/keys";
import FaucetService from "~/services/apis/faucet.service";
import { metamask } from "~/services/metamask.service";

export const useConnectWalletMutation = () => {
  const queryClient = useQueryClient();
  const { setWallet } = useWalletStore();

  async function connectWallet() {
    const { hasWallet, link } = await metamask.init();
    if (!hasWallet) {
      await navigateTo(link, {
        external: true,
      });
      return;
    }

    const accounts = await metamask.requestAccounts();
    await metamask.switchChain();
    await metamask.sendSignMessage(
      "Connect wallet to BORALABS - Prompt Market"
    );

    return accounts;
  }

  async function getFaucet(address: string) {
    const balance = await metamask.getBalance();
    if (balance > 0) return;
    const faucetApi = new FaucetService();
    faucetApi.getGasSupply(address);
  }

  const {
    mutate: connect,
    mutateAsync: connectAsync,
    isPending,
  } = useMutation({
    mutationFn: connectWallet,
    onSuccess(data) {
      setWallet({
        account: data[0],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.wallet_check] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.token_balance],
      });
      getFaucet(data[0]);
    },
    onError: () => {},
  });

  return {
    connect,
    connectAsync,
    isPending,
  };
};
