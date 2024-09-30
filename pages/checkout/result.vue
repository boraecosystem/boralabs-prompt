<template>
  <div class="result-bg">
    <NuxtImg
      :src="isSuccess ? 'images/success.png' : 'images/failure.png'"
      width="300"
      height="300"
      format="webp"
      :alt="isSuccess ? 'success' : 'failure'"
    />
    <h2>{{ isSuccess ? "Congratulations!" : "Purchase has failed." }}</h2>
    <p v-if="isSuccess">
      The prompt you ordered has been purchased successfully.<br />You can
      seethe prompt you purchased in “My Stamps”.
    </p>
    <p v-else>Please try your purchase again.</p>
    <div class="btn-group">
      <Btn
        v-if="isSuccess"
        label="Move to My Stamps"
        to="/mystamp"
        size="lg"
        color="primary"
      />
      <Btn label="Return Home" to="/" size="lg" color="primary-line" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "custom",
  middleware: "auth",
});

const route = useRoute();

const resultStatus = ref(route.query.rs);
const isSuccess = computed(() => resultStatus.value === "success");
</script>

<style lang="scss" scoped>
.result-bg {
  width: 800px;
  padding: 40px 0 70px;
  background-color: rgba(#fff, 0.04);
  border-radius: 14px;
  border: 1px solid rgba(#fff, 0.08);
}

h2 {
  margin-top: 30px;
  font-family: PB;
  font-size: 4rem;
}

p {
  margin-top: 15px;
  color: $graya;
  line-height: 1.3;
}

.btn-group {
  @include flex-center;
  margin-top: 50px;
}

.btn-primary-line {
  margin-left: 10px;
}
</style>
