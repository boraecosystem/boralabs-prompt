<template>
  <TheHeader />
  <main class="custom">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
.custom {
  @include flex-center;
  flex-direction: column;
  width: $max;
  height: 100dvh;
  margin: 0 auto;
  // padding-top: 140px;
  text-align: center;
}
</style>
