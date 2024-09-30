import { ethers, type BrowserProvider } from "ethers";
import { createStore, type EIP6963ProviderDetail, type Store } from "mipd";

class MetamaskService {
  private store: Store;
  private walletProvider: EIP6963ProviderDetail | undefined;
  private ethersProvider: BrowserProvider | undefined;
  private static instance: MetamaskService;

  private constructor() {
    this.store = createStore();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new MetamaskService();
    return this.instance;
  }

  async init() {
    try {
      this.store = createStore();
      this.walletProvider = this.store.findProvider({ rdns: "io.metamask" });
      this.ethersProvider = new ethers.BrowserProvider(
        this.walletProvider?.provider,
        "any"
      );
    } catch (e) {
      console.error("Cannot find wallet provider", { e });
    }
    return {
      hasWallet: !!this.walletProvider,
      link: "https://metamask.io/download/",
    };
  }

  async revoke() {
    const accounts = await this.getAccounts();
    await this.walletProvider!.provider.request({
      method: "wallet_revokePermissions",
      params: [
        {
          eth_accounts: accounts,
        },
      ],
    });
    this.store.destroy();
    this.walletProvider = undefined;
    this.ethersProvider = undefined;
  }

  async requestAccounts() {
    return await this.walletProvider!.provider.request({
      method: "eth_requestAccounts",
    });
  }

  async getAccounts() {
    return await this.walletProvider!.provider.request({
      method: "eth_accounts",
    });
  }

  async getAddress() {
    const signer = await this.ethersProvider!.getSigner();
    return await signer.getAddress();
  }

  async getChainId() {
    return Number((await this.ethersProvider!.getNetwork()).chainId);
  }

  async getBalance() {
    const address = await this.getAddress();
    return Number(
      ethers.formatEther(await this.ethersProvider!.getBalance(address))
    );
  }

  getWalletProvider() {
    return this.walletProvider;
  }

  getEthersProvider() {
    return this.ethersProvider;
  }

  async switchChain() {
    const {
      public: { chainId, chainName, rpcUrl, explorerUrl },
    } = useRuntimeConfig();
    try {
      await this.walletProvider!.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
      });
    } catch (e: any) {
      if (e.message.toLowerCase().includes("rejected")) {
        throw new Error("Network switch request canceled");
      }
      await this.walletProvider!.provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${Number(chainId).toString(16)}`,
            rpcUrls: [rpcUrl],
            chainName,
            blockExplorerUrls: [explorerUrl],
          },
        ],
      });
    }
  }

  async sendSignMessage(message: string) {
    const signer = await this.ethersProvider!.getSigner();
    await signer.signMessage(message);
  }
}

export const metamask = MetamaskService.getInstance();
