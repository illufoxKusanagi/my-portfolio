<template>
  <div
    class="hidden md:block relative w-full h-full overflow-hidden bg-purple-100 dark:bg-secondary-950 transition-colors duration-500"
  >
    <!-- =================================================================== -->
    <!-- VIEWPORT-ADAPTIVE 900px-HEIGHT STAGE                                -->
    <!-- Scales by (viewportHeight / 900) and adapts width to exact aspect   -->
    <!-- ratio so nothing is ever clipped on browser windows or 2K/4K/UW!    -->
    <!-- =================================================================== -->
    <div
      class="absolute left-0 top-0 h-[900px] origin-top-left overflow-hidden"
      :style="{
        width: `${stageWidth}px`,
        transform: `scale(${stageScale})`,
      }"
    >
      <!-- ================================================================= -->
      <!-- ZONE 1: CLEAN 3-LAYER ENDFIELD BACKGROUND & ROTATING POLAR WHEEL  -->
      <!-- All circles & wheel SVG share the exact Hub Pivot (215, 605)      -->
      <!-- ================================================================= -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <!-- 1A. Outer Rim Circle Centered at (215, 605) -->
        <div
          class="absolute left-[215px] top-[605px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/60 dark:bg-secondary-900 border-2 border-purple-500/40 dark:border-tertiary-400/35 transition-colors duration-500"
          :style="{
            width: `${fanDiameter + 360}px`,
            height: `${fanDiameter + 360}px`,
          }"
        />

        <!-- 1B. Main Royal-Blue Polar Fan Circle Centered at (215, 605) -->
        <div
          class="absolute left-[215px] top-[605px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200 dark:bg-secondary-700 border-2 border-purple-500/50 dark:border-tertiary-400/50 transition-colors duration-500"
          :style="{
            width: `${fanDiameter}px`,
            height: `${fanDiameter}px`,
          }"
        />

        <!-- 1C. Continuous Scroll-Driven Rotating Polar Wheel SVG at (215, 605) -->
        <svg
          viewBox="-1400 -1400 2800 2800"
          class="absolute left-[215px] top-[605px] w-[2800px] h-[2800px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
        >
          <!-- Primary Rotating Wheel Spokes & Segmented Caliper Rings -->
          <g :transform="`rotate(${wheelAngle})`">
            <!-- 24 Radial Wheel Spokes (every 15deg) that visibly sweep on scroll -->
            <g
              class="stroke-purple-600/25 dark:stroke-tertiary-400/25"
              stroke-width="1.25"
            >
              <line
                v-for="n in 24"
                :key="'wheel-spoke-' + n"
                x1="210"
                y1="0"
                x2="1320"
                y2="0"
                :transform="`rotate(${(n - 1) * 15})`"
              />
            </g>

            <!-- 5 Segmented Mechanical Wheel Rings -->
            <circle
              cx="0"
              cy="0"
              r="340"
              fill="none"
              class="stroke-purple-600/45 dark:stroke-tertiary-400/45"
              stroke-width="2"
              stroke-dasharray="48 18 12 18"
            />
            <circle
              cx="0"
              cy="0"
              r="520"
              fill="none"
              class="stroke-purple-600/35 dark:stroke-tertiary-400/35"
              stroke-width="1.6"
              stroke-dasharray="90 30 20 30"
            />
            <circle
              cx="0"
              cy="0"
              r="740"
              fill="none"
              class="stroke-purple-600/30 dark:stroke-tertiary-400/30"
              stroke-width="1.6"
              stroke-dasharray="120 40 24 40"
            />
            <circle
              cx="0"
              cy="0"
              r="980"
              fill="none"
              class="stroke-purple-600/30 dark:stroke-tertiary-400/30"
              stroke-width="1.8"
              stroke-dasharray="160 50 30 50"
            />
            <circle
              cx="0"
              cy="0"
              r="1210"
              fill="none"
              class="stroke-purple-700/45 dark:stroke-tertiary-300/45"
              stroke-width="2.4"
              stroke-dasharray="180 40 20 40"
            />
          </g>

          <!-- Counter-Rotating Inner Caliper Rings -->
          <g :transform="`rotate(${-wheelAngle * 0.65})`">
            <circle
              cx="0"
              cy="0"
              r="430"
              fill="none"
              class="stroke-purple-700/25 dark:stroke-white/20"
              stroke-width="1.5"
              stroke-dasharray="16 24"
            />
            <circle
              cx="0"
              cy="0"
              r="860"
              fill="none"
              class="stroke-purple-600/25 dark:stroke-tertiary-400/22"
              stroke-width="1.5"
              stroke-dasharray="24 36"
            />
          </g>
        </svg>

        <!-- 1D. Top-Left Angled Mask & Accent Wedge Above the -30deg Spine -->
        <div
          class="absolute left-[215px] top-[605px] w-0 h-0 origin-top-left -rotate-[30deg]"
        >
          <div
            class="absolute -left-[1400px] bottom-[134px] w-[4600px] h-[2200px] bg-purple-100 dark:bg-secondary-950 transition-colors duration-500"
          />
          <div
            class="absolute left-[160px] bottom-[134px] w-[680px] h-[1200px] origin-bottom-left skew-x-[30deg] bg-purple-200/85 dark:bg-secondary-800/90 border-r border-purple-500/35 dark:border-tertiary-400/30 transition-colors duration-500"
          />
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- ZONE 2: DIAGONAL -30deg SPINE (TITLE STRIPE + COMPACT OVERVIEW)   -->
      <!-- Origin at Hub Pivot (215, 605) — swings like a wheel spoke on     -->
      <!-- project change!                                                   -->
      <!-- ================================================================= -->
      <div
        ref="spineArmRef"
        class="absolute left-[215px] top-[605px] w-0 h-0 origin-top-left -rotate-[30deg] z-10 pointer-events-none"
      >
        <!-- 2A. Upper Title Band (Strictly above spine line: bottom-0, h-[134px]) -->
        <div
          class="absolute left-0 bottom-0 w-[3400px] h-[134px] bg-purple-600 dark:bg-primary-800 border-y-2 border-white/35 dark:border-tertiary-400/55 shadow-2xl transition-colors duration-500"
        >
          <!-- Endfield Stage Divider Lines Inside the Stripe -->
          <div class="absolute inset-0 flex pointer-events-none">
            <div class="w-[440px] h-full border-r border-white/15" />
            <div class="w-[220px] h-full border-r border-white/15" />
            <div class="w-[220px] h-full border-r border-white/15" />
          </div>

          <!-- Floating Section Tag Above Stripe: [X] PROJECT // 07 OF 11 -->
          <div class="absolute -top-7 left-[265px] flex items-center gap-2.5">
            <span
              class="w-5 h-5 rounded-[2px] bg-purple-950 dark:bg-secondary-950 border border-white/80 flex items-center justify-center font-tech text-[11px] font-extrabold text-white"
            >
              X
            </span>
            <span
              class="font-tech text-xs font-bold tracking-[1.5px] text-purple-950 dark:text-white uppercase whitespace-nowrap"
            >
              {{ projectLabel }} // {{ formattedActiveIndex }} OF
              {{ formattedTotal }} &bull;
              {{
                activeProject.isPrivateRepo ? "PRIVATE SYSTEM" : "OPEN SOURCE"
              }}
            </span>
          </div>

          <!-- Title, Subtitle & Rank Progress Bar (u = 265..885px) -->
          <div
            class="absolute left-[265px] top-0 w-[620px] h-full flex flex-col justify-center px-4 py-2"
          >
            <div class="flex items-center justify-between gap-4">
              <span
                class="font-tech text-[11px] font-bold uppercase tracking-[2px] text-purple-200 dark:text-tertiary-300"
              >
                ACTIVE NODE // {{ activeTechName }}
              </span>
              <span
                class="font-tech text-[10px] font-bold uppercase tracking-widest text-white/80"
              >
                RANK 9/9
              </span>
            </div>

            <h3
              class="font-sans font-extrabold text-[32px] text-white uppercase tracking-tight leading-none truncate mt-1"
            >
              {{ activeProjectTitle }}
            </h3>

            <p
              class="font-tech font-semibold text-[11px] text-purple-100 dark:text-tertiary-200 uppercase tracking-wider truncate mt-1"
            >
              {{ activeProjectSubtitle }}
            </p>

            <!-- Endfield Segmented White Rank Bar + 2-Diamond Tip -->
            <div class="flex items-center gap-2.5 mt-2">
              <div class="flex-1 h-1.5 bg-white/25 relative overflow-hidden">
                <div
                  class="h-full bg-white transition-all duration-500"
                  :style="{ width: `${barFillProgress * 100}%` }"
                />
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <span class="w-2 h-2 rotate-45 bg-white block" />
                <span class="w-2 h-2 rotate-45 bg-white/70 block" />
              </div>
            </div>
          </div>
        </div>

        <!-- 2B. Lower System Overview Block (Strictly 18px below spine line) -->
        <div
          ref="descContainerRef"
          class="absolute left-[280px] top-[18px] w-[610px] pointer-events-auto"
        >
          <!-- Sub-Header: [▼] System Overview & Specification -->
          <div class="flex items-center justify-between gap-4 mb-1.5">
            <div class="flex items-center gap-2">
              <span
                class="w-4.5 h-4.5 rounded-[2px] bg-purple-950 dark:bg-secondary-950 border border-white/80 flex items-center justify-center text-[9px] text-white"
              >
                &#9660;
              </span>
              <span
                class="font-sans font-bold text-[13.5px] text-purple-950 dark:text-white tracking-wide"
              >
                System Overview &amp; Specification
              </span>
            </div>
            <span
              class="font-tech text-[11px] font-bold text-purple-900/80 dark:text-tertiary-300 uppercase tracking-wider"
            >
              STACK: {{ activeProject.techIcons.length }} TECH USED
            </span>
          </div>

          <!-- Description Paragraph (Clamped to 3 lines for 100px+ clearance) -->
          <div
            class="border-l-[3px] border-purple-700 dark:border-tertiary-400 pl-3.5 py-0.5"
          >
            <p
              class="font-sans text-[13px] text-purple-950/90 dark:text-white/95 leading-relaxed line-clamp-3"
            >
              {{ activeProjectDescription }}
            </p>
          </div>

          <!-- Action Buttons Row -->
          <div class="flex flex-wrap items-center justify-between gap-3 mt-2.5">
            <div class="flex items-center gap-2.5">
              <a
                v-if="activeProject.demoUrl"
                :href="activeProject.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 dark:bg-primary-700 dark:hover:bg-primary-600 text-white font-tech font-bold text-xs uppercase tracking-wider rounded-[6px] border border-white/40 transition-colors shadow-md cursor-pointer"
              >
                {{ activeProjectDemoLabel }} &rarr;
              </a>
              <a
                v-if="activeProject.repoUrl && activeProject.repoUrl !== '-'"
                :href="activeProject.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-3.5 py-1.5 bg-secondary-950/90 hover:bg-secondary-800 text-white border border-tertiary-400/70 font-tech font-semibold text-xs uppercase tracking-wider rounded-[6px] transition-colors cursor-pointer"
              >
                {{ viewRepoLabel }}
              </a>
            </div>

            <NuxtLink
              to="/projects"
              class="px-3 py-1 rounded-[6px] bg-purple-950/15 dark:bg-white/10 hover:bg-purple-950/25 dark:hover:bg-white/20 text-purple-950 dark:text-tertiary-300 dark:hover:text-white font-tech text-xs font-bold uppercase tracking-wider transition-colors"
            >
              ALL ({{ totalProjects }}) &rarr;
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- ZONE 3: 100% CONCENTRIC CIRCULAR HUB & ROTATING WHEEL DIAL (z-30) -->
      <!-- Outer Circle, Mechanical Wheel Rings, Orbiting Project Nodes, and -->
      <!-- Inner Preview Image all share the exact center (215, 605)!        -->
      <!-- ================================================================= -->
      <div
        class="absolute left-0 top-0 w-[520px] h-[900px] z-30 pointer-events-none"
      >
        <!-- Single Concentric Flex Parent Centered at (215, 605) -->
        <div
          class="absolute left-[215px] top-[605px] w-[410px] h-[410px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <!-- 3A. Orbiting Project Selector Wheel Track (r = 234px, 468x468 concentric ring) -->
          <div
            class="absolute left-1/2 top-1/2 w-[468px] h-[468px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-purple-500/45 dark:border-tertiary-400/45 pointer-events-none"
          >
            <button
              v-for="node in orbitingProjectNodes"
              :key="'orbit-proj-' + node.projIdx"
              type="button"
              class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full font-tech font-extrabold transition-all duration-300 flex items-center justify-center pointer-events-auto cursor-pointer"
              :class="
                node.isActive
                  ? 'w-[34px] h-[34px] text-[11px] bg-purple-600 dark:bg-primary-700 text-white border-2 border-white shadow-[0_0_16px_rgba(26,133,255,0.9)] z-20 scale-110'
                  : 'w-[26px] h-[26px] text-[10px] bg-purple-950 dark:bg-secondary-950 text-purple-200 dark:text-tertiary-300 border border-purple-400 dark:border-tertiary-400 hover:scale-110 hover:border-white'
              "
              :style="{
                left: `calc(50% + ${node.x}px)`,
                top: `calc(50% + ${node.y}px)`,
                opacity: node.opacity,
              }"
              :title="`Project ${node.label}`"
              @click="$emit('select', node.projIdx)"
            >
              {{ node.label }}
            </button>
          </div>

          <!-- 3B. Outer Hub Base Circle (410x410px, 100% concentric) -->
          <div
            class="absolute inset-0 rounded-full bg-purple-100 dark:bg-secondary-900 border-2 border-purple-500/75 dark:border-tertiary-500/75 shadow-2xl transition-colors duration-500"
          />

          <!-- 3C. High-Contrast Rotating Mechanical Caliper & Degree Dial SVG (410x410px) -->
          <svg
            viewBox="-205 -205 410 410"
            class="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          >
            <!-- Static Cardinal Crosshairs on Outer Rim -->
            <g
              class="stroke-purple-600 dark:stroke-tertiary-400"
              stroke-width="2"
            >
              <line x1="-198" y1="0" x2="-182" y2="0" />
              <line x1="182" y1="0" x2="198" y2="0" />
              <line x1="0" y1="-198" x2="0" y2="-182" />
              <line x1="0" y1="182" x2="0" y2="198" />
            </g>

            <!-- Clockwise Rotating Degree Ring (r = 184 & r = 176) -->
            <g :transform="`rotate(${wheelAngle})`">
              <circle
                cx="0"
                cy="0"
                r="184"
                fill="none"
                class="stroke-purple-500/40 dark:stroke-tertiary-400/40"
                stroke-width="1.5"
              />
              <circle
                cx="0"
                cy="0"
                r="176"
                fill="none"
                class="stroke-purple-600 dark:stroke-tertiary-400"
                stroke-opacity="0.85"
                stroke-width="3.5"
                stroke-dasharray="55 35 18 35"
              />
              <!-- 12 Degree Ticks around r=184 -->
              <g
                class="stroke-purple-700 dark:stroke-tertiary-300"
                stroke-width="2"
              >
                <line
                  v-for="tick in 12"
                  :key="'hub-tick-' + tick"
                  x1="166"
                  y1="0"
                  x2="192"
                  y2="0"
                  :transform="`rotate(${(tick - 1) * 30})`"
                />
              </g>
            </g>

            <!-- Counter-Clockwise Rotating Inner Caliper Ring (r = 158) -->
            <g :transform="`rotate(${-wheelAngle * 0.85})`">
              <circle
                cx="0"
                cy="0"
                r="158"
                fill="none"
                class="stroke-purple-800/70 dark:stroke-white/70"
                stroke-width="2"
                stroke-dasharray="28 18 6 18"
              />
              <polygon
                points="0,-165 -6,-153 6,-153"
                class="fill-purple-600 dark:fill-tertiary-400"
              />
              <polygon
                points="0,165 -6,153 6,153"
                class="fill-purple-600 dark:fill-tertiary-400"
              />
              <polygon
                points="-165,0 -153,-6 -153,6"
                class="fill-purple-600 dark:fill-tertiary-400"
              />
              <polygon
                points="165,0 153,-6 153,6"
                class="fill-purple-600 dark:fill-tertiary-400"
              />
            </g>
          </svg>

          <!-- 3D. Inner Circular Project Preview Screenshot Lens (288x288px, 100% dead-center!) -->
          <div
            ref="previewLensRef"
            class="relative w-[288px] h-[288px] rounded-full cursor-pointer group pointer-events-auto"
            @click="showPreviewInHub = !showPreviewInHub"
          >
            <div
              class="relative w-full h-full rounded-full overflow-hidden bg-purple-950 dark:bg-secondary-950 border-[3px] border-white dark:border-tertiary-400 shadow-[0_0_25px_rgba(71,179,255,0.35)] flex items-center justify-center"
            >
              <template v-if="showPreviewInHub">
                <img
                  :src="activeProject.previewImage"
                  :alt="activeProjectTitle"
                  class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  class="absolute inset-x-0 bottom-0 h-9.5 bg-secondary-950/90 backdrop-blur-xs border-t border-tertiary-400/50 flex flex-col items-center justify-center"
                >
                  <span
                    class="font-tech font-bold text-[10px] tracking-[2px] text-white uppercase"
                  >
                    PREVIEW // {{ formattedActiveIndex }}
                  </span>
                </div>
              </template>

              <template v-else>
                <div class="flex flex-col items-center justify-center p-6">
                  <div
                    class="w-20 h-20 rounded-full bg-white p-3.5 flex items-center justify-center shadow-lg"
                  >
                    <img
                      v-if="activeProject.techIcons[selectedTechIndex]?.iconUrl"
                      :src="activeProject.techIcons[selectedTechIndex]?.iconUrl"
                      :alt="activeTechName"
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <span
                    class="font-tech font-extrabold text-xs tracking-[2px] text-white uppercase mt-3"
                  >
                    {{ activeTechName }}
                  </span>
                  <span
                    class="font-tech text-[9px] tracking-[1.5px] text-tertiary-400 uppercase mt-0.5"
                  >
                    CLICK FOR SCREENSHOT
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- 3E. Endfield-Style Readout (Project 07/11 & TECH NODES 05/05) -->
        <div
          class="absolute left-[415px] top-[675px] flex flex-col gap-2 pointer-events-auto"
        >
          <div>
            <div class="grid grid-cols-3 gap-1 w-4 mb-1 opacity-70">
              <span
                v-for="d in 6"
                :key="d"
                class="w-1 h-1 rounded-full bg-purple-700 dark:bg-tertiary-400"
              />
            </div>
            <div
              class="font-sans font-semibold text-[11px] text-purple-800 dark:text-tertiary-300 leading-none"
            >
              Project
            </div>
            <div
              class="font-tech font-extrabold text-2xl text-foreground dark:text-white leading-tight mt-0.5"
            >
              {{ formattedActiveIndex
              }}<span class="text-sm opacity-60">/{{ formattedTotal }}</span>
            </div>
            <div
              class="text-[9px] text-purple-700 dark:text-tertiary-400 tracking-[2.5px] leading-none"
            >
              &#9670;&#9670;&#9670;&#9670;
            </div>
          </div>

          <div
            class="pt-1.5 border-t border-purple-400/40 dark:border-tertiary-400/30"
          >
            <div
              class="font-tech font-bold text-[9px] tracking-[1.5px] text-purple-800 dark:text-tertiary-400 uppercase"
            >
              TECH NODES
            </div>
            <div
              class="font-tech font-extrabold text-[22px] text-foreground dark:text-white leading-none mt-0.5"
            >
              {{ String(bottomTechNodes.length).padStart(2, "0")
              }}<span class="text-xs opacity-60"
                >/{{
                  String(activeProject.techIcons.length).padStart(2, "0")
                }}</span
              >
            </div>
          </div>
        </div>

        <!-- 3F. Bottom-Left Prev & Rotate Next Pill Buttons (Centered at x=215px, top:778px) -->
        <div
          class="absolute left-[215px] top-[778px] -translate-x-1/2 flex items-center gap-2.5 pointer-events-auto z-40 whitespace-nowrap"
        >
          <button
            type="button"
            class="w-10.5 h-10.5 rounded-full bg-white text-secondary-950 border-2 border-purple-700 dark:border-secondary-950 shadow-xl flex items-center justify-center hover:bg-tertiary-200 transition-transform active:scale-95 cursor-pointer shrink-0"
            aria-label="Previous project"
            @click="$emit('prev')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            class="h-10.5 px-4 rounded-full bg-white text-secondary-950 border-2 border-purple-700 dark:border-secondary-950 shadow-xl flex items-center gap-2.5 hover:bg-tertiary-200 transition-transform active:scale-95 cursor-pointer"
            @click="$emit('next')"
          >
            <span class="w-4.5 h-[2px] bg-secondary-950/35" />
            <span class="font-sans font-bold text-[13.5px] tracking-tight">
              Rotate Next
            </span>
            <span
              class="w-5.5 h-5.5 rounded-full bg-secondary-950 text-white flex items-center justify-center text-[9px] font-bold"
            >
              &#9650;
            </span>
          </button>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- ZONE 4: DE-SLOPPED BOTTOM TECH-STACK BAR — STYLE B (z-20)         -->
      <!-- ================================================================= -->
      <div
        ref="techBarRef"
        class="absolute left-[515px] right-[80px] max-w-[1280px] bottom-16 z-20 origin-left rotate-[1.4deg] pointer-events-auto bg-purple-300 dark:bg-primary-500 px-10 py-4 border rounded-xl"
      >
        <!-- Subtle Track Header Telemetry with Live Wheel Angle -->
        <div
          class="mb-2 flex items-center justify-between pr-2 font-tech text-[10.5px] font-bold tracking-[2px] text-purple-900 dark:text-tertiary-300 uppercase"
        >
          <span>
            TECH STACK // {{ activeTechName }} &bull; WHEEL ANGLE
            {{ displayWheelDegrees }}&deg;
          </span>
          <span class="opacity-75">CLICK NODE TO INSPECT</span>
        </div>

        <!-- Main Endfield Node Track Container -->
        <div class="relative w-full">
          <!-- Tech Nodes Row (Single-Ring Endfield Circles + Floating Active Label) -->
          <div class="relative z-10 flex items-center justify-between">
            <button
              v-for="node in bottomTechNodes"
              :key="'tech-node-' + node.index + '-' + node.name"
              type="button"
              class="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              @click="selectedTechIndex = node.index"
            >
              <!-- Single-Ring Circular Tech Icon Badge -->
              <div
                class="relative w-12.5 h-12.5 rounded-full bg-white p-2.5 flex items-center justify-center transition-all duration-300"
                :class="
                  node.isSelected
                    ? 'scale-115 -translate-y-1.5 ring-2 ring-purple-600 dark:ring-tertiary-300 ring-offset-2 ring-offset-purple-200 dark:ring-offset-secondary-800 shadow-[0_0_20px_rgba(71,179,255,0.6)]'
                    : 'border-2 border-purple-500/70 dark:border-tertiary-400/70 opacity-90 group-hover:opacity-100 group-hover:scale-105 group-hover:-translate-y-0.5 shadow-md'
                "
              >
                <img
                  v-if="node.iconUrl"
                  :src="node.iconUrl"
                  :alt="node.name"
                  class="w-full h-full object-contain"
                />
                <span
                  v-else
                  class="font-tech font-extrabold text-[10px] text-secondary-950"
                >
                  {{ node.name.slice(0, 3).toUpperCase() }}
                </span>

                <!-- Small Endfield Corner Rank Dots -->
                <span
                  class="absolute -right-1 -bottom-0.5 flex items-center gap-[1.5px] pointer-events-none"
                >
                  <span
                    v-for="dot in (node.index % 3) + 1"
                    :key="dot"
                    class="w-1.5 h-1.5 rotate-45 border border-secondary-950"
                    :class="
                      node.isSelected
                        ? 'bg-purple-600 dark:bg-tertiary-300'
                        : 'bg-white/90'
                    "
                  />
                </span>
              </div>

              <!-- Style B: Clean Floating Label (No Boxy Border, Active/Hover Only) -->
              <span
                class="absolute -bottom-5 font-tech font-extrabold text-[10px] tracking-wider uppercase whitespace-nowrap transition-all duration-200 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
                :class="
                  node.isSelected
                    ? 'opacity-100 translate-y-0 text-purple-950 dark:text-tertiary-300'
                    : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 text-purple-900 dark:text-white'
                "
              >
                {{ node.name }}
              </span>
            </button>
          </div>

          <!-- Solid Glowing Endfield Bottom Bar -->
          <!-- <div
            class="mt-6 w-full h-2.5 rounded-full bg-purple-600 dark:bg-tertiary-400 shadow-[0_0_18px_rgba(71,179,255,0.5)] transition-colors duration-500"
          /> -->
        </div>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- TOP-LEFT & TOP-RIGHT MINIMAL HUD OVERLAYS (Pinned below 52px NavBar)-->
    <!-- =================================================================== -->
    <div
      class="absolute left-6 lg:left-8 top-14 lg:top-16 z-40 flex items-center gap-3.5 pointer-events-auto"
    >
      <!-- TODO : CHANGE THIS ICON TO OUR USUAL BAR WITH A CERTAIN COLOR -->
      <div
        class="w-8 h-8 bg-purple-700 dark:bg-secondary-900 border-2 border-purple-500 dark:border-tertiary-400 flex items-center justify-center rotate-45 shrink-0 shadow-md"
      >
        <div class="w-3 h-3 bg-white dark:bg-tertiary-400" />
      </div>
      <div class="pl-1">
        <div
          class="font-tech text-[10px] font-extrabold tracking-widest uppercase text-purple-700 dark:text-tertiary-400"
        >
          {{ projectLabel }} // {{ formattedActiveIndex }} OF
          {{ formattedTotal }}
        </div>
        <h2
          class="font-sans font-bold text-base lg:text-xl text-foreground dark:text-white tracking-tight leading-tight uppercase"
        >
          {{ activeProjectTitle }}
          <span
            class="text-foreground/60 dark:text-white/60 font-medium text-sm lg:text-base"
          >
            / {{ sectionTitle }} Matrix
          </span>
        </h2>
      </div>
    </div>

    <NuxtLink
      to="/projects"
      class="absolute right-6 lg:right-8 top-14 lg:top-16 z-40 px-4 py-1.5 rounded-full bg-purple-950/80 dark:bg-secondary-900/90 hover:bg-purple-700 dark:hover:bg-primary-700 text-white border border-purple-400/50 dark:border-tertiary-400/60 font-tech font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
    >
      To Project &rarr;
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import type { ProjectItem } from "./projectsData";

