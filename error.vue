<template>
  <NuxtLayout name="custom">
    <NuxtImg :src="image" width="300" height="300" format="webp" alt="error" />
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <Btn @click="handleError" label="Return Home" size="lg" color="primary" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const is404 = computed(() => props.error?.statusCode === 404);
const image = computed(() =>
  is404.value ? "images/404.png" : "images/500.png"
);
const title = computed(() =>
  is404.value ? "Page Not Found" : "Sorry, unexpected error"
);
const description = computed(() =>
  is404.value
    ? "Could you please check and try again?"
    : "Try reloading the page, or come back soon and try again."
);

function handleError() {
  return clearError({ redirect: "/" });
}
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 30px;
  font-family: PB;
  font-size: 4rem;
}

p {
  margin-top: 10px;
  font-size: 2rem;
  color: $graya;
}

.btn-lg {
  margin-top: 50px;
}
</style>
