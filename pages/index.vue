<template>
  <section class="visual">
    <div class="visual-contents">
      <div class="visual-img">
        <NuxtImg
          src="images/banner-1.png"
          width="340"
          height="340"
          alt="??"
          format="webp"
        />
        <NuxtImg
          src="images/banner-2.png"
          width="340"
          height="340"
          alt="??"
          format="webp"
        />
        <NuxtImg
          src="images/banner-3.png"
          width="340"
          height="340"
          alt="??"
          format="webp"
        />
      </div>
      <div class="visual-text">
        <h1>AI Prompt Template NFT Market</h1>
        <p class="desc">
          Discover and test AI prompt templates for various tasks.<br />
          Buy, sell, and verify ownership as NFTs on our decentralized platform.
        </p>
      </div>
    </div>
  </section>

  <template v-if="isConnected">
    <Hx :shadowText="'My Stamps'" :hxText="'My Stamps'" />
    <MyStampsMain />
  </template>

  <Hx :shadowText="'Stamp Shops'" :hxText="'Stamp Shops'" />
  <StampCard :stampCardList="shopList" :isLoading="isLoading" />
  <Hx class="mt" :shadowText="'How to Use'" :hxText="'How to Use'" />

  <Guide />
</template>

<script setup lang="ts">
import { useShopQuery } from "~/composables/queries/useShopQuery";

const { isConnected } = storeToRefs(useWalletStore());
const { shopList, isLoading } = useShopQuery();
</script>

<style lang="scss" scoped>
.visual {
  height: 700px;
  margin-top: -140px;
  padding-top: 140px;
  background: url("#{$imgPath}bg-visual.webp") no-repeat 50% 130%;
  text-align: center;

  &-contents {
    overflow: hidden;
    position: relative;
    width: 1020px;
    margin: 0 auto;
    padding-top: 83px;
    background: url("#{$imgPath}bg-slider.webp") no-repeat 50% 0;
    background-size: 957px 148px;
    border-radius: 12px;
  }

  &-img {
    overflow: hidden;
    display: inline-flex;
    justify-content: center;
    border-radius: 12px;
    a {
      flex: 1;
    }
  }

  &-text {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    h1 {
      overflow: hidden;
      position: relative;
      top: 50%;
      width: 15.4em;
      margin: 0 auto;
      border-right: 2px solid rgba(#fff, 0.7);
      font-family: PB;
      font-size: 5rem;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
      white-space: nowrap;
      transform: translateY(-50%);
      animation: typewriter 5s steps(30) 2s 1 normal both,
        blinkCursor 700ms steps(30) infinite normal;
    }

    @keyframes typewriter {
      from {
        width: 0;
      }
      to {
        width: 15.4em;
      }
    }
    @keyframes blinkCursor {
      from {
        border-right-color: rgba(#fff, 0.7);
      }
      to {
        border-right-color: transparent;
      }
    }

    .desc {
      margin-top: 5px;
      padding: 26px 0;
      background: rgba($bg, 0.5);
      backdrop-filter: blur(3px);
      font-size: 1.8rem;
      line-height: 1.3;
    }
  }

  & + .hx-design {
    margin-top: 0;
  }
}
</style>
