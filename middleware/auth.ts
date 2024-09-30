export default defineNuxtRouteMiddleware((to, from) => {
  const { isConnected } = storeToRefs(useWalletStore());

  if (!isConnected.value && to.path !== "/") return navigateTo("/");

  watch(isConnected, (isConnected) => {
    if (!isConnected && to.path !== "/") return navigateTo("/");
  });
});
