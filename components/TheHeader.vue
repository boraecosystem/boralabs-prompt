<template>
  <header :class="{ sticky: isScrolled }">
    <section class="inner">
      <NuxtLink to="/">
        <NuxtImg
          src="images/ic-boralabs.svg"
          width="150"
          height="27"
          alt="BORA Labs"
        />
      </NuxtLink>
      <ClientOnly>
        <div class="fr">
          <Btn
            v-if="!isConnected"
            @click="connect()"
            label="Sign in"
            color="primary"
          />
          <template v-else>
            <Skeleton v-if="isLoading" width="140px" height="40px" />
            <p v-else-if="isMinting" class="box tpz minting">Minting</p>
            <button v-else class="box tpz" :disabled="!isMintable">
              <div>
                <p class="currency">
                  <em>{{ formatAmount(token?.balance!) }}</em>
                  {{ token?.symbol }}
                </p>
                <p @click="handleWallet({ func: mintTokenAsync })" class="mint">
                  Go to Mint
                </p>
              </div>
            </button>
            <Timer />
            <Person />
          </template>
        </div>
      </ClientOnly>
    </section>
  </header>
</template>

<script setup lang="ts">
import { useConnectWalletMutation } from "~/composables/mutations/useConnectWalletMutation";
import { useHandleWalletMutation } from "~/composables/mutations/useHandleWalletMutation";
import { useMintTokenMutation } from "~/composables/mutations/useMintTokenMutation";
import { useTokenBalanceQuery } from "~/composables/queries/useTokenBalanceQuery";
import { useWalletQuery } from "~/composables/queries/useWalletQuery";

const { isScrolled } = useScrollEvent(30);
const { token, isConnected } = storeToRefs(useWalletStore());

const { isLoading: isWalletLoading } = useWalletQuery();
const { isLoading: isTokenBalanceLoading, isMintable } = useTokenBalanceQuery();
const isLoading = computed(
  () => isWalletLoading.value || isTokenBalanceLoading.value
);

const { connect } = useConnectWalletMutation();
const { handleWallet } = useHandleWalletMutation();
const { mintTokenAsync, isPending: isMinting } = useMintTokenMutation();
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 78px;
  border-bottom: 1px solid rgba(#fff, 0.08);
  background: rgba($bg, 0.3);

  &.sticky {
    position: fixed;
    background: $bg;
    box-shadow: 0 10px 15px rgba(25, 25, 25, 0.2);
    animation: fadeInDown 300ms ease-in-out 0s normal none 1 running;
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translateY(-20px);
      -ms-transform: translateY(-20px);
      transform: translateY(-20px);
    }

    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
  }
}

.inner {
  display: flex;
  align-items: center;

  .fr {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
  }
}

.logo {
  padding: 20px 0;
}

.tpz {
  overflow: hidden;
  display: block;
  transition: background-color 0.2s;

  > div {
    height: 100%;
    transition: transform 0.2s;
  }

  p {
    @include flex-center;
    height: 100%;
  }

  &:hover {
    background-color: $primary;

    > div {
      transform: translateY(-100%);
    }
  }

  &:disabled {
    pointer-events: none;
  }

  &.minting {
    @include flex-center;
    background-color: $primary;

    &::before {
      @include svg(loading, 14, 14, #fff);
      margin-right: 7px;
      animation: rotate 0.9s linear infinite;
      content: "";
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(350deg);
    }
  }
}

.currency {
  padding-top: 3px;
  font-size: 1.1rem;
  transition: transfrom 0.2s;

  em {
    margin-right: 2px;
    padding-bottom: 1px;
    font-size: 1.6rem;
  }

  &::before {
    @include svg(tpz, 19, 19, #fff);
    margin: -2px 5px 0 0;
    content: "";
  }
}

.mint {
  font-family: PM;
}

header {
  display: flex;
  justify-content: space-between;
}

.skeleton {
  border-radius: 20px;
}
</style>
