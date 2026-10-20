export const THREE_SCENE_CONSTANTS = {
  DRACO_DECODER_PATH: "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
  GTR_R33_MODEL_PATH: "/models/Skyline-GTR-R33-FH6_animated.glb",

  VENICE_SUNSET_HDR_URL:
    "https://raw.githubusercontent.com/pmndrs/drei-assets/master/hdri/venice_sunset_1k.hdr",

  // Camera & Scene
  CAMERA_FOV: 40,
  CAMERA_NEAR: 0.1,
  CAMERA_FAR: 100,
  INITIAL_CAMERA_POSITION: [4.2, 1.35, 4.8] as const,
  LOOK_AT_TARGET: [0, 0.45, 0] as const,
  FOG_COLOR: 0x050033,

  // Post-Processing (Calibrated for HalfFloat HDR Target)
  BLOOM_STRENGTH: 0.32,
  BLOOM_RADIUS: 0.65,
  BLOOM_THRESHOLD: 0.85,

  // Aerodynamic Particles
  PARTICLE_COUNT: 150,
  PARTICLE_BASE_SPEED: 0.16,
  PARTICLE_COLORS: ["#47b3ff", "#7ebaff", "#cb51fb", "#ffffff"] as const,
} as const;
