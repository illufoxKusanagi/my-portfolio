---
title: "Building Real-Time 3D Automotive Showrooms with Three.js & Nuxt"
subtitle: "From GLTF pipelines and PBR materials to particle wind tunnel simulations"
summary: "A deep dive into building production-ready 3D web experiences. We explore ACESFilmic tone mapping, custom midnight purple clearcoat shaders, HDR environment maps, and smooth orbit camera physics without dropping 60 FPS."
publishedAt: "2026-07-28"
readTime: "6 min read"
category: "Graphics & 3D"
tags: ["Three.js", "WebGL", "Vue 3", "GLTF", "PBR"]
coverImage: "/images/projects/my_cars_preview.png"
---

Real-time 3D web applications often suffer from two major problems: bloated initial asset payloads and unstable frame pacing on lower-powered devices. When architecting the GT-R R33 3D showroom for this portfolio, every rendering pass had to be carefully budget-conscious.

## 1. Draco Geometry Compression & GLTF Pipeline

Raw CAD meshes and uncompressed 3D models can easily exceed 50MB. By leveraging Draco mesh compression via WebAssembly decoders, we reduced the 3D Nissan Skyline R33 model from 42MB down to just 3.8MB with zero perceptible visual degradation in vertex normals.

```typescript
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);
```

## 2. Physically Based Rendering (PBR) & Multi-Layer Paint

Automotive metallic paint requires multiple specular highlights: a base coat with metallic flake micro-reflections and a crystal clear polyurethane top coat. Three.js `MeshPhysicalMaterial` provides realistic `clearcoat`, `clearcoatRoughness`, and anisotropic reflection parameters that react dynamically to environment light probes.

```typescript
const carBodyMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(0x1a0933), // Midnight Purple III
  metalness: 0.85,
  roughness: 0.2,
  clearcoat: 1.0,
  clearcoatRoughness: 0.05,
  reflectivity: 0.9,
});
```

::callout-alert{type="tip"}
Always cap your pixel ratio to `1.5` on HiDPI screens: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))`. This prevents 4K fill-rate explosion on integrated graphics.
::

## 3. Aerodynamic Particle Wind Tunnel

To give life to the static model, we introduced a particle stream system. By calculating trigonometric sine wave offsets in the animation loop and synchronizing particle velocity with the user's Lenis scroll momentum, the vehicle appears to accelerate dynamically through wind tunnels as you navigate the page.

```typescript
export function updateParticles(time: number, speedMultiplier: number = 1.0) {
  const positions = particleGeometry.attributes.position.array as Float32Array;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3 + 2] += (PARTICLE_SPEED * speedMultiplier);
    if (positions[i * 3 + 2] > 15) {
      positions[i * 3 + 2] = -25;
    }
  }
  particleGeometry.attributes.position.needsUpdate = true;
}
```
