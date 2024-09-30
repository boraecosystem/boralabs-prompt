import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { QUERY_KEY } from "~/constants/keys";
import ERC20Service from "~/services/contracts/erc20.service";
import { metamask } from "~/services/metamask.service";

export const useMintTokenMutation = () => {
  const queryClient = useQueryClient();
  const { showToast, closeToast } = useToastStore();
  const { token } = storeToRefs(useWalletStore());

  async function _mintToken() {
    const config = useRuntimeConfig();
    const erc20 = new ERC20Service(config.public.tokenAddress);
    const provider = metamask.getEthersProvider();
    const signer = await provider?.getSigner()!;
    const tx = await erc20.mint(signer);
    showToast({ _message: `Minting ${token.value?.symbol} tokens...` });
    await tx.wait();
    closeToast();
  }

  const {
    mutate: mintToken,
    mutateAsync: mintTokenAsync,
    isPending,
  } = useMutation({
    mutationFn: _mintToken,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.token_balance],
      });
      showToast({
        _message: `Successfully minted ${token.value?.symbol} token.`,
      });
    },
    onError: () => {
      showToast({
        _message: `Failed to mint ${token.value?.symbol} token.`,
        _isWarning: true,
      });
    },
  });

  return {
    mintToken,
    mintTokenAsync,
    isPending,
  };
};
