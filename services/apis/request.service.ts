import ApiService from "./api.service";

type LimitType = {
  limit: number;
  requestTime: string;
  rest: number;
};

export default class RequestService extends ApiService {
  private requestApi;

  constructor() {
    super();
    this.requestApi = this.register(useRuntimeConfig().public.promptApi);
  }

  async postRequest(params: {
    location: string;
    userInput: string;
    sender: string;
    shopId: number;
  }): Promise<{ type: string; base64: string }> {
    return await this.requestApi(`/request`, {
      method: "POST",
      body: params,
    });
  }

  async getRequestLimit(): Promise<LimitType> {
    return await this.requestApi(`/request/limit`, {
      method: "GET",
      retry: false,
    });
  }
}
