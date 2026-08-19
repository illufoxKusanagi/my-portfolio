import * as THREE from "three";
import type { createGtrR33MaterialDetails } from "~/components/three/GtrR33Details";

type GtrMaterials = ReturnType<typeof createGtrR33MaterialDetails>;

/**
 * Maps mesh names in the Skyline GTR R33 GLTF hierarchy to physical materials.
 */
export function assignGtrMaterials(model: THREE.Group, m: GtrMaterials): void {
  model.traverse((child: THREE.Object3D) => {
    if (!(child instanceof THREE.Mesh)) return;

    const name = child.name.toLowerCase();
    const isGlass =
      name.includes("glass") ||
      name.includes("window") ||
      name.includes("windshield");

    child.castShadow = !isGlass;
    child.receiveShadow = !isGlass;

    if (child.geometry.attributes.color) {
      child.geometry.deleteAttribute("color");
    }

    child.material = resolveMaterial(name, m);
  });
}

function resolveMaterial(name: string, m: GtrMaterials): THREE.Material {
  if (name.includes("tire")) return m.tireMaterial;
  if (name.includes("hood") && name.includes("carpaint")) return m.hoodMaterial;
  if (isWindowGlass(name)) return m.windowGlassMaterial;
  if (isHeadlightGlass(name)) return m.headlightGlassMaterial;
  if (isHeadlightHousing(name)) return m.headlightHousingMaterial;
  if (
    name.includes("taillight") &&
    name.includes("light") &&
    name.includes("smooth")
  )
    return m.taillightMaterial;
  if (
    (name.includes("gls") && name.includes("tl")) ||
    (name.includes("glass") && name.includes("chmsl"))
  )
    return m.taillightGlassMaterial;
  if (name.includes("taillight") && name.includes("chrome"))
    return m.tailightHousingMaterial;
  if (name.includes("wheel")) return m.rimMaterial;
  if (name.includes("caliper")) return m.caliperMaterial;
  if (name.includes("rotor")) return m.rotorMaterial;
  if (isChrome(name)) return m.chromeMaterial;
  if (isDarkPlastic(name)) return m.darkPlasticMaterial;
  if (isInterior(name)) return m.interiorMaterial;
  if (name.includes("carpaint")) return m.paintMaterial;
  if (
    (name.includes("bumperfbadge") && name.includes("gunmetal")) ||
    (name.includes("trunkemblem") && name.includes("gunmetal"))
  )
    return m.gtrMaterial;
  if (
    name.includes("marker") ||
    name.includes("foglight") ||
    name.includes("turn")
  )
    return m.turnSignal;
  if (name.includes("headlight")) return m.headlightChromeMaterial;
  if (name.includes("lens") || name.includes("lhl") || name.includes("rhl"))
    return m.headlightHidMaterial;

  return m.paintMaterial;
}

function isWindowGlass(name: string): boolean {
  return (
    name.includes("glassf") ||
    name.includes("glassr") ||
    name.includes("glassl") ||
    name.includes("glassint") ||
    name.includes("windshield")
  );
}

function isHeadlightGlass(name: string): boolean {
  return (
    name.includes("glasslhl") ||
    name.includes("glassrhl") ||
    name.includes("lenslhl") ||
    name.includes("lensrhl")
  );
}

function isHeadlightHousing(name: string): boolean {
  return (
    (name.includes("headlight") && name.includes("chrome")) ||
    (name.includes("headlight") && name.includes("satin")) ||
    (name.includes("headlight") &&
      name.includes("lights") &&
      name.includes("smooth"))
  );
}

function isChrome(name: string): boolean {
  return (
    name.includes("emblem") ||
    name.includes("badge") ||
    name.includes("exhaust") ||
    name.includes("logo")
  );
}

function isDarkPlastic(name: string): boolean {
  return (
    name.includes("grille") ||
    name.includes("wiper") ||
    name.includes("plastic") ||
    name.includes("undercarriage") ||
    name.includes("radiator") ||
    name.includes("rubber") ||
    (name.includes("bumper") && name.includes("frame"))
  );
}

function isInterior(name: string): boolean {
  return (
    name.includes("seat") ||
    name.includes("steering") ||
    name.includes("dash") ||
    name.includes("pedal") ||
    name.includes("interior") ||
    name.includes("console") ||
    name.includes("cluster")
  );
}
