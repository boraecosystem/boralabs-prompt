<template>
  <section class="inner item-wrap">
    <template v-if="isLoading">
      <Skeleton v-for="i in 7" :key="i" />
    </template>

    <template v-else-if="!empty">
      <NuxtLink
        :to="`/myNFT/${myStamp.id}`"
        class="item"
        v-for="myStamp in myStampList"
        :key="myStamp.id"
      >
        <NuxtImg
          :src="`${myStamp.tokenImage}`"
          width="470"
          height="470"
          format="webp"
          :alt="`stamp img title`"
        />

        <div class="item-text">
          <em>{{ myStamp.title }}</em>
          <span>{{ formatAmount(myStamp.price) }} TPZ</span>
        </div>
      </NuxtLink>
      <div v-for="i in emptyLength" :key="i" class="empty-item" />
    </template>
  </section>
</template>

<script setup lang="ts">
import { useStampQuery } from "~/composables/queries/useStampQuery";

const { myStampList, isLoading } = useStampQuery();

const emptyLength = computed(() => 7 - (myStampList?.value?.length || 0));
const empty = ref(false);
</script>

<style lang="scss" scoped>
.item-wrap {
  position: relative;
  display: grid;
  grid-template-columns: 470px repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
}

.item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  aspect-ratio: 1;
  background: rgba(#fff, 0.06) url(#{$imgPath}noimg.webp) no-repeat 50% 50%;
  background-size: 72px 72px;

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    transition: transform 0.3s ease-out;
  }

  &-text {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding: 16px 16px 35px;
    background: linear-gradient(180deg, #121212 0%, rgba(#121212, 0) 100%);

    em {
      font-family: PM;
      font-size: 1.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      white-space: normal;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      max-height: 42px;
      line-height: 1.1;
    }

    span {
      display: block;
      margin-top: 8px;
      font-size: 1.4rem;
    }
  }

  &:nth-child(1) {
    grid-row: 1 / 3;
    background-size: 150px 150px;

    .item-text {
      padding: 30px;
    }

    em {
      font-family: PM;
      font-size: 3rem;
    }

    span {
      font-size: 1.6rem;
    }
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
}

.empty-item {
  overflow: hidden;
  border-radius: 10px;
  aspect-ratio: 1;
  background: rgba(#fff, 0.04) url(#{$imgPath}noimg.webp) no-repeat 50% 50%;
  background-size: 72px 72px;

  &:nth-child(1) {
    grid-row: 1 / 3;
    background-size: 150px 150px;
  }
}

.skeleton {
  aspect-ratio: 1;

  &:first-child {
    grid-row: 1 / 3;
  }
}
</style>
