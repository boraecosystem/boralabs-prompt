<template>
  <div
    class="skeleton"
    :style="{
      '--skeleton-width': props.width,
      '--skeleton-height': props.height,
    }"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
});
</script>

<style lang="scss" scoped>
.skeleton {
  width: var(--skeleton-width);
  height: var(--skeleton-height);
  background-color: #fff;
  border-radius: 14px;
  animation: loading 2s infinite ease-in-out;
}

@keyframes loading {
  0% {
    opacity: 0.05;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.05;
  }
}
</style>
