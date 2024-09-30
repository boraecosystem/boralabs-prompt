import { Contract, ethers, type Signer } from "ethers";
import ContractBaseService from "@/services/contracts/contractbase.service";
import { IERC20 } from "~/constants/abis";

export default class ERC20Service extends ContractBaseService {
  protected override contract: any;

  constructor(address: string) {
    const provider = ContractBaseService.getJsonRpcProvider();
    super({ provider, address, abi: IERC20 });
    this.contract = new Contract(address, IERC20, provider);
  }

  async allowance(owner: string, spender: string): Promise<bigint> {
    return await this.contract.allowance(owner, spender);
  }

  async approve(
    spender: string,
    amount: string | bigint,
    signer: Signer
  ): Promise<ethers.TransactionResponse> {
    return await this.contract.connect(signer).approve(spender, amount);
  }

  async balanceOf(address: string): Promise<bigint> {
    return await this.contract.balanceOf(address);
  }

  async decimals(): Promise<bigint> {
    return await this.contract.decimals();
  }

  async mint(signer: Signer): Promise<ethers.TransactionResponse> {
    return await this.contract.connect(signer).mint();
  }

  async symbol(): Promise<string> {
    return await this.contract.symbol();
  }
}
