<template>
  <section class="inner">
    <template v-if="isLoading">
      <div class="skeleton-gallery">
        <div class="skeleton-thumbnails">
          <Skeleton v-for="i in 4" :key="i" width="100px" height="100px" />
        </div>
        <Skeleton class="skeleton-large" />
      </div>
      <div>
        <Skeleton class="skeleton-title" height="90px" />
        <Skeleton class="skeleton-desc" height="40px" />
        <Skeleton class="skeleton-prompt" height="300px" />
      </div>
    </template>

    <template v-else>
      <div class="image-gallery">
        <div class="thumbnails">
          <NuxtImg
            v-for="(image, index) in shopImages"
            :key="index"
            :src="image"
            width="100"
            height="100"
            :alt="'thumbnail' + index"
            class="thumbnail"
            @click="setSelectedNumber(index)"
            format="webp"
          />
        </div>
        <div class="large-image">
          <NuxtImg
            :src="selectedImage"
            width="475"
            height="475"
            :alt="'Selected-thumbnail'"
            format="webp"
          />
        </div>
      </div>

      <div class="detail">
        <p class="title">{{ shopDetail?.title }}</p>
        <p class="desc">
          {{ shopDetail?.desc }}
        </p>
        <p class="stable-diffusion">Stable Diffusion</p>

        <div class="detail-prompt">
          <ul>
            <li>
              <em>Creator Name</em>
              {{ shopDetail?.creatorName }}
            </li>
            <li>
              <em>Contract Address</em>
              <span>{{ shopDetail?.contract }}</span>
            </li>
          </ul>

          <div :class="['prompt', { lock: !hasNFT || isLocked }]">
            <div class="prompt-text">
              <span>{{ prompt.prompt }}</span>
            </div>

            <dl class="prompt-feature">
              <dt>cfg_scale</dt>
              <dd>{{ prompt.engineOption.cfg_scale }}</dd>
              <dt>seed</dt>
              <dd>{{ prompt.engineOption.seed }}</dd>
              <dt>steps</dt>
              <dd>{{ prompt.engineOption.steps }}</dd>
              <dt>style</dt>
              <dd>{{ prompt.engineOption.style }}</dd>
              <dt>width</dt>
              <dd>{{ prompt.engineOption.width }}</dd>
              <dt>height</dt>
              <dd>{{ prompt.engineOption.height }}</dd>
            </dl>

            <p class="lock-text" v-if="!hasNFT">
              You can see a prompt after payment.
            </p>

            <Btn
              v-if="hasNFT && isLocked"
              @click="showPrompt(promptId)"
              color="primary"
            >
              <NuxtImg src="images/security.svg" alt="" />
              Show Prompt
            </Btn>
          </div>

          <div class="prompt-try">
            <div class="explanation">
              <p>Type a keyword to try out the prompt template.</p>
              <span
                >* Try with simple words: fluffy cat, futuristic robot,
                cyberpunk city, Andrew (name), India (country), etc.</span
              >
            </div>
            <input
              v-model="promptInput"
              type="text"
              maxlength="20"
              placeholder="Up to 20 bytes"
            />
            <Btn
              @click="requestPromptImage"
              label="Try it Out"
              color="primary-line"
              :loading="isRequest"
              :disabled="isBlocked"
            />
          </div>

          <div class="prompt-price" v-show="!hasNFT">
            <p>
              <em>Price</em
              ><strong>{{ formatAmount(shopDetail?.price || 0) }} TPZ</strong>
            </p>

            <Btn
              @click="buyPrepare({})"
              :disabled="hasNFT"
              label="Buy Now"
              color="primary"
            />
          </div>
        </div>
      </div>
    </template>
  </section>

  <teleport to="#teleports">
    <section class="modal-image" v-show="isModal" @click.self="closeModal">
      <NuxtImg
        :src="requestImageInfo?.image"
        width="800"
        height="800"
        format="webp"
        :alt="`${requestImageInfo?.prompt}-image`"
        @click.stop
      />

      <Btn
        v-if="!hasNFT"
        label="Buy Now"
        size="lg"
        color="primary"
        @click="buyPrepare({ key: requestImageInfo?.key })"
      />
    </section>
  </teleport>
</template>

<script setup lang="ts">
import { useBuyStampMutation } from "~/composables/mutations/useBuyStampMutation";
import { usePromptMutation } from "~/composables/mutations/usePromptMutation";
import { useShopDetailQuery } from "~/composables/queries/useShopDetailQuery";
import type { IShop } from "~/types/shop.types";

// Refactoring..
// 상점 상세 API 호출 - 시작
const route = useRoute();
const promptId = computed(() => Number(route.params.promptId as string));
const { shopDetail, isLoading, hasNFT } = await useShopDetailQuery(
  promptId.value
);
// 상점 상세 API 호출 - 끝

// 상점 대표 이미지 설정 컴포저블 - 시작
const useShopImages = (shopDetail: Ref<IShop | undefined>) => {
  const shopImages = computed(() => shopDetail.value?.promptImages);
  const selectedNumber = ref(0);
  const selectedImage = computed(() => shopImages.value![selectedNumber.value]);

  function setSelectedNumber(_number: number) {
    selectedNumber.value = _number;
  }

  return {
    shopImages,
    selectedNumber,
    selectedImage,
    setSelectedNumber,
  };
};

