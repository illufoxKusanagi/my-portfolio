import * as THREE from "three";
import { THREE_SCENE_CONSTANTS } from "./threeSceneConstants";

interface LineParticle {
  pos: THREE.Vector3;
  speed: number;
  width: number;
  length: number;
  noiseOffset: number;
}

export function useWindTunnelParticles(scene: THREE.Scene) {
  const { PARTICLE_COUNT, PARTICLE_BASE_SPEED, PARTICLE_COLORS } =
    THREE_SCENE_CONSTANTS;

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const particleMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const instancedMesh = new THREE.InstancedMesh(
    boxGeometry,
    particleMaterial,
    PARTICLE_COUNT,
  );
  instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  const colors = PARTICLE_COLORS.map((hex) => new THREE.Color(hex));
  const particlesData: LineParticle[] = [];
  const tempObject = new THREE.Object3D();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = (Math.random() - 0.5) * 4.2;
    const y = 0.05 + Math.random() * 2.2;
    const z = (Math.random() - 0.5) * 14;
    const width = 0.012 + Math.random() * 0.015;
    const length = 0.8 + Math.random() * 1.5;
    const color = colors[i % colors.length]!;

    particlesData.push({
      pos: new THREE.Vector3(x, y, z),
      speed: PARTICLE_BASE_SPEED * (0.8 + Math.random() * 0.5),
      width,
      length,
      noiseOffset: Math.random() * 100,
    });

    tempObject.position.set(x, y, z);
    tempObject.scale.set(width, width, length);
    tempObject.updateMatrix();
    instancedMesh.setMatrixAt(i, tempObject.matrix);
    instancedMesh.setColorAt(i, color);
  }

  instancedMesh.instanceMatrix.needsUpdate = true;
  if (instancedMesh.instanceColor) {
    instancedMesh.instanceColor.needsUpdate = true;
  }

  scene.add(instancedMesh);

  function updateParticles(
    time: number,
    delta: number = 0.016,
    speedMultiplier: number = 1.0,
  ): void {
    const frameScale = Math.min(delta, 0.1) * 60;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particlesData[i]!;
      p.pos.z -= p.speed * speedMultiplier * frameScale;

      if (p.pos.z < -7) {
        p.pos.z = 7;
        p.pos.x = (Math.random() - 0.5) * 4.2;
        p.pos.y = 0.05 + Math.random() * 2.2;
      }

      deflectAroundCarBody(p);

      const waveX = Math.sin(time * 4 + p.noiseOffset) * 0.015;
      tempObject.position.set(p.pos.x + waveX, p.pos.y, p.pos.z);
      tempObject.scale.set(p.width, p.width, p.length);
      tempObject.updateMatrix();

      instancedMesh.setMatrixAt(i, tempObject.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
  }

  return {
    updateParticles,
  };
}

function deflectAroundCarBody(p: LineParticle): void {
  const absX = Math.abs(p.pos.x);
  const z = p.pos.z;

  if (z <= -2.3 || z >= 2.3) return;

  if (z > 1.2 && z < 2.1 && p.pos.y < 0.7 && absX < 1.0) {
    p.pos.y += (0.7 - p.pos.y) * 0.16;
  } else if (z > 0.4 && z <= 1.2 && absX < 0.92) {
    const targetY = 0.7 + (1.2 - z) * 0.75;
    if (p.pos.y < targetY) p.pos.y += (targetY - p.pos.y) * 0.16;
  } else if (z > -0.8 && z <= 0.4 && p.pos.y < 1.4 && absX < 0.88) {
    p.pos.y += (1.4 - p.pos.y) * 0.16;
  } else if (z > -1.9 && z <= -0.8 && absX < 0.92) {
    const targetY = 1.4 - (z + 0.8) * 0.35;
    if (p.pos.y < targetY) p.pos.y += (targetY - p.pos.y) * 0.16;
  }

  if (absX < 1.12 && p.pos.y < 1.3) {
    const force = (1.12 - absX) * 0.15;
    p.pos.x += p.pos.x >= 0 ? force : -force;
  }
}
