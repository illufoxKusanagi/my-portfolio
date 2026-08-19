export const THREE_SCENE_CONSTANTS = {
  DRACO_DECODER_PATH: "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
  GTR_R33_MODEL_PATH: "/models/Skyline-GTR-R33.glb",
  VENICE_SUNSET_HDR_URL:
    "https://raw.githubusercontent.com/pmndrs/drei-assets/master/hdri/venice_sunset_1k.hdr",

  // Camera & Scene
  CAMERA_FOV: 45,
  CAMERA_NEAR: 0.1,
  CAMERA_FAR: 100,
  INITIAL_CAMERA_POSITION: [5.0, 1.2, 5.5] as const,
  LOOK_AT_TARGET: [0.0, 0.2, 0.0] as const,
  FOG_COLOR: 0x08090c,

  // Post-Processing
  BLOOM_STRENGTH: 0.01,
  BLOOM_RADIUS: 1.0,
  BLOOM_THRESHOLD: 0.95,

  // Aerodynamic Particles
  PARTICLE_COUNT: 100,
  PARTICLE_BASE_SPEED: 0.2,
  PARTICLE_COLORS: ["#3b82f6", "#6366f1", "#06b6d4", "#ffffff"] as const,
} as const;
