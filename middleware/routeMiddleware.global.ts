export default defineNuxtRouteMiddleware((to, from) => {
  // 잠시 비활성화
  // if (to.name === "checkout-promptId") {
  // if (from.name !== "prompt-promptId") {
  //   // go 500?
  //   return navigateTo("/");
  // }
  // X can't direct to /checkout/:promptId
  // else if (from.params.promptId !== to.params.promptId) {
  //   return navigateTo({
  //     name: "prompt-promptId",
  //     params: { promptId: from.params.promptId },
  //   });
  // }
  // }
});
