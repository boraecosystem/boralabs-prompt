<template>
  <section class="purchase-title">
    <h2>AI Prompt Purchase</h2>
    <div class="purchase-detail inner">
      <div class="purchase-preview">
        <NuxtImg
          v-if="!!requestImageInfo"
          :src="requestImageInfo.image"
          width="272"
          height="272"
          format="webp"
          alt="preview"
        />
      </div>

      <div class="purchase-step">
        <p class="desc">
          <em>Prompt Description</em><span>{{ shopDetail?.desc }}</span>
        </p>
        <div class="step one">
          <strong>Create Image</strong>
          <div class="step-info">
            <label for="step-one"
              ><span>Type a keyword to try out the prompt template.</span>* Try
              with simple words: fluffy cat, futuristic robot, cyberpunk city,
              Andrew (name)<br />India (country), etc.</label
            >
            <input
              v-model="promptInput"
              id="step-one"
              type="text"
              maxlength="20"
              placeholder="Up to 20 bytes"
            />
            <Btn
              @click="requestPromptImage"
              label="Try it Out"
              size="lg"
              color="primary-line"
              :loading="isRequest"
              :disabled="isBlocked"
            />
          </div>
        </div>
        <div class="step two">
          <strong>Order Summary</strong>
          <dl class="step-info">
            <dt>Prompt Title</dt>
            <dd>{{ shopDetail?.title }}</dd>
            <dt>Subtotal</dt>
            <dd>{{ shopPrice.subtotal }}</dd>
            <dt>Tax</dt>
            <dd>{{ shopPrice.tax }}</dd>
            <dt class="total">Total</dt>
            <dd class="total">{{ shopPrice.total }}</dd>
          </dl>
        </div>
        <Btn
          @click="buyStamp(shopDetail!)"
          label="Payment"
          size="lg"
          color="primary"
          :loading="isPending"
          :disabled="isCheckoutDisable"
        />
      </div>
    </div>
  </section>

  <teleport to="#teleports">
    <section v-if="isPending" class="modal-loading">
      <NuxtImg
        src="images/spinner-dots.svg"
        alt="spinner"
        width="60"
        height="60"
        class="spinner"
      />
      <p>
        This process may take some time.<br />
        Please do not leave this page or close the browser.
      </p>
    </section>
  </teleport>
</template>

<script setup lang="ts">
import { useBuyStampMutation } from "~/composables/mutations/useBuyStampMutation";
import { useShopDetailQuery } from "~/composables/queries/useShopDetailQuery";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const promptId = computed(() => Number(route.params.promptId as string));
const { shopDetail } = await useShopDetailQuery(promptId.value);
const { token, isConnected } = storeToRefs(useWalletStore());
const shopPrice = computed(() => {
  const taxPercent = 0.1;
  return {
    total: `${formatAmount(shopDetail.value?.price!)} ${token.value?.symbol}`,
    tax: `${formatAmount(Number(shopDetail.value?.price) * taxPercent)} ${
      token.value?.symbol
    }`,
    subtotal: `${formatAmount(
      Number(shopDetail.value?.price) * (1 - taxPercent)
    )} ${token.value?.symbol}`,
  };
});

const { buyStamp, isPending, sessionCheck, exitBypass } = useBuyStampMutation();
const isCheckoutDisable = computed(
  () => isPending.value || !isEnoughToken.value || !requestImageInfo.value?.key
);

const isEnoughToken = computed(
  () => Number(token?.value?.balance) >= Number(shopDetail.value?.price!)
);

const { setRequestImageInfo } = useCheckoutStore();
const { requestImageInfo } = storeToRefs(useCheckoutStore());
const { promptInput, isRequest, isBlocked, requestPromptImage } =
  useRequestImage();

function beforeUnload(event: any) {
  event.preventDefault();
  event.returnValue = true;
}

const checkIsValidSession = async () => {
  const isValidSession = await sessionCheck();
  if (!isValidSession) {
    throw createError({ statusCode: 500, fatal: true });
  }
};

