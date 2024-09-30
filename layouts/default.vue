<template>
  <TheHeader />
  <main>
    <slot />
  </main>
  <TheFooter />
</template>

<style lang="scss" scoped>
main {
  padding-top: 140px;
  padding-bottom: 160px;
}
</style>
