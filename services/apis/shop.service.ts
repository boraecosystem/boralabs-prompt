import type { IShop } from "~/types/shop.types";
import ApiService from "./api.service";
import type { CStamp } from "~/types/stamp.type";

export default class ShopService extends ApiService {
  private shopApi;

  constructor() {
    super();
    this.shopApi = this.register(useRuntimeConfig().public.promptApi);
  }

  async getShops(): Promise<{
    items: Array<CStamp>;
    totalCount: number;
  }> {
    return await this.shopApi("/shops", {
      method: "GET",
      retry: false,
    });
  }

  async getShop(id: number): Promise<IShop> {
    return await this.shopApi(`/shops/${id}`, {
      method: "GET",
      retry: false,
    });
  }

  async getShopPrompt(
    id: number
  ): Promise<{
    prompt: string;
    engineOption: {
      cfg_scale: number;
      seed: number;
      steps: number;
      width: number;
      height: number;
      style: string;
    };
  }> {
    return await this.shopApi(`/shops/${id}/prompt`, {
      method: "GET",
      retry: false,
    });
  }
}
