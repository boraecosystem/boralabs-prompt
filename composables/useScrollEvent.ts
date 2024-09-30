export const useScrollEvent = (baseHeight = 0) => {
  const isScrolled = ref(false);
  const isVisible = ref(true);
  let lastScrollY = 0;

  const handleScroll = () => {
    isScrolled.value = window.scrollY > baseHeight;

    isVisible.value = window.scrollY <= lastScrollY;
    lastScrollY = window.scrollY;
  };

  onMounted(() => window.addEventListener("scroll", handleScroll));
  onUnmounted(() => window.removeEventListener("scroll", handleScroll));

  return {
    isScrolled,
    isVisible,
  };
};
