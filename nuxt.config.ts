// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
    "nuxt-gtag",
  ],
  gtag: {
    id: "G-FT2NMLZDJ2",
  },
  app: {
    head: {
      charset: "utf-8",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "AI Prompt Template NFT Market : Discover and test AI prompt templates for various tasks. Buy, sell, and verify ownership as NFTs on our decentralized platform.",
        },
      ],
      title: "BORALABS - Prompt Market",
    },
    rootAttrs: {
      id: "app",
    },
  },
  image: {
    quality: 80,
  },
  css: ["~/assets/scss/style.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_common.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      chainId: process.env.NUXT_PUBLIC_CHAIN_ID,
      chainName: process.env.NUXT_PUBLIC_CHAIN_NAME,
      rpcUrl: process.env.NUXT_PUBLIC_RPC_URL,
      explorerUrl: process.env.NUXT_PUBLIC_EXPLORER_URL,
      tokenAddress: process.env.NUXT_PUBLIC_TOKEN_ADDRESS,
      promptApi: process.env.NUXT_PROMPT_API,
      faucetApi: process.env.NUXT_FAUCET_API,
    },
  },
  nitro: {
    compressPublicAssets: true,
    minify: true,
  },
  features: {
    inlineStyles: false,
  },
});
