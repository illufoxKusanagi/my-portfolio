import * as THREE from "three";

let cachedCarbonTexture: THREE.Texture | null = null;

function getCarbonTexture(): THREE.Texture {
  if (cachedCarbonTexture) return cachedCarbonTexture;
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("/textures/carbon-fiber-square.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  cachedCarbonTexture = texture;
  return texture;
}

export function createGtrR33MaterialDetails() {
  const texture = getCarbonTexture();

  return {
    paintMaterial: new THREE.MeshPhysicalMaterial({
      color: 0x280137, // Midnight Purple III
      roughness: 0.08,
      metalness: 0.78,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    }),

    windowGlassMaterial: new THREE.MeshPhysicalMaterial({
      color: 0x11151c,
      transparent: true,
      opacity: 0.88,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.65,
      ior: 1.5,
      depthWrite: false,
      side: THREE.FrontSide,
    }),

    hoodMaterial: new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    }),

    headlightGlassMaterial: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
      roughness: 0.04,
      metalness: 0.05,
      transmission: 0.9,
      ior: 1.5,
      depthWrite: false,
    }),

    headlightHousingMaterial: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.75,
      roughness: 0.2,
      metalness: 0.2,
      emissive: 0xdbeafe,
      emissiveIntensity: 1.5,
      depthWrite: false,
    }),

    tailightHousingMaterial: new THREE.MeshPhysicalMaterial({
      color: 0xcc0000,
      roughness: 0.2,
      metalness: 0.1,
    }),

    taillightGlassMaterial: new THREE.MeshPhysicalMaterial({
      color: 0xcc0000,
      transparent: true,
      opacity: 0.45,
      roughness: 0.15,
      metalness: 0.1,
      emissive: 0xcc0000,
      emissiveIntensity: 3.0,
      depthWrite: false,
    }),

    taillightMaterial: new THREE.MeshPhysicalMaterial({
      color: 0xdc2626,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0xff1e1e,
      emissiveIntensity: 4.2,
      depthWrite: false,
    }),

    tireMaterial: new THREE.MeshStandardMaterial({
      color: 0x101010,
      roughness: 0.9,
      metalness: 0.05,
    }),

    rimMaterial: new THREE.MeshStandardMaterial({
      color: 0xdbe4f3,
      roughness: 0.2,
      metalness: 0.9,
    }),

    caliperMaterial: new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.3,
      metalness: 0.6,
    }),

    rotorMaterial: new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.4,
      metalness: 0.85,
    }),

    darkPlasticMaterial: new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.6,
      metalness: 0.2,
    }),

    chromeMaterial: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 1.0,
    }),

    headlightHidMaterial: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.3,
      emissive: 0xe0f2fe,
      emissiveIntensity: 5.0,
    }),

    headlightChromeMaterial: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0xbae6fd,
      emissiveIntensity: 0.8,
    }),

    gtrMaterial: new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.3,
      metalness: 0.6,
    }),

    interiorMaterial: new THREE.MeshStandardMaterial({
      color: 0x1f1f1f,
      roughness: 0.7,
      metalness: 0.1,
    }),

    turnSignal: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.2,
      depthWrite: false,
    }),
  };
}
