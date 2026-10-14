<template>
  <div
    class="min-h-screen bg-[#f1f5f9] dark:bg-[#070b14] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 antialiased"
  >
    <!-- Top Interactive Control Bar (Font Tester & Quick Navigation) -->
    <header
      class="sticky top-0 z-50 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xs"
    >
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
        >
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Exit to Portfolio
        </NuxtLink>

        <div class="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />

        <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span class="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Font Inspector:
          </span>
          <span class="font-mono text-[11px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold">
            {{ activeFontClass }}
          </span>
        </div>
      </div>

      <!-- Live Interactive Controls -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Font Switcher Segmented Control -->
        <div class="inline-flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">
          <button
            type="button"
            v-for="font in FONTS"
            :key="font.id"
            @click="selectedFont = font.id"
            :class="[
              'px-3 py-1 rounded-md font-medium transition-all',
              selectedFont === font.id
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            {{ font.name }}
          </button>
        </div>

        <!-- Truncation / Large Number Tester Toggle -->
        <button
          type="button"
          @click="toggleNumberMode"
          :class="[
            'px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 border',
            numberMode === 'extreme'
              ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
          ]"
        >
          <span>🎲 Value Mode:</span>
          <span class="uppercase tracking-wider font-mono text-[11px]">{{ numberMode }}</span>
        </button>

        <!-- Quick Randomizer -->
        <button
          type="button"
          @click="randomizeValues"
          class="px-2.5 py-1.5 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 transition-colors border border-blue-200 dark:border-blue-900"
          title="Generate fresh random numbers to test font fitting"
        >
          ↻ Randomize
        </button>
      </div>
    </header>

    <!-- App Body: Sidebar + Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Navigation Rail (matching screenshot) -->
      <aside
        class="w-64 bg-white dark:bg-[#0c1220] border-r border-slate-200/90 dark:border-slate-800/80 flex flex-col justify-between p-4 shrink-0 hidden lg:flex select-none"
      >
        <div class="space-y-6">
          <!-- Top Hamburger / Logo bar -->
          <div class="flex items-center gap-3 px-2">
            <button
              type="button"
              class="w-8 h-8 rounded-md flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="min-w-0">
              <span class="font-bold text-sm text-slate-900 dark:text-white block truncate leading-tight">
                PT INKA
              </span>
              <span class="text-[10px] text-slate-400 font-mono tracking-wider">
                ERP // SAP S/4
              </span>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-1">
            <button
              type="button"
              @click="activeNav = 'dashboard'"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-all text-left',
                activeNav === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              ]"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              @click="activeNav = 'rsm'"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-all text-left',
                activeNav === 'rsm'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              ]"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>RSM Table</span>
            </button>

            <button
              type="button"
              @click="activeNav = 'upload'"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-all text-left',
                activeNav === 'upload'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              ]"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Upload Spreadsheet</span>
            </button>
          </nav>
        </div>

        <!-- Sidebar Footer Avatar Badge -->
        <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-1">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200 shrink-0">
              AD
            </div>
            <div class="min-w-0">
              <span class="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                Administrator
              </span>
              <span class="text-[10px] text-slate-400 block truncate">
                Superuser Access
              </span>
            </div>
          </div>
          <span class="text-slate-400 text-xs">⇅</span>
        </div>
      </aside>

      <!-- Main Stage -->
      <main class="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
        <!-- Top Board Title & Filter Header (exact screenshot layout) -->
        <div class="bg-white dark:bg-[#0e1424] rounded-xl border border-slate-200 dark:border-slate-800/80 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div>
            <h1
              :class="[
                'text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white',
                activeFontClass
              ]"
            >
              Project Executive Board
            </h1>
            <p
              :class="[
                'text-xs tracking-wider uppercase text-slate-500 dark:text-slate-400 mt-1 font-medium',
                activeFontClass
              ]"
            >
              PENGADAAN 450 UNIT CFT WAGON UGL
            </p>
          </div>

          <!-- Dropdown Filter Pills -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <div class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2">
              <span class="font-bold text-slate-400 uppercase text-[10px]">PROJ:</span>
              <span class="font-semibold text-slate-700 dark:text-slate-200">ALL PROJECTS ▾</span>
            </div>
            <div class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2">
              <span class="font-bold text-slate-400 uppercase text-[10px]">PLANT:</span>
              <span class="font-semibold text-slate-700 dark:text-slate-200">ALL PLANTS ▾</span>
            </div>
            <div class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-center gap-2">
              <span class="font-bold text-slate-400 uppercase text-[10px]">MONTH:</span>
              <span class="font-semibold text-slate-700 dark:text-slate-200">September 2026 ▾</span>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- MODULE 1: Financial Highlights (Tag: FINANCE - Electric Blue) -->
        <!-- ======================================================== -->
        <section class="relative bg-white dark:bg-[#0e1424] rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-2xs overflow-hidden pr-8 sm:pr-10">
          <!-- Right Vertical Badge Tag -->
          <div class="absolute top-0 right-0 bottom-0 w-8 sm:w-10 bg-[#0070f3] flex items-center justify-center select-none text-white font-bold tracking-widest text-[11px] sm:text-xs uppercase shadow-sm">
            <span class="rotate-90 whitespace-nowrap">FINANCE</span>
          </div>

          <div class="p-5 sm:p-6 space-y-4">
            <!-- Section Header Bar -->
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div class="border-l-3 border-[#0070f3] pl-2.5">
                <h2
                  :class="[
                    'text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white',
                    activeFontClass
                  ]"
                >
                  Financial Highlights
                </h2>
                <p class="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  REVENUE, MARGINS, AND CAPITAL COMMITMENTS
                </p>
              </div>

              <div class="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  Project: <strong class="text-slate-700 dark:text-slate-300">ALL PROJECTS</strong>
                </span>
                <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  Plant: <strong class="text-slate-700 dark:text-slate-300">ALL PLANTS</strong>
                </span>
              </div>
            </div>

            <!-- 5 KPI Cards Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              <!-- Card 1: Total Revenue -->
              <div class="p-3.5 rounded-lg bg-[#f0f6ff] dark:bg-[#131d33] border border-blue-100 dark:border-blue-900/60 flex flex-col justify-between space-y-2">
                <div class="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    TOTAL REVENUE
                  </span>
                </div>
                <div
                  :class="[
                    'text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate',
                    activeFontClass
                  ]"
                  :title="data.revenue"
                >
                  {{ data.revenue }}
                </div>
                <div class="flex items-center justify-between text-[11px] pt-1 border-t border-blue-200/60 dark:border-blue-800/50">
                  <span class="text-slate-500">Contractual Value</span>
                  <span class="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">100% Contract</span>
                </div>
              </div>

              <!-- Card 2: COGS -->
              <div class="p-3.5 rounded-lg bg-[#f8fafc] dark:bg-[#101828] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    COGS
                  </span>
                </div>
                <div
                  :class="[
                    'text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate',
                    activeFontClass
                  ]"
                  :title="data.cogs"
                >
                  {{ data.cogs }}
                </div>
                <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200 dark:border-slate-800">
                  <span class="text-slate-500">Cost of Goods Sold</span>
                  <span class="text-slate-600 dark:text-slate-400 font-medium">0% of Rev</span>
                </div>
              </div>

              <!-- Card 3: Est. Gross Margin -->
              <div class="p-3.5 rounded-lg bg-[#f8fafc] dark:bg-[#101828] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    EST. GROSS MARGIN
                  </span>
                  <span class="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold flex items-center gap-1">
                    ▲ Low
                  </span>
                </div>
                <div
                  :class="[
                    'text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate',
                    activeFontClass
                  ]"
                  :title="data.grossMargin"
                >
                  {{ data.grossMargin }}
                </div>
                <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200 dark:border-slate-800">
                  <span class="text-slate-500">Margin Value</span>
                  <span :class="['font-semibold text-slate-700 dark:text-slate-300 truncate', activeFontClass]">
                    {{ data.marginValue }}
                  </span>
                </div>
              </div>

              <!-- Card 4: WIP -->
              <div class="p-3.5 rounded-lg bg-[#f8fafc] dark:bg-[#101828] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    WIP
                  </span>
                </div>
                <div
                  :class="[
                    'text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate',
                    activeFontClass
                  ]"
                  :title="data.wip"
                >
                  {{ data.wip }}
                </div>
                <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200 dark:border-slate-800">
                  <span class="text-slate-500">Work In Progress</span>
                  <span class="text-slate-600 dark:text-slate-400 font-medium">0% of Rev</span>
                </div>
              </div>

              <!-- Card 5: Total Stock -->
              <div class="p-3.5 rounded-lg bg-[#f8fafc] dark:bg-[#101828] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    TOTAL STOCK
                  </span>
                </div>
                <div
                  :class="[
                    'text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate',
                    activeFontClass
                  ]"
                  :title="data.stock"
                >
                  {{ data.stock }}
                </div>
                <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200 dark:border-slate-800">
                  <span class="text-slate-500">Inventory Reserves</span>
                  <span class="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">Active Stock</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ======================================================== -->
        <!-- MODULE 2: Procurement Tracking (Tag: PROCUREMENT - Cyan)  -->
        <!-- ======================================================== -->
        <section class="relative bg-white dark:bg-[#0e1424] rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-2xs overflow-hidden pr-8 sm:pr-10">
          <div class="absolute top-0 right-0 bottom-0 w-8 sm:w-10 bg-[#0ea5e9] flex items-center justify-center select-none text-white font-bold tracking-widest text-[11px] sm:text-xs uppercase shadow-sm">
            <span class="rotate-90 whitespace-nowrap">PROCUREMENT</span>
          </div>

          <div class="p-5 sm:p-6 space-y-4">
            <!-- Header -->
            <div class="border-l-3 border-[#0ea5e9] pl-2.5">
              <h2
                :class="[
                  'text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white',
                  activeFontClass
                ]"
              >
                Procurement Tracking
              </h2>
              <p class="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                REQUISITIONS, PURCHASE ORDER FULFILLMENT, AND QUALITY GATES
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <!-- PR Completion (4 cols) -->
              <div class="lg:col-span-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#fbfdff] dark:bg-[#11192b] flex flex-col justify-between space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    🛒 Purchase Request (PR) Completion
                  </span>
                  <span class="text-[11px] text-slate-400 font-medium">Detail &gt;</span>
                </div>

                <div class="text-center py-2">
                  <div
                    :class="[
                      'text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white truncate',
                      activeFontClass
                    ]"
                  >
                    {{ data.prCloseRate }}
                  </div>
                  <span class="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block mt-0.5">CLOSE</span>
                </div>

                <div class="space-y-1.5 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div class="flex justify-between text-slate-500">
                    <span>Total PR</span>
                    <strong :class="['text-slate-800 dark:text-slate-200', activeFontClass]">{{ data.totalPr }}</strong>
                  </div>
                  <div class="flex justify-between text-slate-500">
                    <span>Close</span>
                    <strong :class="['text-slate-800 dark:text-slate-200', activeFontClass]">{{ data.closePr }}</strong>
                  </div>
                  <div class="flex justify-between text-slate-500">
                    <span>Open</span>
                    <strong :class="['text-slate-800 dark:text-slate-200', activeFontClass]">{{ data.openPr }}</strong>
                  </div>
                  <div class="flex justify-between pt-1 border-t border-dashed border-slate-200 dark:border-slate-700 text-slate-500">
                    <span>APPROX. OPEN VALUE</span>
                    <strong :class="['text-rose-500 font-bold', activeFontClass]">{{ data.openPrValue }}</strong>
                  </div>
                </div>
              </div>

              <!-- PO Execution (5 cols) -->
              <div class="lg:col-span-5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#fbfdff] dark:bg-[#11192b] flex flex-col justify-between space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    📄 Purchase Order (PO) Execution
                  </span>
                  <span class="text-[11px] text-slate-400 font-medium">Detail &gt;</span>
                </div>

                <div class="p-3 rounded-lg bg-[#ebf3ff] dark:bg-[#16223b] border border-blue-100 dark:border-blue-900/50">
                  <span class="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block">
                    TOTAL PO VALUE
                  </span>
                  <div
                    :class="[
                      'text-2xl font-extrabold text-slate-900 dark:text-white truncate mt-0.5',
                      activeFontClass
                    ]"
                  >
                    {{ data.poValue }}
                  </div>
                </div>

                <div class="space-y-3 text-xs">
                  <div>
                    <span class="text-[11px] text-slate-400 font-semibold block mb-1">Delivered vs To Be Delivered</span>
                    <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-blue-500" />
                        Delivered ({{ data.deliveredRate }}): <strong :class="activeFontClass">{{ data.deliveredVal }}</strong>
                      </span>
                      <span class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-amber-500" />
                        To Be Delivered: <strong :class="activeFontClass">{{ data.toBeDeliveredVal }}</strong>
                      </span>
                    </div>
                  </div>

                  <div>
                    <span class="text-[11px] text-slate-400 font-semibold block mb-1">Invoiced vs To Be Invoiced</span>
                    <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-sky-500" />
                        Invoiced ({{ data.invoicedRate }}): <strong :class="activeFontClass">{{ data.invoicedVal }}</strong>
                      </span>
                      <span class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-rose-500" />
                        To Be Invoiced: <strong :class="activeFontClass">{{ data.toBeInvoicedVal }}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Outstanding QC (3 cols) -->
              <div class="lg:col-span-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#fbfdff] dark:bg-[#11192b] flex flex-col justify-between space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    ⚙ OUTSTANDING QC
                  </span>
                  <span class="text-[11px] text-slate-400 font-medium">Detail &gt;</span>
                </div>

                <div class="space-y-4 my-auto">
                  <div>
                    <span class="text-[11px] text-slate-400 uppercase font-semibold block">TOTAL OUTSTANDING ITEMS</span>
                    <div :class="['text-2xl font-extrabold text-slate-900 dark:text-white', activeFontClass]">
                      {{ data.qcItems }}
                    </div>
                  </div>

                  <div class="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span class="text-[11px] text-slate-400 uppercase font-semibold block">VALUE AT RISK</span>
                    <div :class="['text-xl font-bold text-slate-900 dark:text-white truncate', activeFontClass]">
                      {{ data.qcValueAtRisk }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ======================================================== -->
        <!-- MODULE 3: Stock Details Analysis (Tag: STOCK - Purple)    -->
        <!-- ======================================================== -->
        <section class="relative bg-white dark:bg-[#0e1424] rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-2xs overflow-hidden pr-8 sm:pr-10">
          <div class="absolute top-0 right-0 bottom-0 w-8 sm:w-10 bg-[#7c3aed] flex items-center justify-center select-none text-white font-bold tracking-widest text-[11px] sm:text-xs uppercase shadow-sm">
            <span class="rotate-90 whitespace-nowrap">STOCK</span>
          </div>

          <div class="p-5 sm:p-6 space-y-4">
            <div class="border-l-3 border-[#7c3aed] pl-2.5">
              <h2
                :class="[
                  'text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white',
                  activeFontClass
                ]"
              >
                Stock Details Analysis
              </h2>
              <p class="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                STORAGE LOCATIONS, MATERIAL TRANSFER POSTINGS, AND ISSUE VOUCHERS
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <!-- Stock Analysis -->
              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#fbfdff] dark:bg-[#11192b] flex flex-col justify-between space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200">📦 Stock Analysis</span>
                  <span class="text-[11px] text-slate-400 font-medium">Detail &gt;</span>
                </div>

                <div class="p-3 rounded-lg bg-[#f5f3ff] dark:bg-[#1a1633] space-y-2">
                  <span class="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-slate-800 font-bold text-purple-700 dark:text-purple-300 shadow-2xs">
                    All Plants
                  </span>

                  <div class="flex items-center justify-between text-xs pt-1">
                    <span class="text-slate-500 flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-amber-500" />
                      STAGING (EXP)
                    </span>
                    <span :class="['font-semibold', activeFontClass]">
                      {{ data.stagingCount }} Items • {{ data.stagingVal }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between text-xs">
                    <span class="text-slate-500 flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-emerald-500" />
                      WAREHOUSE
                    </span>
                    <span :class="['font-semibold', activeFontClass]">
                      {{ data.warehouseCount }} Items • {{ data.warehouseVal }}
                    </span>
                  </div>
                </div>

                <span class="text-[10px] text-slate-400">Active warehouse balance</span>
              </div>

              <!-- BPM Completion -->
              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#fbfdff] dark:bg-[#11192b] flex flex-col justify-between space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200">📑 BPM Completion</span>
                  <span class="text-[11px] text-slate-400 font-medium">Detail &gt;</span>
                </div>

                <div class="text-center py-1">
                  <div :class="['text-3xl font-extrabold text-slate-900 dark:text-white truncate', activeFontClass]">
                    {{ data.bpmCloseRate }}
                  </div>
                  <span class="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">CLOSE</span>
                </div>

                <div class="space-y-1 text-xs border-t border-slate-100 dark:border-slate-800 pt-2">
                  <div class="flex justify-between text-slate-500">
                    <span>Total BPM</span>
                    <strong :class="activeFontClass">{{ data.totalBpm }}</strong>
                  </div>
                  <div class="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>✓ Close ({{ data.bpmCloseRate }})</span>
                    <strong :class="activeFontClass">{{ data.bpmClose }}</strong>
                  </div>
                  <div class="flex justify-between text-rose-500">
                    <span>Open ({{ data.bpmOpenRate }})</span>
                    <strong :class="activeFontClass">{{ data.bpmOpen }}</strong>
                  </div>
                  <div class="flex justify-between pt-1 border-t border-dashed border-slate-200 dark:border-slate-700 text-slate-500">
                    <span>APPROX BPM OPEN VALUE</span>
                    <strong :class="['text-rose-500 font-bold', activeFontClass]">{{ data.bpmOpenVal }}</strong>
                  </div>
                </div>
              </div>

              <!-- Transfer Posting -->
              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#fbfdff] dark:bg-[#11192b] flex flex-col justify-between space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200">⇄ Transfer Posting</span>
                  <span class="text-[11px] text-slate-400 font-medium">Detail &gt;</span>
                </div>

                <div class="text-center py-1">
                  <div :class="['text-3xl font-extrabold text-slate-900 dark:text-white truncate', activeFontClass]">
                    {{ data.transferOutRate }}
                  </div>
                  <span class="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">OUT</span>
                </div>

                <div class="space-y-1 text-xs border-t border-slate-100 dark:border-slate-800 pt-2">
                  <div class="flex justify-between text-slate-500">
                    <span>Total Transfer</span>
                    <strong :class="activeFontClass">{{ data.totalTransferVal }}</strong>
                  </div>
                  <div class="flex justify-between text-purple-600 dark:text-purple-400">
                    <span>● IN ({{ data.transferInRate }})</span>
                    <strong :class="activeFontClass">{{ data.transferInVal }}</strong>
                  </div>
                  <div class="flex justify-between text-blue-600 dark:text-blue-400">
                    <span>● OUT ({{ data.transferOutRate }})</span>
                    <strong :class="activeFontClass">{{ data.transferOutVal }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ======================================================== -->
        <!-- MODULE 4: Operational Completion (Tag: OPERATIONS - Blue) -->
        <!-- ======================================================== -->
        <section class="relative bg-white dark:bg-[#0e1424] rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-2xs overflow-hidden pr-8 sm:pr-10">
          <div class="absolute top-0 right-0 bottom-0 w-8 sm:w-10 bg-[#2563eb] flex items-center justify-center select-none text-white font-bold tracking-widest text-[11px] sm:text-xs uppercase shadow-sm">
            <span class="rotate-90 whitespace-nowrap">OPERATIONS</span>
          </div>

          <div class="p-5 sm:p-6 space-y-4">
            <div class="border-l-3 border-[#2563eb] pl-2.5">
              <h2
                :class="[
                  'text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white',
                  activeFontClass
                ]"
              >
                Operational Completion
              </h2>
              <p class="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                MANUFACTURING MILESTONES, WAGON DELIVERY, AND PRODUCTION HOURS
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <!-- Finished Goods (4 cols) -->
              <div class="lg:col-span-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#fbfdff] dark:bg-[#11192b] flex flex-col justify-between space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200">🚆 Finished Goods</span>
                  <span class="text-[11px] text-slate-400 font-medium">Detail &gt;</span>
                </div>

                <div class="space-y-2">
                  <div class="p-2.5 rounded-lg bg-[#ebf3ff] dark:bg-[#16223b] text-center">
                    <span class="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider block">PLANNING</span>
                    <div :class="['text-xl font-extrabold text-slate-900 dark:text-white', activeFontClass]">
                      {{ data.fgPlanning }}
                    </div>
                  </div>

                  <div class="p-2.5 rounded-lg bg-[#ebf3ff] dark:bg-[#16223b] text-center">
                    <span class="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider block">GOOD RECEIPT</span>
                    <div :class="['text-xl font-extrabold text-slate-900 dark:text-white', activeFontClass]">
                      {{ data.fgGoodReceipt }}
                    </div>
                  </div>

                  <div class="p-2.5 rounded-lg bg-[#ebf3ff] dark:bg-[#16223b] text-center">
                    <span class="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider block">DELIVERY ORDER</span>
                    <div :class="['text-xl font-extrabold text-slate-900 dark:text-white', activeFontClass]">
                      {{ data.fgDeliveryOrder }}
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between text-[11px] pt-1">
                  <span class="text-slate-400">Completion Status</span>
                  <span class="font-bold text-slate-700 dark:text-slate-300">Pending Completion</span>
                </div>
              </div>

              <!-- Production Hour Distribution (8 cols) -->
              <div class="lg:col-span-8 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#fbfdff] dark:bg-[#11192b] flex flex-col justify-between space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-200">⏱ Production Hour Distribution</span>
                  <span class="text-[11px] text-slate-400 font-medium">Detail &gt;</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <!-- Circular Gauge Summary -->
                  <div class="sm:col-span-4 flex flex-col items-center justify-center py-2 text-center">
                    <div class="w-24 h-24 rounded-full border-4 border-blue-500/20 border-t-blue-500 flex flex-col items-center justify-center">
                      <div :class="['text-lg font-bold leading-none text-slate-900 dark:text-white', activeFontClass]">
                        {{ data.totalHours }}
                      </div>
                      <span class="text-[9px] text-slate-400 font-semibold tracking-wider mt-0.5">TOTAL H</span>
                    </div>

                    <div class="flex items-center gap-3 text-[10px] text-slate-500 mt-3">
                      <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-600" /> Labour</span>
                      <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-sky-400" /> Indirect</span>
                      <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-slate-400" /> Machine</span>
                    </div>
                  </div>

                  <!-- 3 Breakdown Metric Cards -->
                  <div class="sm:col-span-8 space-y-2">
                    <div class="grid grid-cols-3 gap-2">
                      <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <span class="text-[10px] text-slate-400 uppercase font-semibold block">LABOUR</span>
                        <div :class="['text-base font-bold text-slate-900 dark:text-white mt-0.5 truncate', activeFontClass]">
                          {{ data.labourHours }}
                        </div>
                        <span class="text-[10px] text-blue-600 font-semibold">{{ data.labourRate }}</span>
                      </div>

                      <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <span class="text-[10px] text-slate-400 uppercase font-semibold block">INDIRECT</span>
                        <div :class="['text-base font-bold text-slate-900 dark:text-white mt-0.5 truncate', activeFontClass]">
                          {{ data.indirectHours }}
                        </div>
                        <span class="text-[10px] text-sky-600 font-semibold">{{ data.indirectRate }}</span>
                      </div>

                      <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <span class="text-[10px] text-slate-400 uppercase font-semibold block">MACHINE</span>
                        <div :class="['text-base font-bold text-slate-900 dark:text-white mt-0.5 truncate', activeFontClass]">
                          {{ data.machineHours }}
                        </div>
                        <span class="text-[10px] text-slate-500 font-semibold">{{ data.machineRate }}</span>
                      </div>
                    </div>

                    <!-- Overall Total Cost Box -->
                    <div class="p-3 rounded-lg bg-[#ebf3ff] dark:bg-[#16223b] flex items-center justify-between">
                      <div>
                        <span class="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider block">OVERALL TOTAL COST</span>
                        <div :class="['text-xl font-extrabold text-slate-900 dark:text-white truncate', activeFontClass]">
                          {{ data.totalCost }}
                        </div>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
                        Total Cost
                      </span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span class="text-slate-400">Recap Status</span>
                  <span class="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Data Fully Integrated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Bottom System Sync Bar -->
        <div class="text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2 px-1 pt-2 pb-8">
          <div>
            Data source: <strong class="text-slate-600 dark:text-slate-300">SAP S/4HANA</strong> • Last sync: <span class="font-mono">12 Oct 2026, 06:51</span>
          </div>
          <div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-500" />
            Data fully integrated
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

useHead({
  title: "Project Executive Board | Solaris Font Showcase",
  meta: [
    {
      name: "description",
      content:
        "High-fidelity enterprise executive dashboard demonstrating the custom Solaris font across metrics, currencies, and telemetry."
    }
  ]
});

const activeNav = ref("dashboard");
const selectedFont = ref<"solaris" | "tech" | "sans">("solaris");
const numberMode = ref<"template" | "realistic" | "extreme">("realistic");

const FONTS = [
  { id: "solaris" as const, name: "Solaris Script", class: "font-solaris" },
  { id: "tech" as const, name: "Oxanium (Tech)", class: "font-tech" },
  { id: "sans" as const, name: "Poppins (Sans)", class: "font-sans" }
];

const activeFontClass = computed(() => {
  const found = FONTS.find((f) => f.id === selectedFont.value);
  return found ? found.class : "font-solaris";
});

function toggleNumberMode() {
  if (numberMode.value === "template") {
    numberMode.value = "realistic";
  } else if (numberMode.value === "realistic") {
    numberMode.value = "extreme";
  } else {
    numberMode.value = "template";
  }
}

// Dynamic Mock Datasets for Truncation & Width Testing
const mockDatasets = {
  // 1. Template default (like the screenshot with 0s)
  template: {
    revenue: "Rp 0",
    cogs: "Rp 0",
    grossMargin: "0,00%",
    marginValue: "Rp 0",
    wip: "Rp 0",
    stock: "Rp 0",
    prCloseRate: "0,00%",
    totalPr: "0",
    closePr: "0",
    openPr: "0",
    openPrValue: "Rp 0",
    poValue: "Rp 0",
    deliveredRate: "0,0%",
    deliveredVal: "Rp 0",
    toBeDeliveredVal: "Rp 0",
    invoicedRate: "0,0%",
    invoicedVal: "Rp 0",
    toBeInvoicedVal: "Rp 0",
    qcItems: "0",
    qcValueAtRisk: "Rp 0",
    stagingCount: "0",
    stagingVal: "Rp 0",
    warehouseCount: "0",
    warehouseVal: "Rp 0",
    bpmCloseRate: "0,0%",
    totalBpm: "0",
    bpmClose: "0",
    bpmOpenRate: "0,0%",
    bpmOpen: "0",
    bpmOpenVal: "Rp 0",
    transferOutRate: "0,0%",
    totalTransferVal: "Rp 0",
    transferInRate: "0,0%",
    transferInVal: "Rp 0",
    transferOutVal: "Rp 0",
    fgPlanning: "0",
    fgGoodReceipt: "0",
    fgDeliveryOrder: "0",
    totalHours: "0,0",
    labourHours: "0 Hour",
    labourRate: "0,0%",
    indirectHours: "0 Hour",
    indirectRate: "0,0%",
    machineHours: "0 Hour",
    machineRate: "0,0%",
    totalCost: "Rp 0"
  },

  // 2. Realistic procurement values (test natural spacing & currency)
  realistic: {
    revenue: "Rp 128.450.920.000",
    cogs: "Rp 94.210.000.000",
    grossMargin: "26,65%",
    marginValue: "Rp 34.240.920.000",
    wip: "Rp 18.750.000.000",
    stock: "Rp 42.180.500.000",
    prCloseRate: "89,45%",
    totalPr: "450",
    closePr: "402",
    openPr: "48",
    openPrValue: "Rp 3.840.000.000",
    poValue: "Rp 112.900.000.000",
    deliveredRate: "76,2%",
    deliveredVal: "Rp 86.030.000.000",
    toBeDeliveredVal: "Rp 26.870.000.000",
    invoicedRate: "68,5%",
    invoicedVal: "Rp 77.336.500.000",
    toBeInvoicedVal: "Rp 35.563.500.000",
    qcItems: "14",
    qcValueAtRisk: "Rp 850.000.000",
    stagingCount: "45",
    stagingVal: "Rp 4.250.000.000",
    warehouseCount: "380",
    warehouseVal: "Rp 37.930.500.000",
    bpmCloseRate: "91,2%",
    totalBpm: "1.240",
    bpmClose: "1.131",
    bpmOpenRate: "8,8%",
    bpmOpen: "109",
    bpmOpenVal: "Rp 1.120.000.000",
    transferOutRate: "84,0%",
    totalTransferVal: "Rp 24.500.000.000",
    transferInRate: "82,5%",
    transferInVal: "Rp 20.212.500.000",
    transferOutVal: "Rp 20.580.000.000",
    fgPlanning: "450",
    fgGoodReceipt: "342",
    fgDeliveryOrder: "310",
    totalHours: "1.840,5",
    labourHours: "920 Hour",
    labourRate: "50,0%",
    indirectHours: "460 Hour",
    indirectRate: "25,0%",
    machineHours: "460,5 Hour",
    machineRate: "25,0%",
    totalCost: "Rp 8.420.000.000"
  },

  // 3. Extreme length values (specifically to test truncation & card boundary breaking)
  extreme: {
    revenue: "Rp 9.999.888.777.666.000",
    cogs: "Rp 8.450.123.456.789.000",
    grossMargin: "15,49182%",
    marginValue: "Rp 1.549.765.320.877.000",
    wip: "Rp 742.890.123.456.000",
    stock: "Rp 2.345.678.901.234.000",
    prCloseRate: "99,999%",
    totalPr: "99.999",
    closePr: "99.990",
    openPr: "9",
    openPrValue: "Rp 999.999.999.999",
    poValue: "Rp 8.765.432.109.876.543",
    deliveredRate: "94,123%",
    deliveredVal: "Rp 8.245.000.000.000",
    toBeDeliveredVal: "Rp 520.432.109.876",
    invoicedRate: "88,765%",
    invoicedVal: "Rp 7.780.000.000.000",
    toBeInvoicedVal: "Rp 985.432.109.876",
    qcItems: "9.999",
    qcValueAtRisk: "Rp 123.456.789.000",
    stagingCount: "9.999",
    stagingVal: "Rp 888.777.666.555",
    warehouseCount: "88.888",
    warehouseVal: "Rp 1.456.789.012.345",
    bpmCloseRate: "98,765%",
    totalBpm: "123.456",
    bpmClose: "121.932",
    bpmOpenRate: "1,235%",
    bpmOpen: "1.524",
    bpmOpenVal: "Rp 345.678.901.234",
    transferOutRate: "95,432%",
    totalTransferVal: "Rp 890.123.456.789",
    transferInRate: "92,111%",
    transferInVal: "Rp 819.890.123.456",
    transferOutVal: "Rp 849.456.789.012",
    fgPlanning: "99.999",
    fgGoodReceipt: "95.432",
    fgDeliveryOrder: "91.876",
    totalHours: "99.999,99",
    labourHours: "50.000 Hour",
    labourRate: "50,00%",
    indirectHours: "25.000 Hour",
    indirectRate: "25,00%",
    machineHours: "24.999,99 Hour",
    machineRate: "25,00%",
    totalCost: "Rp 456.789.012.345"
  }
};

const customData = ref({ ...mockDatasets.realistic });

const data = computed(() => {
  return customData.value;
});

function randomizeValues() {
  const randNum = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const randCurr = (minBillions: number, maxBillions: number) =>
    `Rp ${(randNum(minBillions, maxBillions) * 1000000).toLocaleString("id-ID")}`;
  const randPct = () => `${(Math.random() * 95 + 5).toFixed(2).replace(".", ",")}%`;

  customData.value = {
    revenue: randCurr(50000, 250000),
    cogs: randCurr(30000, 180000),
    grossMargin: randPct(),
    marginValue: randCurr(10000, 70000),
    wip: randCurr(5000, 40000),
    stock: randCurr(10000, 80000),
    prCloseRate: randPct(),
    totalPr: `${randNum(200, 900)}`,
    closePr: `${randNum(150, 800)}`,
    openPr: `${randNum(10, 100)}`,
    openPrValue: randCurr(1000, 8000),
    poValue: randCurr(40000, 200000),
    deliveredRate: randPct(),
    deliveredVal: randCurr(20000, 120000),
    toBeDeliveredVal: randCurr(5000, 40000),
    invoicedRate: randPct(),
    invoicedVal: randCurr(15000, 100000),
    toBeInvoicedVal: randCurr(5000, 50000),
    qcItems: `${randNum(0, 50)}`,
    qcValueAtRisk: randCurr(200, 3000),
    stagingCount: `${randNum(10, 120)}`,
    stagingVal: randCurr(1000, 10000),
    warehouseCount: `${randNum(100, 800)}`,
    warehouseVal: randCurr(15000, 90000),
    bpmCloseRate: randPct(),
    totalBpm: `${randNum(500, 2500)}`,
    bpmClose: `${randNum(400, 2300)}`,
    bpmOpenRate: randPct(),
    bpmOpen: `${randNum(20, 200)}`,
    bpmOpenVal: randCurr(500, 5000),
    transferOutRate: randPct(),
    totalTransferVal: randCurr(5000, 50000),
    transferInRate: randPct(),
    transferInVal: randCurr(2000, 25000),
    transferOutVal: randCurr(2000, 25000),
    fgPlanning: `${randNum(100, 600)}`,
    fgGoodReceipt: `${randNum(50, 550)}`,
    fgDeliveryOrder: `${randNum(30, 500)}`,
    totalHours: `${randNum(500, 4000)},${randNum(0, 9)}`,
    labourHours: `${randNum(300, 2000)} Hour`,
    labourRate: "50,0%",
    indirectHours: `${randNum(100, 1000)} Hour`,
    indirectRate: "25,0%",
    machineHours: `${randNum(100, 1000)} Hour`,
    machineRate: "25,0%",
    totalCost: randCurr(2000, 15000)
  };
}

// Watch number mode changes to load presets
watch(numberMode, (mode) => {
  customData.value = { ...mockDatasets[mode] };
});
</script>

