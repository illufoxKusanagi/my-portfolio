import * as THREE from "three";

export function createGtrR33MaterialDetails() {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("/textures/carbon-fiber-square.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  return {
    paintMaterial: new THREE.MeshPhysicalMaterial({
      color: 0x280137, // Midnight Purple
      // color: 0xffffff,
      roughness: 0.02,
      metalness: 0.7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    }),

    windowGlassMaterial: new THREE.MeshPhysicalMaterial({
      color: 0x1d1d1f,
      transparent: true,
      opacity: 0.9,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.95,
      ior: 1.52,
      thickness: 0.0,
      depthWrite: false,
      side: THREE.FrontSide,
    }),

    hoodMaterial: new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.12,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    }),

    headlightGlassMaterial: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      opacity: 0.1,
      roughness: 0.02,
      metalness: 0.1,
      depthWrite: false,
    }),

    headlightHousingMaterial: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveIntensity: 2.0,
      thickness: 0.2,
      depthWrite: false,
    }),

    tailightHousingMaterial: new THREE.MeshPhysicalMaterial({
      color: 0xdb0000,
      roughness: 0.2,
      metalness: 0.1,
    }),

    taillightGlassMaterial: new THREE.MeshPhysicalMaterial({
      color: 0xdb0000,
      transparent: true,
      opacity: 0.01,
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0xc70000,
      emissiveIntensity: 25.0,
      thickness: 0.2,
      depthWrite: false,
    }),

    taillightMaterial: new THREE.MeshPhysicalMaterial({
      color: 0xc70000,
      transparent: true,
      opacity: 0.6,
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0xc70000,
      emissiveIntensity: 25.0,
      thickness: 0.2,
      depthWrite: false,
    }),

    tireMaterial: new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.9,
      metalness: 0.001,
    }),

    rimMaterial: new THREE.MeshStandardMaterial({
      color: 0xe3ecff,
      roughness: 0.2,
      metalness: 0.85,
    }),

    caliperMaterial: new THREE.MeshStandardMaterial({
      color: 0x900c0f,
      roughness: 0.3,
      metalness: 0.6,
    }),

    rotorMaterial: new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.45,
      metalness: 0.8,
    }),

    darkPlasticMaterial: new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.65,
      metalness: 0.15,
    }),

    chromeMaterial: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.99,
    }),

    headlightHidMaterial: new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.5,
      metalness: 0.4,
      emissive: 0xffffff,
      emissiveIntensity: 25.0,
    }),

    headlightChromeMaterial: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0xffffff,
      emissiveIntensity: 1.0,
    }),

    gtrMaterial: new THREE.MeshStandardMaterial({
      color: 0xd40404,
      roughness: 0.3,
      metalness: 0.6,
    }),

    interiorMaterial: new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.7,
      metalness: 0.1,
    }),

    turnSignal: new THREE.MeshStandardMaterial({
      color: 0xf26900,
      transparent: true,
      opacity: 0.1,
      roughness: 0.02,
      metalness: 0.1,
      depthWrite: false,
    }),
  };
}
