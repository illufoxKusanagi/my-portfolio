<template>
  <section
    id="projects"
    ref="sectionRef"
    class="relative w-full h-screen bg-purple-100 dark:bg-secondary-950 transition-colors duration-500 overflow-hidden font-sans select-none"
  >
    <!-- ======================================================================= -->
    <!-- DESKTOP / TABLET ENDFIELD ABILITY MATRIX STAGE (1600x900 Polar ViewBox) -->
    <!-- ======================================================================= -->
    <div class="hidden md:block relative w-full h-full overflow-hidden">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        class="w-full h-full block"
      >
        <!-- 1. TOP-LEFT SOLID DIAGONAL WEDGE (Above the -35deg Telemetry Band) -->
        <polygon
          points="165,0 935,0 308,404"
          class="fill-purple-300 dark:fill-primary-700 transition-colors duration-500"
        />

        <!-- 2. UPPER -35deg DIAGONAL TELEMETRY BAND ("Combat" -> "Core Stack") -->
        <polygon
          points="445,600 1305,-2 1168,-198 308,404"
          class="fill-purple-600 dark:fill-primary-800 transition-colors duration-500"
        />
        <!-- Stage Divider Tick Lines inside the -35deg Band -->
        <line
          x1="652"
          y1="455"
          x2="515"
          y2="259"
          stroke="#ffffff"
          stroke-opacity="0.22"
          stroke-width="1.5"
        />
        <line
          x1="860"
          y1="309"
          x2="723"
          y2="113"
          stroke="#ffffff"
          stroke-opacity="0.22"
          stroke-width="1.5"
        />
        <line
          x1="1068"
          y1="164"
          x2="931"
          y2="-32"
          stroke="#ffffff"
          stroke-opacity="0.22"
          stroke-width="1.5"
        />

        <!-- 3. MAIN SWEEPING POLAR FAN ("Talent Nodes" -> "System & Tech Nodes") -->
        <!-- Outer Rim Band (R = 1210 to 1360) centered at Pivot (210, 765) -->
        <path
          d="M 210 765 L 1324 -15 A 1360 1360 0 0 1 1558 955 Z"
          class="fill-purple-500 dark:fill-secondary-800 transition-colors duration-500"
        />
        <!-- Inner Main Polar Fan Sector (R = 295 to 1210) -->
        <path
          d="M 210 765 L 1201 71 A 1210 1210 0 0 1 1408 934 Z"
          class="fill-purple-200 dark:fill-secondary-700 transition-colors duration-500"
        />

        <!-- Concentric Polar Arcs centered at Pivot (210, 765) -->
        <circle
          cx="210"
          cy="765"
          r="450"
          fill="none"
          class="stroke-purple-600/30 dark:stroke-tertiary-700/35"
          stroke-width="1.5"
        />
        <circle
          cx="210"
          cy="765"
          r="630"
          fill="none"
          class="stroke-purple-600/30 dark:stroke-tertiary-700/35"
          stroke-width="1.5"
        />
        <circle
          cx="210"
          cy="765"
          r="810"
          fill="none"
          class="stroke-purple-600/30 dark:stroke-tertiary-700/35"
          stroke-width="1.5"
        />
        <circle
          cx="210"
          cy="765"
          r="990"
          fill="none"
          class="stroke-purple-600/30 dark:stroke-tertiary-700/35"
          stroke-width="1.5"
        />
        <circle
          cx="210"
          cy="765"
          r="1210"
          fill="none"
          class="stroke-purple-600/50 dark:stroke-tertiary-400/55"
          stroke-width="2"
        />
        <circle
          cx="210"
          cy="765"
          r="1360"
          fill="none"
          class="stroke-purple-700/60 dark:stroke-tertiary-700/75"
          stroke-width="2.5"
        />

        <!-- Radial Spoke Lines from Pivot (210, 765) -->
        <line
          x1="210"
          y1="765"
          x2="1324"
          y2="-15"
          class="stroke-purple-700/50 dark:stroke-tertiary-400/50"
          stroke-width="2"
        />
        <line
          x1="210"
          y1="765"
          x2="1442"
          y2="195"
          class="stroke-purple-600/25 dark:stroke-tertiary-700/30"
          stroke-width="1.2"
        />
        <line
          x1="210"
          y1="765"
          x2="1520"
          y2="415"
          class="stroke-purple-600/25 dark:stroke-tertiary-700/30"
          stroke-width="1.2"
        />
        <line
          x1="210"
          y1="765"
          x2="1560"
          y2="650"
          class="stroke-purple-600/25 dark:stroke-tertiary-700/30"
          stroke-width="1.2"
        />

        <!-- ROTATING POLAR DEGREE WHEEL (Rotates around Pivot 210, 765 on Scroll / Click) -->
        <g
          :transform="`translate(210, 765) rotate(${wheelRotation})`"
          class="transition-transform duration-700 ease-out"
        >
          <circle
            cx="0"
            cy="0"
            r="442"
            fill="none"
            class="stroke-purple-700/40 dark:stroke-tertiary-400/45"
            stroke-width="2"
            stroke-dasharray="14 22 4 22"
          />
          <circle
            cx="0"
            cy="0"
            r="802"
            fill="none"
            class="stroke-purple-700/35 dark:stroke-tertiary-400/35"
            stroke-width="2"
            stroke-dasharray="28 36 6 36"
          />
          <circle
            cx="0"
            cy="0"
            r="1200"
            fill="none"
            class="stroke-purple-700/45 dark:stroke-tertiary-400/50"
            stroke-width="2.5"
            stroke-dasharray="40 28 8 28"
          />
          <!-- Radial degree ticks along R=450 & R=1210 -->
          <g
            v-for="deg in 24"
            :key="'tick-' + deg"
            :transform="`rotate(${deg * 15})`"
          >
            <line
              x1="440"
              y1="0"
              x2="460"
              y2="0"
              class="stroke-purple-700/45 dark:stroke-tertiary-300/50"
              stroke-width="1.5"
            />
            <line
              x1="1198"
              y1="0"
              x2="1222"
              y2="0"
              class="stroke-purple-700/45 dark:stroke-tertiary-300/50"
              stroke-width="2"
            />
          </g>
        </g>

        <!-- 4. ROTATING POLAR TECH NODE CONSTELLATION (Pivots around 210, 765 on Project Switch) -->
        <g ref="fanNodesGroupRef">
          <!-- White Connector Lines between Polar Tech Nodes (Matching 1000338858.jpg) -->
          <line
            x1="695"
            y1="520"
            x2="885"
            y2="425"
            stroke="#ffffff"
            stroke-width="3"
          />
          <line
            x1="825"
            y1="565"
            x2="1035"
            y2="500"
            stroke="#ffffff"
            stroke-width="3"
          />
          <line
            x1="745"
            y1="650"
            x2="1070"
            y2="600"
            stroke="#ffffff"
            stroke-width="3"
          />
          <line
            x1="945"
            y1="685"
            x2="1285"
            y2="652"
            stroke="#ffffff"
            stroke-width="3"
          />

          <!-- Upper-Edge Arc Circular Tech Nodes (Along the -35deg boundary) -->
          <g
            v-for="(node, nIdx) in polarArcNodes"
            :key="'arc-node-' + nIdx"
            :transform="`translate(${node.x}, ${node.y})`"
            class="cursor-pointer"
            @click="selectedTechIndex = nIdx"
          >
            <circle
              cx="0"
              cy="0"
              r="24"
              :class="
                selectedTechIndex === nIdx
                  ? 'fill-tertiary-700 stroke-white'
                  : 'fill-purple-600 dark:fill-primary-700 stroke-white'
              "
              stroke-width="2.5"
            />
            <image
              v-if="node.tech?.iconUrl"
              :href="node.tech.iconUrl"
              x="-13"
              y="-13"
              width="26"
              height="26"
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              v-else
              x="0"
              y="4"
              text-anchor="middle"
              fill="#ffffff"
              font-family="Oxanium, monospace"
              font-weight="800"
              font-size="11"
            >
              {{ node.shortLabel }}
            </text>
            <!-- Rank pips matching screenshot (••) -->
            <g v-if="node.pips > 0" transform="translate(22, 16)">
              <polygon
                v-for="p in node.pips"
                :key="p"
                :points="`${(p - 1) * 7},0 ${(p - 1) * 7 + 4},0 ${(p - 1) * 7 + 2},6 ${(p - 1) * 7 - 2},6`"
                fill="#ffffff"
              />
            </g>
          </g>

          <!-- Square Beta / Gamma Module Nodes (Matching [β] and [γ] in 1000338858.jpg) -->
          <g
            v-for="(sq, sIdx) in squareModuleNodes"
            :key="'sq-node-' + sIdx"
            :transform="`translate(${sq.x}, ${sq.y})`"
          >
            <rect
              x="-21"
              y="-21"
              width="42"
              height="42"
              rx="4"
              class="fill-purple-800 dark:fill-secondary-950 stroke-white dark:stroke-tertiary-400"
              stroke-width="2.5"
            />
            <image
              v-if="sq.tech?.iconUrl"
              :href="sq.tech.iconUrl"
              x="-12"
              y="-12"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              v-else
              x="0"
              y="5"
              text-anchor="middle"
              fill="#ffffff"
              font-family="Oxanium, monospace"
              font-weight="800"
              font-size="12"
            >
              {{ sq.symbol }}
            </text>
            <text
              x="28"
              y="18"
              fill="#ffffff"
              font-family="Oxanium, monospace"
              font-weight="800"
              font-size="14"
            >
              {{ sq.greek }}
            </text>
          </g>
        </g>

        <!-- 5. BOTTOM TRACK BAND & SOLID HIGHLIGHT BAR (Matching the bottom bar in 1000338858.jpg) -->
        <polygon
          points="475,712 1600,772 1600,838 475,772"
          class="fill-purple-900/55 dark:fill-secondary-950/75"
        />
        <polygon
          points="440,766 1395,820 1395,836 440,782"
          class="fill-purple-600 dark:fill-tertiary-700 transition-colors duration-500"
        />

        <!-- 6. BOTTOM-LEFT CIRCULAR HUB (Cx = 210, Cy = 765, R = 295) -->
        <circle
          cx="210"
          cy="765"
          r="295"
          class="fill-purple-100 dark:fill-secondary-900 stroke-purple-600 dark:stroke-tertiary-700 transition-colors duration-500"
          stroke-width="2.5"
        />
        <circle
          cx="210"
          cy="765"
          r="250"
          fill="none"
          class="stroke-purple-600/30 dark:stroke-primary-400/30"
          stroke-width="1.5"
        />
        <!-- Technical 6-dot matrix (:::) & caliper line inside Hub -->
        <g class="fill-purple-700/60 dark:fill-primary-300/60">
          <circle cx="420" cy="642" r="2.5" />
          <circle cx="429" cy="642" r="2.5" />
          <circle cx="438" cy="642" r="2.5" />
          <circle cx="420" cy="650" r="2.5" />
          <circle cx="429" cy="650" r="2.5" />
          <circle cx="438" cy="650" r="2.5" />
        </g>
        <line
          x1="365"
          y1="535"
          x2="480"
          y2="705"
          class="stroke-purple-600/35 dark:stroke-primary-400/35"
          stroke-width="1.5"
        />

        <!-- 7. REPLACING THE CHARACTER: MULTI-RING ROTATING ICON / CIRCLE CORE AT (195, 575) -->
        <g
          transform="translate(195, 575)"
          class="cursor-pointer"
          @click="showPreviewInHub = !showPreviewInHub"
        >
          <!-- Outer Counter-Rotating Caliper Ring -->
          <g
            :transform="`rotate(${-wheelRotation * 1.25})`"
            class="transition-transform duration-700 ease-out"
          >
            <circle
              cx="0"
              cy="0"
              r="134"
              class="fill-purple-200/90 dark:fill-secondary-950/95 stroke-purple-600 dark:stroke-tertiary-700"
              stroke-width="2.5"
            />
            <circle
              cx="0"
              cy="0"
              r="118"
              fill="none"
              class="stroke-purple-600 dark:stroke-primary-500"
              stroke-width="2"
              stroke-dasharray="22 10 4 10"
            />
            <!-- 4 Cardinal Caliper Notches -->
            <line
              x1="-144"
              y1="0"
              x2="-106"
              y2="0"
              class="stroke-purple-700 dark:stroke-tertiary-400"
              stroke-width="3"
            />
            <line
              x1="106"
              y1="0"
              x2="144"
              y2="0"
              class="stroke-purple-700 dark:stroke-tertiary-400"
              stroke-width="3"
            />
            <line
              x1="0"
              y1="-144"
              x2="0"
              y2="-106"
              class="stroke-purple-700 dark:stroke-tertiary-400"
              stroke-width="3"
            />
            <line
              x1="0"
              y1="106"
              x2="0"
              y2="144"
              class="stroke-purple-700 dark:stroke-tertiary-400"
              stroke-width="3"
            />
          </g>

          <!-- Middle Clockwise Segmented Rotor Ring -->
          <g
            :transform="`rotate(${wheelRotation * 1.6})`"
            class="transition-transform duration-700 ease-out"
          >
            <circle
              cx="0"
              cy="0"
              r="98"
              fill="none"
              class="stroke-purple-500 dark:stroke-tertiary-400"
              stroke-width="2"
              stroke-dasharray="8 8"
            />
            <polygon
              points="0,-104 6,-92 -6,-92"
              class="fill-purple-700 dark:fill-tertiary-400"
            />
            <polygon
              points="0,104 6,92 -6,92"
              class="fill-purple-700 dark:fill-tertiary-400"
            />
          </g>

          <!-- Inner Solid Emblem Circle -->
          <clipPath id="hubCoreClip">
            <circle cx="0" cy="0" r="76" />
          </clipPath>
          <circle
            cx="0"
            cy="0"
            r="80"
            class="fill-purple-600 dark:fill-secondary-800 stroke-white dark:stroke-tertiary-400"
            stroke-width="3.5"
          />

          <!-- Toggleable Circular Project Screenshot Lens OR Crisp Tech Emblem Icon -->
          <g v-if="showPreviewInHub" clip-path="url(#hubCoreClip)">
            <image
              :href="activeProject.previewImage"
              x="-80"
              y="-80"
              width="160"
              height="160"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
          <g v-else>
            <!-- Geometric Hexagon Frame inside the Circle -->
            <polygon
              points="0,-52 45,-26 45,26 0,52 -45,26 -45,-26"
              fill="none"
              stroke="#ffffff"
              stroke-opacity="0.4"
              stroke-width="2"
            />
            <image
              v-if="activeProject.techIcons[0]?.iconUrl"
              :href="activeProject.techIcons[0].iconUrl"
              x="-34"
              y="-38"
              width="68"
              height="68"
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              x="0"
              y="48"
              text-anchor="middle"
              fill="#ffffff"
              font-family="Oxanium, monospace"
              font-weight="800"
              font-size="12"
              letter-spacing="2"
            >
              CORE // {{ formattedActiveIndex }}
            </text>
          </g>
        </g>

        <!-- 8. UPPER -35deg DIAGONAL BAND CONTENT ("Core Stack" & 4 White Progress Bars) -->
        <g transform="translate(210, 765) rotate(-35)">
          <!-- Section Header Box: [X] Core Stack (Matches [X] Combat in screenshot) -->
          <g transform="translate(285, -212)">
            <rect
              x="0"
              y="-16"
              width="20"
              height="20"
              rx="2"
              class="fill-purple-900 dark:fill-secondary-950 stroke-white"
              stroke-width="1.5"
            />
            <path
              d="M5,-11 L15,-1 M15,-11 L5,-1"
              stroke="#ffffff"
              stroke-width="2"
            />
            <text
              x="28"
              y="0"
              fill="#ffffff"
              font-family="Poppins, sans-serif"
              font-weight="700"
              font-size="16"
            >
              {{ $t("projects.title") }} // Core Stack
            </text>
          </g>

          <!-- 4 Parallel White Telemetry Track Bars (Populated from activeProject.techIcons) -->
          <g
            v-for="(bar, bIdx) in diagonalBars"
            :key="'diag-bar-' + bIdx"
            :transform="`translate(295, ${-172 + bIdx * 43})`"
          >
            <!-- Double-Ring Circular Tech Icon Badge -->
            <circle
              cx="18"
              cy="0"
              r="20"
              fill="none"
              stroke="#ffffff"
              stroke-opacity="0.5"
              stroke-width="1.5"
            />
            <circle
              cx="18"
              cy="0"
              r="16"
              class="fill-purple-700 dark:fill-secondary-900 stroke-white"
              stroke-width="2"
            />
            <image
              v-if="bar.iconUrl"
              :href="bar.iconUrl"
              x="7"
              y="-11"
              width="22"
              height="22"
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              v-else
              x="18"
              y="4"
              text-anchor="middle"
              fill="#ffffff"
              font-family="Oxanium, monospace"
              font-weight="800"
              font-size="10"
            >
              {{ bar.short }}
            </text>

            <!-- Rank / Tech Label above the Bar -->
            <text
              x="48"
              y="-6"
              fill="#ffffff"
              font-family="Oxanium, monospace"
              font-weight="700"
              font-size="13"
              letter-spacing="1"
            >
              {{ bar.label }}
              <tspan font-size="10" fill-opacity="0.8">9/9</tspan>
            </text>

            <!-- White Track Background -->
            <rect
              x="48"
              y="1"
              width="580"
              height="9"
              fill="#ffffff"
              fill-opacity="0.24"
            />
            <!-- Animated Solid White Bar Fill -->
            <rect
              x="48"
              y="1"
              :width="580 * barFillProgress"
              height="9"
              fill="#ffffff"
            />

            <!-- 3-Diamond Cluster Icon at Right Tip (Matches 1000338858.jpg) -->
            <g transform="translate(644, 5)" fill="#ffffff">
              <polygon points="0,-8 5,-3 0,2 -5,-3" />
              <polygon points="-6,0 -1,5 -6,10 -11,5" />
              <polygon points="6,0 11,5 6,10 1,5" />
            </g>
          </g>

          <!-- Stage Labels along Bottom Edge of -35deg Band -->
          <text
            x="400"
            y="8"
            fill="#ffffff"
            fill-opacity="0.75"
            font-family="Oxanium, monospace"
            font-weight="700"
            font-size="10"
            letter-spacing="1"
          >
            STAGE 03
          </text>
          <text
            x="595"
            y="8"
            fill="#ffffff"
            fill-opacity="0.75"
            font-family="Oxanium, monospace"
            font-weight="700"
            font-size="10"
            letter-spacing="1"
          >
            STAGE 06
          </text>
          <text
            x="790"
            y="8"
            fill="#ffffff"
            fill-opacity="0.75"
            font-family="Oxanium, monospace"
            font-weight="700"
            font-size="10"
            letter-spacing="1"
          >
            STAGE 09
          </text>
          <text
            x="965"
            y="8"
            fill="#ffffff"
            fill-opacity="0.9"
            font-family="Oxanium, monospace"
            font-weight="700"
            font-size="10"
            letter-spacing="1"
          >
            PRODUCTION
          </text>

          <!-- "Talent Nodes" -> "Tech & System Nodes" Label right below the -35deg Ray -->
          <g transform="translate(295, 28)">
            <rect
              x="0"
              y="-15"
              width="20"
              height="20"
              rx="2"
              class="fill-purple-900 dark:fill-secondary-950 stroke-white"
              stroke-width="1.5"
            />
            <polygon points="5,-9 15,-9 10,0" fill="#ffffff" />
            <text
              x="28"
              y="0"
              fill="#ffffff"
              font-family="Poppins, sans-serif"
              font-weight="700"
              font-size="15"
            >
              Tech &amp; System Nodes
            </text>
          </g>
        </g>

        <!-- 9. BOTTOM TRACK 7-SLOT ROTATING PROJECT SELECTOR NODES -->
        <g
          v-for="slot in bottomTrackSlots"
          :key="'track-slot-' + slot.project.id"
          :transform="`translate(${slot.x}, ${slot.y})`"
          class="cursor-pointer"
          @click="jumpToProject(slot.index)"
        >
          <!-- Winged Double-Ring Node (Matches the green/white slash nodes in 1000338858.jpg) -->
          <template v-if="slot.isWinged || slot.isActive">
            <circle
              cx="0"
              cy="0"
              :r="slot.isActive ? 35 : 29"
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
            />
            <circle
              cx="0"
              cy="0"
              :r="slot.isActive ? 28 : 23"
              :class="
                slot.isActive
                  ? 'fill-purple-600 dark:fill-tertiary-700 stroke-white'
                  : 'fill-purple-700 dark:fill-primary-700 stroke-white'
              "
              stroke-width="2.5"
            />
            <!-- Diagonal Winged Slash Lines matching 1000338858.jpg -->
            <line
              x1="-22"
              y1="-14"
              x2="22"
              y2="14"
              stroke="#ffffff"
              stroke-opacity="0.45"
              stroke-width="3"
            />
            <line
              x1="-22"
              y1="14"
              x2="22"
              y2="-14"
              stroke="#ffffff"
              stroke-opacity="0.45"
              stroke-width="3"
            />
            <text
              x="0"
              y="5"
              text-anchor="middle"
              fill="#ffffff"
              font-family="Oxanium, monospace"
              font-weight="800"
              :font-size="slot.isActive ? 16 : 13"
            >
              {{ String(slot.index + 1).padStart(2, "0") }}
            </text>
          </template>

          <!-- Standard Circular Node with Rank Pips (•• / •••) -->
          <template v-else>
            <circle
              cx="0"
              cy="0"
              r="22"
              class="fill-purple-600 dark:fill-secondary-800 stroke-white"
              stroke-width="2.5"
            />
            <text
              x="0"
              y="5"
              text-anchor="middle"
              fill="#ffffff"
              font-family="Oxanium, monospace"
              font-weight="800"
              font-size="12"
            >
              {{ String(slot.index + 1).padStart(2, "0") }}
            </text>
            <!-- Pips at bottom-right of circular node -->
            <g transform="translate(18, 14)">
              <polygon
                v-for="p in slot.pips"
                :key="p"
                :points="`${(p - 1) * 7},0 ${(p - 1) * 7 + 4},0 ${(p - 1) * 7 + 2},6 ${(p - 1) * 7 - 2},6`"
                fill="#ffffff"
              />
            </g>
          </template>
        </g>
      </svg>

      <!-- =================================================================== -->
      <!-- HTML HUD OVERLAYS (Header, Outer-Right Project Dossier, Hub Controls) -->
      <!-- =================================================================== -->

      <!-- 1. Top-Left Operator / Matrix Header (Matches "Zhuang Fangyi / Ability Matrix") -->
      <div
        class="absolute left-6 lg:left-8 top-14 lg:top-16 z-30 flex items-center gap-3.5 pointer-events-auto"
      >
        <!-- Geometric Endfield Emblem -->
        <div
          class="w-9 h-9 bg-purple-700 dark:bg-secondary-900 border-2 border-purple-500 dark:border-tertiary-400 flex items-center justify-center rotate-45 shrink-0 shadow-md"
        >
          <div class="w-3.5 h-3.5 bg-white dark:bg-tertiary-400" />
        </div>
        <div class="pl-1">
          <div
            class="font-tech text-[10px] font-extrabold tracking-widest uppercase text-purple-700 dark:text-tertiary-400"
          >
            {{ $t("projects.projectLabel") }} // {{ formattedActiveIndex }} OF
            {{ formattedTotal }}
          </div>
          <h2
            class="font-sans font-bold text-base lg:text-xl text-foreground dark:text-white tracking-tight leading-tight"
          >
            {{ activeProjectTitle }}
            <span
              class="text-foreground/60 dark:text-white/60 font-medium text-sm lg:text-base"
            >
              / {{ $t("projects.title") }} Matrix
            </span>
          </h2>
        </div>
      </div>

      <!-- 2. Top-Right Circular Archive Link Button (Matches top-right circle button in 1000338858.jpg) -->
      <NuxtLink
        to="/projects"
        class="absolute right-6 lg:right-8 top-14 lg:top-16 z-30 w-10 h-10 rounded-full bg-white text-secondary-950 hover:bg-tertiary-400 transition-colors flex items-center justify-center shadow-lg pointer-events-auto"
        :title="$t('projects.archiveTitle')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </NuxtLink>

      <!-- 3. Flat Solid Tactical Project Dossier Panel (Nested in Outer-Right Polar Fan) -->
      <div
        class="absolute right-6 lg:right-10 top-28 lg:top-32 w-[340px] lg:w-[410px] xl:w-[440px] bg-purple-50 dark:bg-secondary-950 border-2 border-white dark:border-tertiary-400 rounded-[12px] overflow-hidden shadow-2xl z-30 pointer-events-auto transition-colors duration-500"
      >
        <!-- Project Preview Image Banner -->
        <div
          class="relative w-full h-36 lg:h-44 bg-secondary-950 overflow-hidden border-b-2 border-purple-200 dark:border-tertiary-700 group"
        >
          <img
            :src="activeProject.previewImage"
            :alt="activeProjectTitle"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-purple-700 dark:bg-secondary-900 border border-white/40 dark:border-tertiary-400 font-tech text-[10px] font-bold text-white uppercase tracking-widest"
          >
            {{ activeProject.isPrivateRepo ? "PRIVATE SYSTEM" : "OPEN SOURCE" }}
          </div>
          <div
            class="absolute bottom-2 right-2 px-2 py-0.5 bg-secondary-950/90 border border-tertiary-400/60 font-tech text-[10px] font-bold text-tertiary-300 uppercase"
          >
            ANGLE // {{ Math.abs(wheelRotation) }}&deg;
          </div>
        </div>

        <!-- Project Dossier Text & Actions -->
        <div class="p-4 lg:p-5 space-y-3">
          <div>
            <h3
              class="font-sans font-bold text-lg lg:text-xl text-foreground dark:text-white uppercase tracking-tight leading-snug"
            >
              {{ activeProjectTitle }}
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <div
                class="w-1 h-4 bg-purple-600 dark:bg-tertiary-700 shrink-0"
              />
              <p
                class="font-tech text-[11px] text-purple-700 dark:text-tertiary-400 uppercase tracking-wider line-clamp-1"
              >
                {{ activeProjectSubtitle }}
              </p>
            </div>
          </div>

          <p
            class="font-sans text-xs lg:text-sm text-foreground/85 dark:text-white/85 leading-relaxed line-clamp-3"
          >
            {{ activeProjectDescription }}
          </p>

          <!-- Action Buttons + Archive Link -->
          <div
            class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-purple-200 dark:border-secondary-800"
          >
            <div class="flex items-center gap-2">
              <a
                v-if="activeProject.demoUrl"
                :href="activeProject.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white font-tech font-bold text-[11px] uppercase tracking-wider rounded-[6px] transition-colors"
              >
                {{ activeProjectDemoLabel }}
              </a>
              <a
                v-if="activeProject.repoUrl && activeProject.repoUrl !== '-'"
                :href="activeProject.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="px-3 py-1.5 border border-purple-400 dark:border-tertiary-600 text-foreground dark:text-white hover:bg-purple-200 dark:hover:bg-secondary-800 font-tech font-semibold text-[11px] uppercase tracking-wider rounded-[6px] transition-colors"
              >
                {{ $t("projects.viewRepo") }}
              </a>
            </div>

            <NuxtLink
              to="/projects"
              class="font-tech text-[11px] font-bold text-purple-700 dark:text-tertiary-400 hover:underline uppercase tracking-wider"
            >
              ALL ({{ PROJECTS_DATA.length }}) &rarr;
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- 4. Bottom-Left Hub Readouts (Matches "Elite 4/4" + "◆◆◆◆" and "LEVEL 90/90") -->
      <div
        class="absolute left-[26%] lg:left-[27%] bottom-[14.5%] z-30 pointer-events-none"
      >
        <div
          class="text-xs font-sans font-semibold text-purple-700 dark:text-primary-300"
        >
          Project
        </div>
        <div
          class="font-tech font-extrabold text-2xl lg:text-3xl text-foreground dark:text-white leading-none"
        >
          {{ formattedActiveIndex
          }}<span class="text-base opacity-65">/{{ formattedTotal }}</span>
        </div>
        <div
          class="text-[10px] text-purple-600 dark:text-white tracking-[3px] mt-0.5"
        >
          &#9670;&#9670;&#9670;&#9670;
        </div>
      </div>

      <div
        class="absolute left-[26%] lg:left-[27%] bottom-[3.2%] z-30 pointer-events-none"
      >
        <div
          class="font-tech text-[10px] font-bold uppercase tracking-widest text-purple-700 dark:text-primary-300"
        >
          TECH NODES
        </div>
        <div
          class="font-tech font-extrabold text-3xl lg:text-4xl text-foreground dark:text-white leading-none"
        >
          {{ String(activeProject.techIcons.length).padStart(2, "0")
          }}<span class="text-lg opacity-60">/08</span>
        </div>
      </div>

      <!-- 5. Bottom-Left Pill Button (Matches "Level Up ^" Pill Button in 1000338858.jpg) -->
      <div
        class="absolute left-6 lg:left-28 bottom-8 lg:bottom-10 z-30 flex items-center gap-2.5 pointer-events-auto"
      >
        <!-- Prev Circle Button -->
        <button
          type="button"
          class="w-11 h-11 rounded-full bg-white text-secondary-950 border-2 border-purple-700 dark:border-secondary-950 shadow-xl flex items-center justify-center hover:bg-tertiary-300 transition-transform active:scale-95 cursor-pointer"
          aria-label="Previous project"
          @click="goToPrev"
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

        <!-- Signature Endfield "Level Up ^" Pill Button -> Rotates to Next Project -->
        <button
          type="button"
          class="h-11 px-4 rounded-full bg-white text-secondary-950 border-2 border-purple-700 dark:border-secondary-950 shadow-xl flex items-center gap-3 hover:bg-tertiary-200 transition-transform active:scale-95 cursor-pointer"
          @click="goToNext"
        >
          <span class="w-8 h-[2px] bg-secondary-950/35 hidden sm:inline-block" />
          <span class="font-sans font-bold text-sm tracking-tight">
            Rotate Next
          </span>
          <span
            class="w-6 h-6 rounded-full bg-secondary-950 text-white flex items-center justify-center text-xs font-bold"
          >
            &#9650;
          </span>
        </button>
      </div>
    </div>

    <!-- ======================================================================= -->
    <!-- MOBILE FALLBACK (< md): COMPACT ENDFIELD ROTATING HUB & TELEMETRY CARD  -->
    <!-- ======================================================================= -->
    <div
      class="flex md:hidden w-full h-full flex-col justify-between pt-16 pb-6 px-4 z-20"
    >
      <!-- Top Mobile Matrix Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div
            class="w-7 h-7 bg-purple-600 dark:bg-secondary-800 border border-tertiary-400 rotate-45 flex items-center justify-center"
          >
            <div class="w-2.5 h-2.5 bg-white" />
          </div>
          <div>
            <span
              class="font-tech text-[10px] font-bold text-purple-700 dark:text-tertiary-400 uppercase tracking-widest block"
            >
              MATRIX // {{ formattedActiveIndex }} / {{ formattedTotal }}
            </span>
            <h2
              class="font-sans font-bold text-lg text-foreground dark:text-white uppercase leading-none"
            >
              {{ activeProjectTitle }}
            </h2>
          </div>
        </div>

        <NuxtLink
          to="/projects"
          class="px-3 py-1.5 rounded-full bg-white text-secondary-950 font-tech text-[11px] font-bold uppercase"
        >
          Archive &rarr;
        </NuxtLink>
      </div>

      <!-- Rotating Circular Icon Hub + 4 Telemetry Bars -->
      <div
        class="p-4 rounded-[12px] bg-purple-200 dark:bg-secondary-900 border border-purple-400 dark:border-tertiary-700 space-y-3"
      >
        <div class="flex items-center gap-4">
          <!-- Rotating Icon Circle -->
          <div
            class="relative w-16 h-16 rounded-full bg-purple-600 dark:bg-secondary-950 border-2 border-white dark:border-tertiary-400 flex items-center justify-center shrink-0 transition-transform duration-500"
            :style="{ transform: `rotate(${wheelRotation}deg)` }"
          >
            <img
              v-if="activeProject.techIcons[0]?.iconUrl"
              :src="activeProject.techIcons[0].iconUrl"
              :alt="activeProjectTitle"
              class="w-8 h-8 object-contain"
            />
          </div>

          <!-- 4 Compact White Telemetry Bars -->
          <div class="flex-1 space-y-1.5">
            <div
              v-for="(bar, bIdx) in diagonalBars"
              :key="'mob-bar-' + bIdx"
              class="space-y-0.5"
            >
              <div
                class="flex justify-between font-tech text-[10px] font-bold text-foreground dark:text-white"
              >
                <span>{{ bar.label }}</span>
                <span>9/9 &#10070;</span>
              </div>
              <div class="w-full h-1.5 bg-white/25">
                <div class="h-full bg-purple-600 dark:bg-white w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Project Card -->
      <div
        class="flex-1 my-3 bg-purple-50 dark:bg-secondary-900 border border-purple-300 dark:border-tertiary-700 rounded-[12px] overflow-hidden flex flex-col justify-between p-4"
      >
        <img
          :src="activeProject.previewImage"
          :alt="activeProjectTitle"
          class="w-full h-36 object-cover rounded-[8px] border border-purple-200 dark:border-secondary-700"
        />
        <div class="space-y-1.5 my-auto py-2">
          <p
            class="font-tech text-xs text-purple-700 dark:text-tertiary-400 uppercase"
          >
            {{ activeProjectSubtitle }}
          </p>
          <p
            class="font-sans text-xs text-foreground/85 dark:text-white/85 line-clamp-3"
          >
            {{ activeProjectDescription }}
          </p>
        </div>
        <div class="flex items-center gap-2 pt-2">
          <a
            v-if="activeProject.demoUrl"
            :href="activeProject.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-purple-600 dark:bg-primary-700 text-white font-tech text-xs font-bold uppercase rounded-[6px]"
          >
            {{ activeProjectDemoLabel }}
          </a>
          <a
            v-if="activeProject.repoUrl && activeProject.repoUrl !== '-'"
            :href="activeProject.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 border border-purple-400 dark:border-tertiary-600 text-foreground dark:text-white font-tech text-xs font-bold uppercase rounded-[6px]"
          >
            {{ $t("projects.viewRepo") }}
          </a>
        </div>
      </div>

      <!-- Mobile Bottom Pill Switcher -->
      <div class="flex items-center justify-between gap-2">
        <button
          type="button"
          class="px-4 py-2.5 rounded-full bg-white text-secondary-950 font-sans font-bold text-xs shadow-md"
          @click="goToPrev"
        >
          &larr; Prev
        </button>
        <span class="font-tech text-xs font-bold text-foreground dark:text-white">
          {{ formattedActiveIndex }} / {{ formattedTotal }}
        </span>
        <button
          type="button"
          class="px-5 py-2.5 rounded-full bg-white text-secondary-950 font-sans font-bold text-xs shadow-md"
          @click="goToNext"
        >
          Rotate Next &#9650;
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA } from "./projectsData";

