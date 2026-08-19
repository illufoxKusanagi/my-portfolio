<template>
  <div
    v-show="isActive"
    class="canvas-container-wrap"
  >
    <ThreeExperience :is-active="isActive" />
  </div>
</template>

<script setup lang="ts">
import ThreeExperience from "./ThreeExperience.vue";

withDefaults(
  defineProps<{
    isActive?: boolean;
  }>(),
  {
    isActive: true,
  }
);
</script>

<style scoped>
.canvas-container-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
