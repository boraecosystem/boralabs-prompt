import type { CStamp, IPrepareInfo, IStamp } from "~/types/stamp.type";
import ApiService from "./api.service";

export default class StampService extends ApiService {
  private stampApi;

  constructor() {
    super();
    this.stampApi = this.register(useRuntimeConfig().public.promptApi);
  }

  async postBuyPrepare(parmas: {
    key: string | undefined;
  }): Promise<IPrepareInfo> {
    return await this.stampApi(`/buy/prepare`, {
      method: "POST",
      body: parmas,
      retry: false,
    });
  }

  async postBuySessionCheck(
    session: string | undefined
  ): Promise<IPrepareInfo> {
    return await this.stampApi(`/buy/session/check`, {
      method: "POST",
      body: {
        session: session,
      },
      retry: false,
    });
  }

  async postBuy(params: {
    shopId: number;
    tokenId: number;
    paidAmount: number;
    txHash: string;
    session: string;
    key: string;
  }) {
    console.log(params, "params");
    return await this.stampApi(`/buy`, {
      method: "POST",
      body: params,
    });
  }

  async getStamps(): Promise<Array<CStamp>> {
    const result = await this.stampApi<Array<IStamp>>("/stamps", {
      method: "GET",
    });

    const stamps = result.map((stamp) => {
      const { shopId, owner, tokenImage, txHash, paidAmount, shop } = stamp;
      return {
        ...shop,
        tokenImage,
      };
    });

    return stamps;
  }
}
