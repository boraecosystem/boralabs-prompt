<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>

<script setup lang="ts">
useSeoMeta({
  ogType: "website",
  ogUrl: "https://prompt.boralabs.com/",
  title: "BORALABS - Prompt Market",
  ogTitle: "BORALABS - Prompt Market",
  description:
    "AI Prompt Template NFT Market : Discover and test AI prompt templates for various tasks. Buy, sell, and verify ownership as NFTs on our decentralized platform.",
  ogDescription:
    "AI Prompt Template NFT Market : Discover and test AI prompt templates for various tasks. Buy, sell, and verify ownership as NFTs on our decentralized platform.",
  ogImage: "https://static.boraportal.com/labs/boralabs_prompt_og.jpg",
  ogSiteName: "BORALABS Prompt Market",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
});
</script>