const { t, te } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const fanNodesGroupRef = ref<SVGGElement | null>(null);

const activeIndex = ref(0);
const selectedTechIndex = ref(0);
const showPreviewInHub = ref(false);
const barFillProgress = ref(1);
let isProgrammaticScroll = false;

const { $lenis } = useNuxtApp();

const activeProject = computed(() => {
  return PROJECTS_DATA[activeIndex.value] || PROJECTS_DATA[0]!;
});

const formattedActiveIndex = computed(() =>
  String(activeIndex.value + 1).padStart(2, "0"),
);
const formattedTotal = computed(() =>
  String(PROJECTS_DATA.length).padStart(2, "0"),
);

// Continuous angular rotation of the Polar Matrix Wheel
const wheelRotation = computed(() => -activeIndex.value * 24);

const activeProjectTitle = computed(() => {
  const key = `projects.items.${activeProject.value.id}.title`;
  return te(key) ? t(key) : activeProject.value.title;
});

const activeProjectSubtitle = computed(() => {
  const key = `projects.items.${activeProject.value.id}.subtitle`;
  return te(key) ? t(key) : activeProject.value.subtitle;
});

const activeProjectDescription = computed(() => {
  const key = `projects.items.${activeProject.value.id}.description`;
  return te(key) ? t(key) : activeProject.value.description;
});

