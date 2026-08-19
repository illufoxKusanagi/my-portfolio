<script setup lang="ts">
import { useLoop } from "@tresjs/core";
import { ref } from "vue";
import { Vector3 } from "three";

// Reference to our donut mesh for animation
const donutRef = ref();

// Animation loop
const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed }) => {
  if (donutRef.value) {
    // Rotate the donut on both X and Y axes
    donutRef.value.rotation.x = elapsed * 0.5;
    donutRef.value.rotation.y = elapsed * 0.3;
  }
});

const cameraPos = new Vector3(7, 7, 7);
const cameraLookAt = new Vector3(0, 0, 0);
const meshPos = new Vector3(0, 2, 0);
</script>

<template>
  <!-- Camera Setup -->
  <TresPerspectiveCamera :position="cameraPos" :look-at="cameraLookAt" />
  <TresMesh :position="meshPos">
    <TresTorusGeometry :args="[1, 0.4, 16, 32]" />
    <TresMeshBasicMaterial color="#ff6b35" />
  </TresMesh>
  <TresAxesHelper />
  <TresGridHelper />
</template>
