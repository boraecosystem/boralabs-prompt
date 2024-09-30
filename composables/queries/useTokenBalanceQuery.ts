import { useQuery } from "@tanstack/vue-query";
import { ethers } from "ethers";
import { QUERY_KEY } from "~/constants/keys";
import ERC20Service from "~/services/contracts/erc20.service";

export const useTokenBalanceQuery = () => {
  const { setWallet } = useWalletStore();
  const { account, token } = storeToRefs(useWalletStore());

  async function getTokenInfo() {
    console.log("Query: 토큰 자산 확인");
    const config = useRuntimeConfig();
    const erc20 = new ERC20Service(config.public.tokenAddress);
    const [symbol, decimals, _balance] = await Promise.all([
      erc20.symbol(),
      erc20.decimals(),
      erc20.balanceOf(account.value!),
    ]);

    const balance = ethers.formatUnits(_balance, decimals);
    setWallet({
      account: account.value!,
      token: {
        symbol,
        balance,
        decimals,
      },
    });

    return {
      balance,
      symbol,
    };
  }

  const isEnabled = computed(() => !!account.value && import.meta.client);
  const { isLoading } = useQuery({
    queryKey: [QUERY_KEY.token_balance, account],
    queryFn: getTokenInfo,
    enabled: isEnabled,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 0.5,
    gcTime: 1000 * 60 * 5,
  });

  const isMintable = computed(() => {
    return Number(token.value?.balance) < 20 ? true : false;
  });

  return {
    isLoading,
    isMintable,
  };
};