const activeProjectDemoLabel = computed(() => {
  const key = `projects.items.${activeProject.value.id}.demoLabel`;
  return te(key)
    ? t(key)
    : activeProject.value.demoLabel || t("projects.viewDemo");
});

// 4 Diagonal -35deg Telemetry Bars ("Combat" in screenshot)
const diagonalBars = computed(() => {
  const icons = activeProject.value.techIcons || [];
  const fallbackLabels = [
    "ARCHITECTURE",
    "RUNTIME ENGINE",
    "TYPE SAFETY",
    "DEPLOYMENT",
  ];
  return [0, 1, 2, 3].map((idx) => {
    const tech = icons[idx];
    return {
      label: tech ? tech.name.toUpperCase() : fallbackLabels[idx]!,
      short: tech ? tech.name.substring(0, 3).toUpperCase() : `S0${idx + 1}`,
      iconUrl: tech?.iconUrl || "",
    };
  });
});

// Polar Tech Nodes positioned along the concentric arcs inside the Fan
const polarArcNodes = computed(() => {
  const icons = activeProject.value.techIcons || [];
  const coords = [
    { x: 590, y: 505, pips: 0 },
    { x: 745, y: 392, pips: 0 },
    { x: 905, y: 278, pips: 0 },
    { x: 1068, y: 165, pips: 0 },
    { x: 695, y: 520, pips: 0 },
    { x: 885, y: 425, pips: 2 },
    { x: 825, y: 565, pips: 0 },
    { x: 1035, y: 500, pips: 2 },
  ];
  return coords.map((pt, i) => {
    const tech = icons[i % Math.max(1, icons.length)];
    return {
      ...pt,
      tech,
      shortLabel: tech
        ? tech.name.substring(0, 3).toUpperCase()
        : `N${i + 1}`,
    };
  });
});

