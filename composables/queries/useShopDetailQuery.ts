import { useQuery } from "@tanstack/vue-query";
import ShopService from "@/services/apis/shop.service";
import { QUERY_KEY } from "~/constants/keys";
import ERC721Service from "~/services/contracts/erc721.service";

export const useShopDetailQuery = async (promptId: number) => {
  const shopApi = new ShopService();

  const { account } = storeToRefs(useWalletStore());

  const {
    data: shopDetail,
    isLoading: isShopDeatilLoading,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.shop_detail, promptId, account],
    queryFn: async () => {
      const shopDetail = await shopApi.getShop(promptId);

      return shopDetail;
    },
    retry: false,
    gcTime: 0,
    staleTime: 0,
  });

  const enabled = computed(() => !!account.value && !!shopDetail.value);

  const { data: hasNFT, isLoading: is721Loading } = useQuery({
    queryKey: [QUERY_KEY.shop_detail, promptId, account, "721"],
    queryFn: async () => {
      const erc721 = new ERC721Service(shopDetail.value?.contract as string);
      return await erc721.hasMinted(account.value!);
    },

    enabled,
  });

  const isLoading = computed(
    () => is721Loading.value || isShopDeatilLoading.value
  );

  return {
    shopDetail,
    isLoading,
    hasNFT,
    refetch,
  };
};
