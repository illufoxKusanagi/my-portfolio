import { ref, onMounted, onBeforeUnmount, nextTick, type Ref } from "vue";

const PAGE_ASPECT_RATIO = 1.2;
const MAX_PAGE_WIDTH = 500;
const FLIP_DURATION_MS = 800;
const SHADOW_OPACITY = 0.6;

/** Encapsulates StPageFlip lifecycle — init, navigation, cleanup. */
export function usePageFlip(
  bookEl: Ref<HTMLElement | null>,
  bookContainer: Ref<HTMLElement | null>,
) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let instance: any = null;

  async function init() {
    if (!bookEl.value) return;

    const { PageFlip } = await import("page-flip");

    const containerWidth = bookContainer.value?.clientWidth ?? MAX_PAGE_WIDTH * 2;
    const pageWidth = Math.min(Math.floor(containerWidth / 2), MAX_PAGE_WIDTH);
    const pageHeight = Math.floor(pageWidth * PAGE_ASPECT_RATIO);

    instance = new PageFlip(bookEl.value, {
      width: pageWidth,
      height: pageHeight,
      size: "stretch",
      minWidth: 280,
      maxWidth: 600,
      minHeight: 336,
      maxHeight: 720,
      showCover: false,
      drawShadow: true,
      maxShadowOpacity: SHADOW_OPACITY,
      mobileScrollSupport: true,
      useMouseEvents: true,
      flippingTime: FLIP_DURATION_MS,
      startZIndex: 10,
      autoSize: true,
      startPage: 0,
    });

    const pages = bookEl.value.querySelectorAll(".book-page");
    instance.loadFromHTML(pages);
  }

  function flipPrev() {
    instance?.flipPrev();
  }

  function flipNext() {
    instance?.flipNext();
  }

  function destroy() {
    instance?.destroy();
    instance = null;
  }

  onMounted(async () => {
    await nextTick();
    init();
  });

  onBeforeUnmount(destroy);

  return { flipPrev, flipNext };
}