// Square [β] & [γ] Module Nodes along the lower polar rays
const squareModuleNodes = computed(() => {
  const icons = activeProject.value.techIcons || [];
  return [
    {
      x: 745,
      y: 650,
      greek: "β",
      symbol: "SYS",
      tech: icons[0],
    },
    {
      x: 1070,
      y: 600,
      greek: "γ",
      symbol: " core",
      tech: icons[1],
    },
    {
      x: 945,
      y: 685,
      greek: "β",
      symbol: "API",
      tech: icons[2],
    },
    {
      x: 1285,
      y: 652,
      greek: "γ",
      symbol: "UI",
      tech: icons[3],
    },
  ];
});

// 7-Slot Rotating Window of Projects along the Bottom Highlight Bar
const bottomTrackSlots = computed(() => {
  const total = PROJECTS_DATA.length;
  const slots = [];
  const positions = [
    { x: 565, y: 745, isWinged: true, pips: 0 },
    { x: 690, y: 742, isWinged: false, pips: 1 },
    { x: 815, y: 758, isWinged: true, pips: 0 },
    { x: 940, y: 750, isWinged: false, pips: 2 },
    { x: 1065, y: 766, isWinged: true, pips: 0 },
    { x: 1190, y: 758, isWinged: false, pips: 3 },
    { x: 1315, y: 774, isWinged: true, pips: 0 },
  ];

  for (let offset = 0; offset < 7; offset++) {
    const projIdx = (activeIndex.value + offset) % total;
    const pos = positions[offset]!;
    slots.push({
      index: projIdx,
      project: PROJECTS_DATA[projIdx]!,
      isActive: offset === 0,
      isWinged: pos.isWinged,
      pips: pos.pips,
      x: pos.x,
      y: pos.y,
    });
  }
  return slots;
});

