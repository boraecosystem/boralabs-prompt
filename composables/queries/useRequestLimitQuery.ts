import { useQuery } from "@tanstack/vue-query";
import { QUERY_KEY } from "~/constants/keys";
import RequestService from "~/services/apis/request.service";

export const useRequestLimitQuery = () => {
  const requestApi = new RequestService();
  const { account, isConnected } = storeToRefs(useWalletStore());

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.request_limit, account],
    queryFn: () => {
      console.log("Query: limit 확인");
      return requestApi.getRequestLimit();
    },
    enabled: import.meta.client && isConnected,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  });

  const limit = computed(() => data.value?.limit);
  const rest = computed(() => data.value?.rest);
  const requestTime = computed(() => data.value?.requestTime);

  return {
    limit,
    rest,
    requestTime,
    isLoading,
    refetch,
  };
};
