<template>
  <section class="title">
    <h2>My Stamps</h2>
    <button class="wallet" @click="copyText(account!)">
      {{ truncate(account!) }}
    </button>
  </section>

  <StampCard
    v-if="myStampList?.length"
    :stampCardList="myStampList"
    :isLoading="isLoading"
    :isMy="true"
  />
  <div v-else class="empty-stamp">
    <NuxtImg
      src="images/empty.png"
      width="344"
      height="234"
      format="webp"
      alt="no stamp"
    />
    <strong>You don’t have any stamps yet.</strong>
    <p>Let’s start collecting stamps!</p>
  </div>
</template>

<script setup lang="ts">
import { useStampQuery } from "~/composables/queries/useStampQuery";

definePageMeta({
  middleware: "auth",
});

const { myStampList, isLoading } = useStampQuery();
const { account } = storeToRefs(useWalletStore());
</script>

<style lang="scss" scoped>
.title {
  @include flex-center;
  flex-direction: column;
  height: 380px;
  margin-top: -140px;
  margin-bottom: 50px;
  padding-top: 65px; //78
  border-bottom: 1px solid rgba(#fff, 0.08);
  background: url(#{$imgPath}bg-my.webp) no-repeat 50% 78px;
  background-size: 100% auto;

  h2 {
    font-family: PB;
    font-size: 5rem;
  }
}

.wallet {
  height: 40px;
  margin-top: 16px;
  padding: 0 15px;
  background: rgba(#fff, 0.12);
  border-radius: 20px;
  transition: background 0.2s;

  &::before {
    width: 22px;
    height: 22px;
  }

  &:hover {
    background: rgba(#fff, 0.18);
  }
}

.empty-stamp {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 110px;

  > strong {
    margin-top: 45px;
    font-family: PM;
    font-size: 2rem;
  }

  > p {
    margin-top: 10px;
    color: $graya;
  }
}
</style>
