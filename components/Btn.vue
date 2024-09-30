<template>
  <Component
    :is="type"
    :to="to"
    :class="[
      'btn',
      size ? 'btn-' + size : '',
      color ? 'btn-' + color : '',
      loading ? 'loading' : '',
    ]"
  >
    <slot>
      {{ label }}
    </slot>
  </Component>
</template>

<script setup lang="ts">
const props = defineProps<{
  to?: string;
  label?: string;
  size?: string;
  color?: string;
  loading?: boolean;
}>();

const type = computed(() => {
  if (props.to) return resolveComponent("NuxtLink");
  return "button";
});
</script>

<style lang="scss" scoped>
.btn {
  overflow: hidden;
  @include flex-center;
  height: 40px;
  padding: 0 22px;
  border: {
    width: 2px;
    style: solid;
    radius: 24px;
  }
  font-family: PM;
  font-size: 1.4rem;
  transition: all 0.23s ease-out;
  cursor: pointer;

  &.loading {
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

  &-lg {
    height: 48px;
    font-size: 1.6rem;

    &.loading {
      &::before {
        width: 16px;
        height: 16px;
      }
    }
  }

  &-md {
    height: 30px;
  }

  &-primary {
    border-color: $primary;
    background-color: $primary;
    &:hover {
      background-color: rgba($primary, 0);
    }
  }

  &-primary-line {
    border-color: $primary;
    color: #fff;
    &:hover {
      background-color: $primary;
    }
  }

  &-gray {
    border-width: 0;
    background-color: rgba(#fff, 0.06);
    color: $graya;

    &:hover {
      background-color: $primary;
      color: #fff;
    }
  }

  &-gray-line {
    border-width: 1px;
    border-color: rgba(#fff, 0.15);
    color: $graya;

    &:hover {
      border-color: $primary;
      background-color: $primary;
      color: #fff;
    }
  }

  &:disabled {
    color: $grayb;
    pointer-events: none;
  }
}
</style>