const props = withDefaults(
  defineProps<{
    activeProject: ProjectItem;
    activeIndex: number;
    totalProjects: number;
    scrollProgress?: number;
    activeProjectTitle: string;
    activeProjectSubtitle: string;
    activeProjectDescription: string;
    activeProjectDemoLabel: string;
    projectLabel: string;
    sectionTitle: string;
    viewRepoLabel: string;
  }>(),
  {
    scrollProgress: undefined,
  },
);

defineEmits<{
  (e: "next"): void;
  (e: "prev"): void;
  (e: "select", index: number): void;
}>();

const MAX_TECH_NODES = 10;

const spineArmRef = ref<HTMLElement | null>(null);
const descContainerRef = ref<HTMLElement | null>(null);
const previewLensRef = ref<HTMLElement | null>(null);
const techBarRef = ref<HTMLElement | null>(null);

const selectedTechIndex = ref(0);
const showPreviewInHub = ref(true);
const barFillProgress = ref(1);

// Smoothly animated wheel index (0 .. totalProjects-1) driven by either continuous scrollProgress or activeIndex
const animatedWheelIndex = ref(0);

const stageScale = ref(1);
const stageWidth = ref(1600);
const fanDiameter = computed(() =>
  Math.max(2480, Math.round(stageWidth.value * 1.48)),
);

