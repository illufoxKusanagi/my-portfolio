import { ref, onMounted, onBeforeUnmount, nextTick, type Ref } from "vue";

const PAGE_ASPECT_RATIO = 1.25;
const BASE_PAGE_WIDTH = 480;
const BASE_PAGE_HEIGHT = 600;
const MIN_PAGE_WIDTH = 340; // Threshold for portrait single-page vs landscape 2-page spread
const MAX_PAGE_WIDTH = 600;
const FLIP_DURATION_MS = 600;
const SPAM_DEBOUNCE_MS = 650; // Guaranteed throttle to prevent pagination spam
const SHADOW_OPACITY = 0.6;

/**
 * Encapsulates StPageFlip lifecycle:
 * - Anti-spam debounced pagination controls
 * - Synchronizes orientation and page indices cleanly across viewports
 * - Isolates in-page button gestures
 */
export function usePageFlip(
  bookEl: Ref<HTMLElement | null>,
  bookContainer: Ref<HTMLElement | null>,
) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let instance: any = null;
  const currentOrientation = ref<"portrait" | "landscape">("landscape");
  const currentPageIndex = ref(0);
  let lastFlipTimestamp = 0;

  async function init() {
    if (!bookEl.value || !bookContainer.value) return;

    const { PageFlip } = await import("page-flip");

    const containerWidth = bookContainer.value.clientWidth || window.innerWidth;
    const isPortrait = containerWidth < MIN_PAGE_WIDTH * 2;
    currentOrientation.value = isPortrait ? "portrait" : "landscape";

    instance = new PageFlip(bookEl.value, {
      width: BASE_PAGE_WIDTH,
      height: BASE_PAGE_HEIGHT,
      size: "stretch",
      minWidth: MIN_PAGE_WIDTH,
      maxWidth: MAX_PAGE_WIDTH,
      minHeight: Math.floor(MIN_PAGE_WIDTH * PAGE_ASPECT_RATIO),
      maxHeight: Math.floor(MAX_PAGE_WIDTH * PAGE_ASPECT_RATIO),
      showCover: false,
      usePortrait: true,
      drawShadow: true,
      maxShadowOpacity: SHADOW_OPACITY,
      mobileScrollSupport: true,
      useMouseEvents: true,
      showPageCorners: false, // Prevents hover lifting
      clickEventForward: true,
      disableFlipByClick: true,
      flippingTime: FLIP_DURATION_MS,
      startZIndex: 10,
      autoSize: true,
      startPage: 0,
    });

    const pages = bookEl.value.querySelectorAll(".book-page");
    if (pages.length > 0) {
      instance.loadFromHTML(pages);
    }

    instance.on("init", (e: any) => {
      if (e?.data?.mode) {
        currentOrientation.value = e.data.mode;
      }
      if (e?.data?.page !== undefined) {
        currentPageIndex.value = e.data.page;
      }
    });

    instance.on("changeOrientation", (e: any) => {
      if (e?.data) {
        currentOrientation.value = e.data;
      }
    });

    instance.on("flip", (e: any) => {
      if (typeof e?.data === "number") {
        currentPageIndex.value = e.data;
      }
    });
  }

  function flipPrev() {
    const now = Date.now();
    if (!instance || now - lastFlipTimestamp < SPAM_DEBOUNCE_MS) return;
    lastFlipTimestamp = now;

    let prevDisableClick: boolean | undefined;
    try {
      const settings =
        typeof instance.getSettings === "function"
          ? instance.getSettings()
          : null;
      if (settings) {
        prevDisableClick = settings.disableFlipByClick;
        settings.disableFlipByClick = false;
      }
      instance.flipPrev();
    } catch {
      instance.turnToPrevPage?.();
    } finally {
      if (prevDisableClick !== undefined) {
        const settings =
          typeof instance.getSettings === "function"
            ? instance.getSettings()
            : null;
        if (settings) {
          settings.disableFlipByClick = prevDisableClick;
        }
      }
    }
  }

  function flipNext() {
    const now = Date.now();
    if (!instance || now - lastFlipTimestamp < SPAM_DEBOUNCE_MS) return;
    lastFlipTimestamp = now;
    instance.flipNext();
  }

  function destroy() {
    if (instance) {
      instance.destroy();
      instance = null;
    }
  }

  onMounted(async () => {
    await nextTick();
    setTimeout(init, 60);
  });

  onBeforeUnmount(destroy);

  return {
    flipPrev,
    flipNext,
    currentOrientation,
    currentPageIndex,
  };
}
