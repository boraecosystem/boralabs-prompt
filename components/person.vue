<template>
  <div class="person">
    <div class="box" />
    <div class="dropdown person-dropdown">
      <button class="wallet" @click="copyText(account!)">
        {{ truncate(account!) }}
      </button>
      <NuxtLink to="/mystamp">My Stamp</NuxtLink>
      <button @click="disconnect()" class="signout">Sign out</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisconnectWalletMutation } from "~/composables/mutations/useDisconnectWalletMutation";

const { account } = storeToRefs(useWalletStore());
const { disconnect } = useDisconnectWalletMutation();
</script>

<style lang="scss" scoped>
.person {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 10px;

  .box {
    width: 40px;
    margin-left: 0;
    background: {
      image: url(#{$imgPath}ic-person.svg);
      repeat: no-repeat;
      position: 50% 50%;
      size: 20px 20px;
    }
  }

  &-dropdown {
    top: 60px;
    right: 0;
    width: 200px;
    padding-bottom: 10px;
    border-radius: 10px;
    z-index: -1;

    a {
      display: flex;
      align-items: center;
      margin-top: 8px;
      padding: 10px 28px;
      transition: all 0.3s;

      &:hover {
        color: #fff;
      }
    }
  }

  &:hover {
    .box {
      background-color: rgba(#fff, 0.2);
    }

    .person-dropdown {
      visibility: visible;
      opacity: 1;
      z-index: 1;
      transform: perspective(300px) rotateX(0deg);
    }
  }
}

.wallet {
  width: 100%;
  padding: 16px 0 14px;
  border-bottom: 1px solid rgba(#fff, 0.04);
  font-size: 1.4rem;
  letter-spacing: 0.04rem;
  transition: background 0.4s;

  &:hover {
    background-color: rgba(#fff, 0.025);
  }
}

.signout {
  width: 100%;
  padding: 6px 28px;
  text-align: left;
  transition: all 0.3s;

  &:hover {
    color: #fff;
  }
}
</style>
