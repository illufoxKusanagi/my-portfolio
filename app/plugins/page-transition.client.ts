/**
 * Drives the page transition overlay from the router lifecycle:
 * - `beforeEach` awaits the cover, so the route swap always happens while masked.
 * - Nuxt's `page:finish` (fires after <Suspense> resolves the new page) lifts it,
 *   so the cover never reveals a half-rendered async page.
 * Scroll reset to top is handled by the route watcher in app.vue, which runs while masked.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const { phase, cover, reveal } = usePageTransition();

  router.beforeEach(async (to, from) => {
    // First entry / hydration: SSR HTML or the 3D preloader on "/" owns first paint.
    if (from.matched.length === 0 || nuxtApp.isHydrating) return;

    // Hash/query-only changes (sidebar section links, locale switch) don't swap pages.
    if (to.path === from.path) return;

    await cover(to.path);
  });

  // Aborted/cancelled navigation: nothing new will render, so lift the cover now.
  router.afterEach((_to, _from, failure) => {
    if (failure && phase.value !== "idle") reveal();
  });

  nuxtApp.hook("page:finish", () => {
    if (phase.value !== "idle") reveal();
  });

  router.onError(() => {
    if (phase.value !== "idle") reveal();
  });
});