let scrollTriggerInstance: ScrollTrigger | null = null;

function animateMatrixRotation(
  nextIdx: number,
  direction: "next" | "prev" = "next",
) {
  if (nextIdx === activeIndex.value) return;
  activeIndex.value = nextIdx;
  selectedTechIndex.value = 0;

  // 1. Pivot-anchored rotational sweep of the Polar Tech Node Constellation around Hub (210, 765)
  if (fanNodesGroupRef.value) {
    const startAngle = direction === "next" ? 16 : -16;
    gsap.fromTo(
      fanNodesGroupRef.value,
      {
        rotation: startAngle,
        svgOrigin: "210 765",
        opacity: 0.35,
      },
      {
        rotation: 0,
        svgOrigin: "210 765",
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
      },
    );
  }

  // 2. Re-fill animation on the 4 -35deg white telemetry bars
  barFillProgress.value = 0.15;
  gsap.to(barFillProgress, {
    value: 1,
    duration: 0.55,
    ease: "power2.out",
  });
}

function syncScrollToIndex(idx: number) {
  if (!scrollTriggerInstance) return;
  const total = PROJECTS_DATA.length;
  const targetProgress = (idx + 0.5) / total;
  const start = scrollTriggerInstance.start;
  const end = scrollTriggerInstance.end;
  const targetScroll = start + targetProgress * (end - start);

  isProgrammaticScroll = true;
  if ($lenis) {
    ($lenis as any).scrollTo(targetScroll, { immediate: true, force: true });
  } else {
    scrollTriggerInstance.scroll(targetScroll);
  }
  setTimeout(() => {
    isProgrammaticScroll = false;
  }, 600);
}