onMounted(async () => {
  await checkIsValidSession();
  window.addEventListener("beforeunload", beforeUnload);
});
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", beforeUnload);
});
onBeforeRouteLeave((to, from, next) => {
  if (!isConnected.value) {
    return next(true);
  }
  if (!exitBypass.value) {
    const confirmMessage =
      "Checkout is in progress. Are you sure you want to leave? Information related to checkout will be lost.";
    const confirmResult = confirm(confirmMessage);
    if (confirmResult) {
      return next(true);
    }
  } else {
    next(true);
  }
});

onUnmounted(() => setRequestImageInfo(undefined));
</script>

<style lang="scss" scoped>
.purchase {
  &-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -62px;
    background: url(#{$imgPath}bg-my.webp) no-repeat 50% 0;
    background-size: 100% auto;

    h2 {
      width: 100%;
      padding: 100px 0;
      font-family: PB;
      font-size: 5rem;
      border-bottom: 1px solid rgba(#fff, 0.08);
      text-align: center;
    }
  }

  &-detail {
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
  }

  &-preview {
    width: 272px;
    height: 272px;
    background: url(#{$imgPath}noimg.webp) no-repeat 50% 50%, rgba(#fff, 0.06);
    background-size: 100px 100px;
    border: 1px solid rgba(#fff, 0.1);
    border-radius: 14px;

    > img {
      border-radius: 14px;
    }
  }

  &-step {
    display: flex;
    flex-direction: column;
    width: 855px;

    .desc {
      display: flex;
      line-height: 1.4;

      em {
        flex-shrink: 0;
        margin-right: 16px;
        font-family: PM;
      }

      span {
        color: $graya;
      }
    }
  }
}

.step {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  > strong {
    position: relative;
    display: flex;
    min-width: 265px;
    font-family: PB;
    font-size: 2rem;
    line-height: 1.4;

    &::before {
      content: "1";
      @include flex-center;
      width: 28px;
      height: 28px;
      margin-right: 20px;
      background-color: $bg;
      border: 1px solid #fff;
      border-radius: 50%;
      font-size: 1.6rem;
    }

    &::after {
      content: "";
      position: absolute;
      top: 28px;
      left: 14px;
      z-index: -1;
      width: 1px;
      height: 177px;
      background-color: #fff;
    }
  }

  &.two {
    margin-top: 80px;

    > strong {
      &::before {
        content: "2";
      }

      &::after {
        height: 163px;
      }
    }
  }

  &-info {
    width: 100%;

    > label {
      display: block;
      margin: 4px 0 10px;
      line-height: 1.3;
      font-size: 1.4rem;
      color: $graya;

      span {
        display: block;
        margin-bottom: 6px;
        font-size: 1.6rem;
        color: $color;

        &::after {
          content: " *";
          color: $primary;
        }
      }
    }

    > input {
      display: inline-block;
      width: 420px;
      height: 48px;
      margin-right: 20px;
      padding: 0 24px;
      background-color: transparent;
      border: 2px solid rgba(#fff, 0.15);
      border-radius: 20px;
      font-size: 1.6rem;

      &::placeholder {
        color: rgba(#fff, 0.4);
      }
    }

    > .btn {
      width: 150px;
      display: inline-block;
    }
  }

  > dl {
    display: flex;
    flex-wrap: wrap;
    padding: 30px;
    background-color: rgba(#fff, 0.05);
    border-radius: 14px;
    border: 1px solid rgba(#fff, 0.15);

    dt {
      width: 25%;
      margin-bottom: 16px;
      color: rgba(#fff, 0.6);
    }

    dd {
      overflow: hidden;
      width: 75%;
      margin-bottom: 16px;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .total {
      margin-bottom: 0;
      padding-top: 16px;
      border-top: 1px solid rgba(#fff, 0.15);
      color: #fff;
      font-family: PM;
    }
  }
}

.btn-primary {
  margin: 30px 0 0 auto;
}

.modal-loading {
  @include flex-center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, 0.8);
  text-align: center;
  line-height: 1.4;
  backdrop-filter: blur(1px);

  .spinner {
    margin-bottom: 40px;
    animation: rotate 1.5s infinite;
  }

  > p {
    font-size: 1.8rem;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
