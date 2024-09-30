import { Contract, ethers, type Signer } from "ethers";
import ContractBaseService from "@/services/contracts/contractbase.service";
import { IERC721 } from "~/constants/abis";

export default class ERC721Service extends ContractBaseService {
  protected override contract: any;

  constructor(address: string) {
    const provider = ContractBaseService.getJsonRpcProvider();
    super({ provider, address, abi: IERC721 });
    this.contract = new Contract(address, IERC721, provider);
  }

  async hasMinted(address: string) {
    return await this.contract.hasMinted(address);
  }

  async mintPrice() {
    return await this.contract.mintPrice();
  }

  async mintWithERC20(
    tokenId: number,
    signer: Signer
  ): Promise<ethers.TransactionResponse> {
    return await this.contract.connect(signer).mintWithERC20(tokenId);
  }
}
