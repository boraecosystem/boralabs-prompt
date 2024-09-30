export default abstract class ApiService {
  protected constructor() {}

  protected register(baseURL: string) {
    const client = $fetch.create({
      baseURL,
      onRequest({ request, options }) {
        const { account, isConnected } = useWalletStore();
        // CHECKLIST: 헤더옵션은 추후 변경될 수 도 있음
        if (isConnected) {
          options.headers = { user: account! };
        }
      },
      onRequestError(requestError) {},
      onResponse(response) {},
      onResponseError({ request, response, error }) {
        // request image failed
        if (
          response.status === 400 &&
          (response._data.code === 10010 || response._data.code === 10007)
        ) {
          return;
        }
        if (response.status === 500) {
          throw createError({ statusCode: 500, fatal: true });
        }
        navigateTo("/error");
      },
    });

    return client;
  }
}
