import { useQuery } from "@tanstack/vue-query";
import { QUERY_KEY } from "~/constants/keys";
import StampService from "~/services/apis/stamp.service";
export const useStampQuery = () => {
  const stampApi = new StampService();
  const { account } = storeToRefs(useWalletStore());

  const { data: myStampList, isLoading: _isLoading } = useQuery({
    queryKey: [QUERY_KEY.my_stamp, account],
    queryFn: async () => {
      const result = await stampApi.getStamps();
      return result;
    },
    enabled: import.meta.client,
  });

  const isLoading = computed(() => {
    if (import.meta.server) return true;
    return _isLoading.value;
  });

  return {
    myStampList,
    isLoading,
  };
};
