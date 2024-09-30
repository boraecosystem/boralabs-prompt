<template>
  <teleport to="#teleports">
    <transition name="slide">
      <div v-if="toast.isShow" :class="['toast', { warning: toast.isWarning }]">
        <span>attention icon</span>
        {{ toast.message }}
        <button @click="closeToast" class="btn-close">close</button>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
const { closeToast } = useToastStore();
const { toast } = storeToRefs(useToastStore());
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 15;
  display: flex;
  align-items: center;
  min-width: 340px;
  height: 60px;
  padding: 8px 40px 8px 8px;
  background-color: #fff;
  border-radius: 4px;
  border: 3px solid $primary;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #000;

  > span {
    margin-right: 10px;
    @include svg(attention, 40, 40, #fff);
    background-color: $primary;
    background-size: 20px 20px;
    border-radius: 4px;
  }

  .btn-close {
    position: absolute;
    top: 4px;
    right: 4px;
    @include svg(close, 30, 30, #000);
    background-size: 14px 14px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.6;
    }
  }

  &.warning {
    border-color: #e3353f;

    > span {
      @include svg(warning, 40, 40, #fff);
      background-color: #e3353f;
      background-size: 20px 18px;
    }
  }
}

.slide {
  &-enter-active,
  &-leave-active {
    transition: transform 0.3s;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(120%);
  }
}
</style>