const formattedActiveIndex = computed(() =>
  String(props.activeIndex + 1).padStart(2, "0"),
);
const formattedTotal = computed(() =>
  String(props.totalProjects).padStart(2, "0"),
);

// Continuous wheel rotation angle in degrees (36deg per project step)
const wheelAngle = computed(() => {
  return -(animatedWheelIndex.value * 36);
});

const displayWheelDegrees = computed(() => {
  return Math.round(Math.abs(wheelAngle.value)) % 360;
});

// Orbiting project dial nodes along r = 234px around the Hub Center (215, 605)
// Rotates smoothly with animatedWheelIndex so the active project aligns at -30deg!
const orbitingProjectNodes = computed(() => {
  const total = Math.max(1, props.totalProjects);
  const rOrbit = 234;
  const currentPos = animatedWheelIndex.value;
  const nodes: {
    projIdx: number;
    label: string;
    x: number;
    y: number;
    isActive: boolean;
    opacity: number;
  }[] = [];

  for (let i = 0; i < total; i++) {
    let diff = i - currentPos;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Show nodes in the upper-right arc (-3.3 <= diff <= +1.3) so they never overlap bottom-right telemetry
    if (diff < -3.3 || diff > 1.3) continue;

    const angleDeg = -30 + diff * 22;
    const rad = (angleDeg * Math.PI) / 180;
    const x = Math.round(rOrbit * Math.cos(rad) * 10) / 10;
    const y = Math.round(rOrbit * Math.sin(rad) * 10) / 10;
    const isActive = i === props.activeIndex;
    const opacity = isActive
      ? 1
      : Math.max(0.25, Math.min(0.9, 0.92 - Math.abs(diff) * 0.2));

    nodes.push({
      projIdx: i,
      label: String(i + 1).padStart(2, "0"),
      x,
      y,
      isActive,
      opacity,
    });
  }

  return nodes;
});

