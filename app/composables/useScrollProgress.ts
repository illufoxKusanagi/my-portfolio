import { ref, onMounted, onBeforeUnmount } from "vue";

/**
 * Reactive scroll progress sourced directly from the Lenis instance.
 * Returns a normalized 0→1 value representing the user's position
 * through the full page scroll height.
 */
export function useScrollProgress() {
  const progress = ref(0);

  let cleanup: (() => void) | null = null;

  onMounted(() => {
    if (import.meta.server) return;

    const { $lenis } = useNuxtApp();
    if (!$lenis) return;

    const lenis = $lenis as any;

    const onScroll = ({ progress: p }: { progress: number }) => {
      progress.value = p;
    };

    lenis.on("scroll", onScroll);

    cleanup = () => lenis.off("scroll", onScroll);
  });

  onBeforeUnmount(() => {
    cleanup?.();
  });

  return { progress };
}
