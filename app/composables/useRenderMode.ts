export type RenderMode = "3D" | "2D";

/**
 * Global reactive render mode state ('3D' | '2D') to toggle between
 * WebGL scene execution and a static fallback background.
 */
export function useRenderMode() {
  return useState<RenderMode>("render-mode", () => "3D");
}
