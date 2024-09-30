<template>
  <div class="wrapper">
    <div :class="['box count', { max: isMax }]">
      <div v-if="remain > 0" class="time">{{ formattedTime }}</div>
      <span
        v-for="i in limit"
        :key="i"
        :class="['check', { used: i > rest! }]"
      />
    </div>
    <p class="tooltip">
      {{ `${rest} image gen attempt(s) left.` }}<br />Timer counts down to your
      next trial refill.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRequestLimitQuery } from "~/composables/queries/useRequestLimitQuery";

const { limit, rest, requestTime, refetch } = useRequestLimitQuery();

const interval = ref<ReturnType<typeof setInterval> | null>(null);
const time = ref(0);
const isMax = computed(() => rest.value === 0);
const remain = computed(() => {
  if (!requestTime.value) return 0;

  const currentDate = new Date();
  const requestDate = new Date(requestTime.value);
  const available = new Date(requestDate.getTime() + 60 * 60 * 1000);
  return Math.max(
    // @ts-ignore
    Math.floor((available - currentDate) / 1000),
    0
  );
});

const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
});

const startTimer = () => {
  interval.value = setInterval(() => {
    if (time.value > 0) {
      time.value -= 1;
    } else {
      clearInterval(interval.value!);
      refetch();
    }
  }, 1000);
};

watchEffect(() => {
  if (remain.value > 0) {
    time.value = remain.value;
    startTimer();
  }
});

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  margin-left: 10px;
}

.count {
  display: flex;
  align-items: center;
  margin-left: 0;
  padding-top: 1px;

  &.max {
    background-color: $primary;
  }

  .time {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 72px;
    margin-right: 10px;
    padding-top: 2px;

    &::before {
      @include svg(hourglass, 14, 18, #fff);
      margin-top: -1px;
      margin-right: 5px;
      content: "";
    }

    &::after {
      position: absolute;
      right: 0;
      top: 2px;
      width: 1px;
      height: 16px;
      background: rgba(#fff, 0.3);
      content: "";
    }
  }

  .check {
    @include svg(check, 16, 16, #fff);
    margin-right: 6px;

    &:last-of-type {
      margin-right: 0;
    }

    &.used {
      background-image: call(get-function(check), "%23" + 9395A5);
    }
  }

  &:hover {
    + .tooltip {
      visibility: visible;
      opacity: 1;
      z-index: 1;
    }
  }
}

.tooltip {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: calc(100% + 13px);
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  padding: 12px 16px;
  background-color: rgba($color, 0.12);
  border-radius: 4px;
  white-space: nowrap;
  text-align: center;
  line-height: 1.3;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease-out;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: {
      width: 8px;
      style: solid;
      color: transparent transparent rgba($color, 0.12);
    }
  }
}
</style>
