export default defineEventHandler(async (event) => {
  const { faucetApi } = useRuntimeConfig();

  const address = getRouterParam(event, "address");

  try {
    return await $fetch(`${faucetApi}/bgas/${address}`, {
      retry: false,
    });
  } catch (e) {
    setResponseStatus(event, 400, "Already received faucet.");
    return "Already received faucet.";
  }
});
