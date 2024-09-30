export default defineNuxtPlugin((nuxtApp) => {
  const session = ref({ token: "layne.lee" });

  const api = $fetch.create({
    baseURL: "/",
    retry: false,
    onRequest({ request, options, error }) {
      if (session.value?.token) {
        const headers = (options.headers ||= {});

        if (Array.isArray(headers)) {
          headers.push(["Authorization", `Bearer ${session.value?.token}`]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", `Bearer ${session.value?.token}`);
        } else {
          headers.Authorization = `Bearer ${session.value?.token}`;
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 404) {
        throw createError({
          statusCode: 404,
          statusMessage: "Api Not Found " + response.url,
          fatal: true,
        });
      }
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
    },

    // async onResponse({ response }) {},
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
