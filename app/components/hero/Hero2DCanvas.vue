<template>
  <div
    class="canvas-2d-wrap"
    :class="{ 'canvas-2d-hidden': !isActive }"
    aria-hidden="true"
  >
    <canvas ref="canvasRef" class="w-full h-full block" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useColorMode } from "#imports";

const props = withDefaults(
  defineProps<{
    isActive?: boolean;
  }>(),
  {
    isActive: true,
  }
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const colorMode = useColorMode();

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
}

let animId: number;
let ctx: CanvasRenderingContext2D | null = null;
let width = 0;
let height = 0;
let particles: Particle[] = [];
const mouse = { x: -1000, y: -1000, radius: 180 };

const PARTICLE_COUNT = 75;
const MAX_CONNECT_DIST = 140;

const initParticles = () => {
  particles = [];
  const isDark = colorMode.value === "dark";
  const colors = isDark
    ? ["#38bdf8", "#818cf8", "#c084fc", "#60a5fa"]
    : ["#0284c7", "#4f46e5", "#7c3aed", "#2563eb"];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = Math.random() * 2 + 1.2;
    const chosenColor = colors[Math.floor(Math.random() * colors.length)] ?? "#38bdf8";
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius,
      baseRadius: radius,
      color: chosenColor,
    });
  }
};

const handleResize = () => {
  if (!canvasRef.value) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvasRef.value.width = width * dpr;
  canvasRef.value.height = height * dpr;
  if (ctx) ctx.scale(dpr, dpr);
  initParticles();
};

const handleMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

const handleMouseLeave = () => {
  mouse.x = -1000;
  mouse.y = -1000;
};

const drawCyberGrid = (isDark: boolean) => {
  if (!ctx) return;
  ctx.save();
  ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.04)" : "rgba(2, 132, 199, 0.05)";
  ctx.lineWidth = 1;

  // Background radar circles centered at vehicle focal area
  const centerX = width * 0.65;
  const centerY = height * 0.5;

  for (let r = 100; r <= 500; r += 100) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Crosshair coordinate lines
  ctx.beginPath();
  ctx.moveTo(centerX - 520, centerY);
  ctx.lineTo(centerX + 520, centerY);
  ctx.moveTo(centerX, centerY - 520);
  ctx.lineTo(centerX, centerY + 520);
  ctx.stroke();

  ctx.restore();
};

const renderLoop = () => {
  if (!ctx || !props.isActive) return;

  const isDark = colorMode.value === "dark";
  ctx.clearRect(0, 0, width, height);

  // 1. Draw subtle cyber telemetry background grid
  drawCyberGrid(isDark);

  // 2. Update and draw particles
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    if (!p) continue;

    // Move particle
    p.x += p.vx;
    p.y += p.vy;

    // Bounce off edges
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Mouse interactive proximity
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mouse.radius) {
      const force = (mouse.radius - dist) / mouse.radius;
      p.radius = p.baseRadius + force * 2.5;

      // Draw connection line to mouse
      ctx.beginPath();
      ctx.strokeStyle = isDark
        ? `rgba(56, 189, 248, ${0.4 * force})`
        : `rgba(2, 132, 199, ${0.45 * force})`;
      ctx.lineWidth = 1.2;
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    } else {
      p.radius = p.baseRadius;
    }

    // Draw particle node
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = isDark ? 8 : 4;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Connect close neighbors
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      if (!p2) continue;
      const pdist = Math.hypot(p.x - p2.x, p.y - p2.y);

      if (pdist < MAX_CONNECT_DIST) {
        const opacity = (1 - pdist / MAX_CONNECT_DIST) * (isDark ? 0.25 : 0.2);
        ctx.beginPath();
        ctx.strokeStyle = isDark
          ? `rgba(99, 102, 241, ${opacity})`
          : `rgba(79, 70, 229, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }

  animId = requestAnimationFrame(renderLoop);
};

watch(
  () => props.isActive,
  (active) => {
    if (active) {
      renderLoop();
    } else {
      cancelAnimationFrame(animId);
    }
  }
);

watch(
  () => colorMode.value,
  () => {
    initParticles();
  }
);

onMounted(() => {
  if (!canvasRef.value) return;
  ctx = canvasRef.value.getContext("2d");
  handleResize();

  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

  if (props.isActive) {
    renderLoop();
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animId);
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseleave", handleMouseLeave);
  }
});
</script>

<style scoped>
.canvas-2d-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.canvas-2d-hidden {
  display: none;
}
</style>