const activeTechName = computed(() => {
  const icons = props.activeProject.techIcons || [];
  const chosen = icons[selectedTechIndex.value] || icons[0];
  return chosen ? chosen.name : "CORE SYSTEM";
});

const bottomTechNodes = computed(() => {
  const icons = (props.activeProject.techIcons || []).slice(0, MAX_TECH_NODES);
  return icons.map((tech, idx) => ({
    index: idx,
    name: tech.name,
    iconUrl: tech.iconUrl || "",
    isSelected: selectedTechIndex.value === idx,
  }));
});

function updateStageMetrics() {
  if (typeof window === "undefined") return;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = Math.min(vh / 900, vw / 1280);
  stageScale.value = scale;
  stageWidth.value = Math.round(vw / scale);
}

// Drive continuous wheel rotation whenever scrollProgress updates on scroll
watch(
  () => props.scrollProgress,
  (prog) => {
    if (typeof prog === "number" && !Number.isNaN(prog)) {
      const targetIdx = prog * Math.max(1, props.totalProjects - 1);
      gsap.to(animatedWheelIndex, {
        value: targetIdx,
        duration: 0.18,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
  },
);

// Wheel-spoke rotational swing & dial tween when activeIndex changes
watch(
  () => props.activeIndex,
  (nextIdx, prevIdx) => {
    selectedTechIndex.value = 0;

    // Determine shortest rotational direction (+1 = next, -1 = prev)
    const oldIdx = prevIdx ?? 0;
    let delta = nextIdx - oldIdx;
    if (delta > props.totalProjects / 2) delta -= props.totalProjects;
    if (delta < -props.totalProjects / 2) delta += props.totalProjects;
    const dir = delta >= 0 ? 1 : -1;

    // Tween wheel index smoothly if scrollProgress isn't actively scrubbing
    gsap.to(animatedWheelIndex, {
      value: nextIdx,
      duration: 0.65,
      ease: "power3.out",
      overwrite: "auto",
    });

    // 1. Swing the -30deg Diagonal Spine Arm around the (215, 605) Hub Pivot like a wheel spoke!
    if (spineArmRef.value) {
      gsap.fromTo(
        spineArmRef.value,
        { rotation: -30 + dir * 10, opacity: 0.35 },
        {
          rotation: -30,
          opacity: 1,
          duration: 0.52,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
    }

    // 2. Rotate & focus the centered Circular Preview Image Lens
    if (previewLensRef.value) {
      gsap.fromTo(
        previewLensRef.value,
        { rotation: dir * 24, scale: 0.9, opacity: 0.35 },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: "back.out(1.4)",
          overwrite: "auto",
        },
      );
    }

    // 3. Sweep the Bottom Tech-Stack Bar along the lower wheel arc
    if (techBarRef.value) {
      gsap.fromTo(
        techBarRef.value,
        { rotation: 1.4 + dir * 5, x: dir * 26, opacity: 0.35 },
        {
          rotation: 1.4,
          x: 0,
          opacity: 1,
          duration: 0.48,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
    }

    barFillProgress.value = 0.15;
    gsap.to(barFillProgress, {
      value: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  },
);

onMounted(() => {
  animatedWheelIndex.value = props.activeIndex;
  updateStageMetrics();
  window.addEventListener("resize", updateStageMetrics, { passive: true });
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateStageMetrics);
  }
});
</script>
