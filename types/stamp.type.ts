import type { IShop } from "./shop.types";

export interface IStamp {
  id: number;
  shopId: number;
  tokenId: number;
  paidAmount: number;
  isShow: number;
  owner: string;
  tokenImage: string;
  txHash: string;
  createdAt: string;
  shop: IShop;
}

export interface IPrepareInfo {
  key: null | string;
  remain: number;
  session: string;
  tokenId: number;
}
export interface CStamp extends IShop {
  tokenImage?: string;
}
