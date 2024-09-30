import { useQuery } from "@tanstack/vue-query";
import { QUERY_KEY } from "~/constants/keys";
import { metamask } from "~/services/metamask.service";

export const useWalletQuery = () => {
  const { setWallet } = useWalletStore();
  const { wallet, account, isConnected } = storeToRefs(useWalletStore());

  async function checkWallet() {
    const { hasWallet } = await metamask.init();
    if (hasWallet && isConnected.value) {
      const accounts = await metamask.getAccounts();
      if (accounts.length === 0 || wallet.value?.account !== accounts[0]) {
        setWallet(undefined);
      }
    } else {
      setWallet(undefined);
    }

    return {
      wallet,
      isConnected,
    };
  }

  const { isLoading } = useQuery({
    queryKey: [QUERY_KEY.wallet_check, account],
    queryFn: checkWallet,
    enabled: import.meta.client,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 0.5,
    gcTime: 1000 * 60 * 5,
  });

  return {
    isLoading,
  };
};