const { shopImages, selectedImage, setSelectedNumber } =
  useShopImages(shopDetail);
// 상점 대표 이미지 설정 컴포저블 - 끝

// 이미지 생성 + 모달창 컴포저블 - 시작
const { requestImageInfo } = storeToRefs(useCheckoutStore());
const {
  promptInput,
  isRequest,
  isBlocked,
  requestPromptImage: _requestPromptImage,
} = useRequestImage();
const useRequestModalImage = () => {
  const { setRequestImageInfo } = useCheckoutStore();
  const isModal = ref(false);

  function closeModal() {
    isModal.value = false;
    setRequestImageInfo(undefined);
  }
  async function requestPromptImage() {
    await _requestPromptImage();
    isModal.value = true;
  }

  return {
    isModal,
    closeModal,
    requestPromptImage,
  };
};
const { isModal, closeModal, requestPromptImage } = useRequestModalImage();
// 이미지 생성 + 모달창 컴포저블 - 끝

// 프롬포트 확인 - 시작
const { prompt, isLocked, showPrompt } = usePromptMutation();
// 프롬포트 확인 - 끝

// 구매 준비 프로세스 - 시작
const { buyPrepare } = useBuyStampMutation();
// 구매 준비 프로세스 - 끝
</script>

<style lang="scss" scoped>
.inner {
  display: grid;
  grid-template-columns: auto 570px;
  column-gap: 30px;
}

.image-gallery {
  display: flex;

  .large-image {
    width: 100%;
    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 14px;
      cursor: pointer;
    }
  }
}

.thumbnails {
  margin-right: 25px;
  img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    cursor: pointer;

    &:not(:first-child) {
      margin-top: 25px;
    }
  }
}

.modal-image {
  @include svg(close, 10, 10, #fff);
  @include flex-center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, 0.8);
  background-size: 28px 28px;
  background-position: calc(100% - 40px) 40px;

  img {
    position: relative;
    z-index: 1;
    width: 80%;
    height: auto;
    aspect-ratio: 1;
    max-width: 80dvh;
    border-radius: 14px;
    animation: show 0.24s ease-in-out;
  }

  .btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  @keyframes show {
    from {
      transform: translateY(-20px);
      opacity: 0.3;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.title {
  font-family: PB;
  font-size: 4rem;
  line-height: 1.1;
}

.desc {
  margin-top: 10px;
  font-size: 1.4rem;
  line-height: 1.2;
  color: $graya;
}

.stable-diffusion {
  margin-top: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(#fff, 0.15);
  color: $primary;
}

.detail-prompt {
  overflow: hidden;
  margin-top: 20px;
  border: 1px solid rgba(#fff, 0.08);
  border-radius: 14px;

  ul {
    padding: 10px 20px;
    background-color: rgba(#fff, 0.08);
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 0;
    font-size: 1.4rem;

    > span {
      font-family: Arial, sans-serif;
      font-size: 1.2rem;
    }
  }

  em {
    display: block;
    font-size: 1.4rem;
    color: $graya;
  }
}

.prompt {
  position: relative;

  &-text {
    overflow-y: auto;
    max-height: 160px;
    padding: 20px;
    line-height: 1.4;
    transition: filter 0.2s;
  }

  &-feature {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-top: 1px solid rgba(#fff, 0.08);
    padding: 10px 20px 20px;
    font-size: 1.4rem;

    dt,
    dd {
      width: calc(25% - 10px);
      margin-top: 10px;

      &:nth-child(4n + 2) {
        margin-right: 40px;
      }
    }

    > dt {
      color: $graya;
    }

    dd {
      text-align: right;
    }
  }

  &-try {
    display: grid;
    grid-template-columns: auto 135px;
    row-gap: 10px;
    column-gap: 20px;
    padding: 20px;
    border-top: 1px solid rgba(#fff, 0.08);

    .explanation {
      grid-column: 1 / 3;

      p {
        font-size: 1.4rem;
        margin-bottom: 6px;
      }

      span {
        font-size: 1.4rem;
        color: $graya;
        line-height: 1.3;
      }
    }

    input {
      height: 40px;
      padding: 0 20px;
      border: 2px solid rgba(#fff, 0.15);
      border-radius: 20px;
      background-color: transparent;
      font-size: 1.4rem;

      &::placeholder {
        color: rgba(#fff, 0.4);
      }
    }
  }

  &-price {
    display: flex;
    padding: 20px;
    background-color: rgba(#fff, 0.08);

    strong {
      display: block;
      margin-top: 5px;
      font-family: PB;
      font-size: 2rem;
    }

    .btn {
      margin-left: auto;
    }
  }

  &.lock {
    .prompt-text {
      filter: blur(5px);
    }

    .prompt-feature {
      filter: blur(5px);
    }

    .btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      img {
        width: 24px;
        height: 24px;
        margin-right: 2px;
      }
    }

    .lock-text {
      @include flex-center;
      flex-direction: column;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      font-size: 1.2rem;

      &::before {
        @include img(security, 28, 28);
        margin-bottom: 3px;
        content: "";
      }
    }
  }
}

.skeleton {
  &-gallery {
    display: flex;
  }

  &-thumbnails {
    margin-right: 25px;

    .skeleton:not(:first-child) {
      margin-top: 25px;
    }
  }

  &-desc {
    margin-top: 15px;
  }

  &-prompt {
    margin-top: 30px;
  }
}
</style>
