<template>
  <h2 class="hx-design">
    <p>{{ shadowText }}</p>
    <strong>{{ hxText }}</strong>
  </h2>
</template>

<script setup lang="ts">
defineProps<{
  shadowText?: string;
  hxText?: string;
}>();
</script>

<style lang="scss" scoped>
.hx-design {
  margin-top: 120px;
  margin-bottom: 30px;
  font-family: PB;
  text-align: center;

  > p {
    display: inline-block;
    font-size: 9rem;
    color: #232d2d;
    -webkit-text-fill-color: $bg;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 20%,
      #fff 100%,
      rgba(255, 255, 255, 0) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-stroke: 4px transparent;
    opacity: 0.3;
  }

  > strong {
    display: block;
    transform: translateY(-30px);
    font-size: 4rem;
    text-shadow: 0 0 2px #232d2d;
  }
}
</style>
