<template>
  <section class="inner shop-wrap">
    <template v-if="isLoading">
      <Skeleton v-for="i in 4" :key="i" height="425px" />
    </template>
    <template v-else>
      <div v-for="(card, index) in stampCardList" :key="index" class="itemcard">
        <div class="creator">
          <NuxtImg
            :src="card.creatorImage"
            alt=""
            width="32"
            height="32"
            format="webp"
          />
          {{ card?.creatorName }}
          <!-- @vue-ignore -->
          <div class="more" :ref="setRef(index)">
            <button class="more-btn" @click="toggleDropdown(index)">
              More
            </button>
            <div :class="['dropdown more-dropdown', { show: isMore[index] }]">
              <NuxtLink
                :to="`${boraExplorerUrl}/${card?.contract}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blockchain Explorer
              </NuxtLink>
            </div>
          </div>
        </div>

        <NuxtLink
          :to="isMy ? `/myNFT/${card.id}` : `/prompt/${card.id}`"
          class="item-detail"
        >
          <NuxtImg
            :src="
              card.tokenImage || card.promptImages[0] || 'images/@sample2.webp'
            "
            alt=""
            format="webp"
          />
          <p class="title">{{ card?.title }}</p>
          <p class="price">{{ formatAmount(card?.price) }} TPZ</p>
        </NuxtLink>

        <p class="stable-diffusion">Stable Diffusion</p>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import type { CStamp } from "~/types/stamp.type";

const isMore = ref<boolean[]>([]);
const elRefs = ref<(HTMLElement | null)[]>([]);

const props = defineProps<{
  stampCardList: CStamp[] | undefined;
  isLoading: boolean;
  isMy?: boolean;
}>();

const toggleDropdown = (index: number) => {
  isMore.value[index] = !isMore.value[index];
};

const setRef = (index: number) => {
  return (el: HTMLElement | null) => {
    elRefs.value[index] = el;
    onClickOutside(elRefs.value[index], () => {
      isMore.value[index] = false;
    });
  };
};

const boraExplorerUrl = computed(() => {
  const {
    public: { explorerUrl },
  } = useRuntimeConfig();

  return `${explorerUrl}/address`;
});

watch(
  () => props.stampCardList,
  (stampCardList) => {
    if (stampCardList)
      isMore.value = Array.from({ length: stampCardList.length }, () => false);
  },
  { once: true }
);
</script>

<style lang="scss" scoped>
.shop-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.itemcard {
  padding: 20px 20px 0;
  border: 2px solid rgba(#fff, 0.1);
  border-radius: 12px;
  transition: border 0.3s ease-out;

  &:hover {
    border-color: $primary;
  }
}

.creator {
  display: flex;
  align-items: center;
  > img {
    overflow: hidden;
    width: 32px;
    height: 32px;
    border-radius: 20px;
    margin-right: 8px;
  }

  .more {
    position: relative;
    margin-left: auto;

    &-btn {
      @include svg(dot, 32, 32, $color);
    }

    &-dropdown {
      top: 100%;
      right: 0;
      border-radius: 8px;
      font-size: 1.4rem;

      a {
        @include flex-center;
        padding: 14px 16px;
        white-space: nowrap;
        transition: color 0.25s;

        &::after {
          content: "";
          @include svg(open-link, 14, 14, $color);
          opacity: 0.7;
          margin-left: 6px;
          transition: opacity 0.25s;
        }

        &:hover {
          color: $color;

          &::after {
            opacity: 1;
          }
        }
      }

      &.show {
        visibility: visible;
        opacity: 1;
        transform: perspective(300px) rotateX(0deg);
      }
    }
  }
}

.item-detail {
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  img {
    border-radius: 10px;
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }

  .title {
    margin-top: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 240px;
    white-space: nowrap;
  }

  .price {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 1.4rem;
    color: $primary;

    &::before {
      @include svg(tpz, 16, 16, $primary);
      margin-right: 4px;
      content: "";
    }
  }
}

.stable-diffusion {
  justify-content: flex-end;
  margin: 15px -20px 0;
  padding: 13px 20px 12px;
  background: rgba(#fff, 0.05);
}
</style>
