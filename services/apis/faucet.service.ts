import ApiService from "./api.service";

export default class FaucetService extends ApiService {
  private faucetApi;

  constructor() {
    super();
    this.faucetApi = this.register(useRuntimeConfig().public.faucetApi);
  }

  async getGasSupply(address: string) {
    await this.faucetApi(`/bgas/${address}`, {
      method: "GET",
      retry: false,
    });
  }
}
