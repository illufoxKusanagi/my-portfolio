import * as THREE from "three";
import { THREE_SCENE_CONSTANTS } from "@/three/constants/threeSceneConstants";

interface LineParticle {
  pos: THREE.Vector3;
  speed: number;
  width: number;
  length: number;
  color: THREE.Color;
  noiseOffset: number;
}

export function useWindTunnelParticles(scene: THREE.Scene) {
  const { PARTICLE_COUNT, PARTICLE_BASE_SPEED, PARTICLE_COLORS } =
    THREE_SCENE_CONSTANTS;

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const particleMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const instancedMesh = new THREE.InstancedMesh(
    boxGeometry,
    particleMaterial,
    PARTICLE_COUNT
  );

  const colors = PARTICLE_COLORS.map((hex) => new THREE.Color(hex));
  const particlesData: LineParticle[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = (Math.random() - 0.5) * 4.0;
    const y = Math.random() * 2.5;
    const z = (Math.random() - 0.5) * 12;

    particlesData.push({
      pos: new THREE.Vector3(x, y, z),
      speed: PARTICLE_BASE_SPEED * (0.8 + Math.random() * 0.4),
      width: 0.012 + Math.random() * 0.015,
      length: 0.8 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)]!,
      noiseOffset: Math.random() * 100,
    });
  }

  scene.add(instancedMesh);

  const tempObject = new THREE.Object3D();

  function updateParticles(time: number, speedMultiplier: number = 1.0): void {
    particlesData.forEach((p, i) => {
      p.pos.z -= p.speed * speedMultiplier;

      // Reset particle position
      if (p.pos.z < -7) {
        p.pos.z = 7;
        p.pos.x = (Math.random() - 0.5) * 4.0;
        p.pos.y = Math.random() * 2.5;
      }

      deflectAroundCarBody(p);

      const waveX = Math.sin(time * 4 + p.noiseOffset) * 0.01;
      tempObject.position.set(p.pos.x + waveX, p.pos.y, p.pos.z);
      tempObject.scale.set(p.width, p.width, p.length);
      tempObject.updateMatrix();

      instancedMesh.setMatrixAt(i, tempObject.matrix);
      instancedMesh.setColorAt(i, p.color);
    });

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
  }

  function disposeParticles(): void {
    boxGeometry.dispose();
    particleMaterial.dispose();
    scene.remove(instancedMesh);
  }

  return {
    updateParticles,
    disposeParticles,
  };
}

function deflectAroundCarBody(p: LineParticle): void {
  const absX = Math.abs(p.pos.x);
  const z = p.pos.z;

  if (z <= -2.2 || z >= 2.2) return;

  // Hood deflection
  if (z > 1.2 && z < 2.0 && p.pos.y < 0.65 && absX < 1.0) {
    p.pos.y += (0.65 - p.pos.y) * 0.15;
  }
  // Windshield deflection
  else if (z > 0.4 && z <= 1.2 && absX < 0.9) {
    const targetY = 0.65 + (1.2 - z) * 0.7;
    if (p.pos.y < targetY) p.pos.y += (targetY - p.pos.y) * 0.15;
  }
  // Roof deflection
  else if (z > -0.8 && z <= 0.4 && p.pos.y < 1.35 && absX < 0.85) {
    p.pos.y += (1.35 - p.pos.y) * 0.15;
  }
  // Spoiler/Rear Window deflection
  else if (z > -1.8 && z <= -0.8 && absX < 0.9) {
    const targetY = 1.35 - (z + 0.8) * 0.4;
    if (p.pos.y < targetY) p.pos.y += (targetY - p.pos.y) * 0.15;
  }

  // Side body deflection
  if (absX < 1.15 && p.pos.y < 1.3) {
    const force = (1.15 - absX) * 0.15;
    p.pos.x += p.pos.x >= 0 ? force : -force;
  }
}
