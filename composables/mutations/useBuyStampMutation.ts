import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { ethers } from "ethers";
import { QUERY_KEY } from "~/constants/keys";
import StampService from "~/services/apis/stamp.service";
import ERC20Service from "~/services/contracts/erc20.service";
import ERC721Service from "~/services/contracts/erc721.service";
import { metamask } from "~/services/metamask.service";
import { useHandleWalletMutation } from "./useHandleWalletMutation";
import type { IShop } from "~/types/shop.types";

export const useBuyStampMutation = () => {
  const queryClient = useQueryClient();
  const route = useRoute();
  const router = useRouter();
  const config = useRuntimeConfig();
  const stampApi = new StampService();
  const erc20 = new ERC20Service(config.public.tokenAddress);
  const { account, token } = storeToRefs(useWalletStore());
  const { setPrepareInfo } = useCheckoutStore();
  const { requestImageInfo, prepareInfo } = storeToRefs(useCheckoutStore());

  const exitBypass = ref(false);
  const setExitBypass = (value: boolean) => {
    exitBypass.value = value;
  };

  const { handleWalletAsync } = useHandleWalletMutation();
  async function _buyPrepare(params: { key?: string }) {
    const { key } = params;
    return await handleWalletAsync({
      func: async () => {
        return await stampApi.postBuyPrepare({
          key,
        });
      },
      isBalanceCheckRequired: true,
    });
  }

  const { mutate: buyPrepare, mutateAsync: buyPrepareAsync } = useMutation({
    mutationFn: _buyPrepare,
    onSuccess(data) {
      setPrepareInfo(data);
      router.push(`/checkout/${Number(route.params.promptId)}`);
    },
  });

  async function checkAllowance(nftAddress: string) {
    return Number(
      ethers.formatUnits(
        await erc20.allowance(account.value!, nftAddress),
        token.value?.decimals
      )
    );
  }

  async function checkApprove(nftAddress: string, amount: string) {
    const provider = metamask.getEthersProvider();
    const signer = await provider?.getSigner()!;
    const ApproveTx = await erc20.approve(
      nftAddress,
      ethers.parseUnits(amount, token.value?.decimals),
      signer
    );
    await ApproveTx.wait();
  }

  async function postBuy(params: {
    shopId: number;
    tokenId: number;
    paidAmount: number;
    txHash: string;
    session: string;
    key: string;
  }) {
    await stampApi.postBuy(params);
  }

  async function mintERC721(shopDetail: IShop) {
    const provider = metamask.getEthersProvider();
    const signer = await provider?.getSigner()!;

    const erc721 = new ERC721Service(shopDetail.contract);
    const tx = await erc721.mintWithERC20(prepareInfo.value?.tokenId!, signer);

    await postBuy({
      shopId: Number(route.params.promptId as string),
      tokenId: prepareInfo.value?.tokenId!,
      txHash: tx.hash,
      paidAmount: Number(shopDetail.price), //mintPrice
      session: prepareInfo.value?.session!,
      key: requestImageInfo.value?.key!,
    });

    await tx.wait();
  }

  async function sessionCheck() {
    const { checkoutSession } = storeToRefs(useCheckoutStore());

    // isValidSession
    return await stampApi.postBuySessionCheck(checkoutSession.value);
  }

  async function _buyStamp(shopDetail: IShop) {
    await handleWalletAsync({
      func: async () => {
        const isValidSession = await sessionCheck();
        if (!isValidSession) {
          setExitBypass(true);
          navigateToCheckoutResult(false);
        }
        const allowance = await checkAllowance(shopDetail.contract);
        if (allowance < Number(shopDetail.price)) {
          await checkApprove(shopDetail.contract, shopDetail.price);
        }

        await mintERC721(shopDetail);
      },
      isBalanceCheckRequired: true,
    });
  }

  const {
    mutate: buyStamp,
    mutateAsync: buyStampAsync,
    isPending,
  } = useMutation({
    mutationFn: _buyStamp,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.my_stamp],
      });
      setExitBypass(true);
      navigateToCheckoutResult(true);
      console.log(data, "buy stamp mutation success");
    },

    onError: (e) => {
      setExitBypass(true);
      navigateToCheckoutResult(false);
      console.error(e, "mint token mutation error");
    },
  });

  return {
    buyStamp,
    buyStampAsync,
    buyPrepare,
    buyPrepareAsync,
    sessionCheck,
    setExitBypass,
    isPending,
    exitBypass,
  };
};