function jumpToProject(idx: number) {
  if (idx === activeIndex.value) return;
  const dir = idx > activeIndex.value ? "next" : "prev";
  animateMatrixRotation(idx, dir);
  syncScrollToIndex(idx);
}

function goToNext() {
  const nextIdx = (activeIndex.value + 1) % PROJECTS_DATA.length;
  animateMatrixRotation(nextIdx, "next");
  syncScrollToIndex(nextIdx);
}

function goToPrev() {
  const prevIdx =
    (activeIndex.value - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
  animateMatrixRotation(prevIdx, "prev");
  syncScrollToIndex(prevIdx);
}

onMounted(() => {
  if (import.meta.server || !sectionRef.value) return;

  gsap.registerPlugin(ScrollTrigger);

  const total = PROJECTS_DATA.length;

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: sectionRef.value,
    pin: true,
    start: "top top",
    end: () => `+=${total * 85}%`,
    scrub: 1,
    onUpdate: (self) => {
      if (isProgrammaticScroll) return;
      const step = Math.min(total - 1, Math.floor(self.progress * total));
      if (step !== activeIndex.value) {
        const dir = step > activeIndex.value ? "next" : "prev";
        animateMatrixRotation(step, dir);
      }
    },
  });
});

onBeforeUnmount(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
});
</script>
