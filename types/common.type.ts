import type ContractBaseService from "@/services/contracts/contractbase.service";

export type Page<T> = {
  items: Array<T>;
  currentPage: number;
  totalPage: number;
  count?: number;
};

export interface IContractFunction {
  ref: ContractBaseService;
  func: string;
  callData: [target: string, callData: string];
  callData3: [target: string, allowFailure: boolean, callData: string];
}
