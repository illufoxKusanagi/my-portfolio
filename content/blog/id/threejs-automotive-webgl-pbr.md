---
title: "Membangun Showroom Otomotif 3D Real-Time dengan Three.js & Nuxt"
subtitle: "Dari pipeline GLTF dan material PBR hingga simulasi lorong angin partikel aerodinamis"
summary: "Penjelajahan mendalam dalam membangun pengalaman web 3D siap produksi. Membahas tone mapping ACESFilmic, shader clearcoat midnight purple kustom, peta lingkungan HDR, dan fisika kamera orbit halus tanpa penurunan 60 FPS."
publishedAt: "2026-07-28"
readTime: "6 menit baca"
category: "Graphics & 3D"
tags: ["Three.js", "WebGL", "Vue 3", "GLTF", "PBR"]
coverImage: "/images/projects/my_cars_preview.png"
---

Aplikasi web 3D real-time sering menghadapi dua kendala utama: muatan aset awal yang terlalu besar dan laju bingkai (frame pacing) yang tidak stabil pada perangkat keras spek menengah. Saat merancang showroom 3D Nissan GT-R R33 untuk portofolio ini, setiap lintasan rendering harus dirancang sangat efisien.

## 1. Kompresi Geometri Draco & Pipeline GLTF

Mesh CAD mentah dan model 3D tanpa kompresi dapat dengan mudah melampaui 50MB. Dengan memanfaatkan kompresi mesh Draco via decoder WebAssembly, ukuran model 3D Nissan Skyline R33 berhasil dipangkas dari 42MB menjadi hanya 3.8MB tanpa penurunan kualitas visual normal vertex yang tampak oleh mata.

```typescript
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);
```

## 2. Physically Based Rendering (PBR) & Cat Mobil Berlapis

Cat metalik otomotif membutuhkan sorotan spekular berlapis: lapisan dasar dengan pantulan mikro serpihan logam (metallic flake) dan lapisan bening poliuretan (clearcoat) di atasnya. `MeshPhysicalMaterial` pada Three.js menyediakan parameter realistis untuk `clearcoat`, `clearcoatRoughness`, dan refleksi anisotropik yang bereaksi secara dinamis terhadap probe pencahayaan lingkungan HDRI.

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
Selalu batasi pixel ratio ke angka `1.5` pada layar HiDPI: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))`. Ini mencegah lonjakan beban fill-rate 4K yang membebani GPU terintegrasi.
::

## 3. Lorong Angin Partikel Aerodinamis

Untuk menghidupkan model mobil statis, kami menambahkan sistem aliran partikel aerodinamis. Dengan menghitung offset gelombang sinus trigonometris pada loop animasi dan menyinkronkan kecepatan partikel terhadap momentum scroll Lenis pengguna, kendaraan tampak berakselerasi di dalam lorong angin seiring navigasi halaman.

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
