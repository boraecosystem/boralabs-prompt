import { useQuery } from "@tanstack/vue-query";
import { QUERY_KEY } from "~/constants/keys";
import ShopService from "@/services/apis/shop.service";
export const useShopQuery = () => {
  const shopApi = new ShopService();

  const { data: shopList, isLoading: _isLoading } = useQuery({
    queryKey: [QUERY_KEY.shop],
    queryFn: async () => {
      const { items } = await shopApi.getShops();
      return items;
    },
    enabled: import.meta.client,
  });

  const isLoading = computed(() => {
    if (import.meta.server) return true;
    return _isLoading.value;
  });

  return {
    shopList,
    isLoading,
  };
};
