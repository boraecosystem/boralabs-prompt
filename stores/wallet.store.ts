import { defineStore } from "pinia";

type WalletType = {
  account: string;
  token?: {
    symbol: string;
    balance: string;
    decimals: bigint;
  };
};

export const useWalletStore = defineStore(
  "wallet",
  () => {
    const wallet = ref<WalletType>();

    const account = computed(() => wallet.value?.account);
    const token = computed(() => wallet.value?.token);
    const isConnected = computed(() => !!wallet.value);

    function setWallet(_wallet: WalletType | undefined) {
      wallet.value = _wallet;
    }

    return {
      wallet,
      account,
      token,
      isConnected,
      setWallet,
    };
  },
  {
    persist: true,
  }
);
