---
title: "Dekomposisi Bentuk Vektor Performa Tinggi dalam C++ & OpenCL"
subtitle: "Reverse-engineering struktur memori livery dan akselerasi scoring primitif pada GPU"
summary: "Bagaimana saya merekayasa aplikasi utilitas berbasis GPU untuk Forza Horizon yang menerjemahkan gambar raster kompleks menjadi ratusan bentuk primitif geometris dengan evaluasi visual jutaan kali per detik via OpenCL."
publishedAt: "2026-06-14"
readTime: "8 menit baca"
category: "Systems & C++"
tags: ["C++", "OpenCL", "Qt", "Reverse Engineering", "GPU"]
coverImage: "/images/projects/horizon_canvas_preview.png"
---

Dalam simulator balap seperti Forza Horizon, editor livery pemain membatasi stiker hanya pada koleksi bentuk geometris primitif yang telah ditentukan. Mereka ulang karakter anime rumit atau logo korporat secara manual dapat memakan waktu puluhan jam kerja yang menjemukan.

## 1. Algoritma Optimasi Genetika Inti

Horizon Canvas memodelkan rekonstruksi gambar sebagai persoalan optimasi: diberikan gambar raster target, temukan urutan, transformasi, dan warna dari $N$ primitif geometris (kotak, lingkaran, poligon) yang meminimalkan nilai *Mean Squared Error* (MSE) terhadap target.

```cpp
struct ShapePrimitive {
    int type;
    float x, y;
    float scaleX, scaleY;
    float rotation;
    uint32_t colorRGBA;
};

double computeFitness(const ImageBuffer& current, const ImageBuffer& target) {
    double mse = 0.0;
    for (size_t i = 0; i < current.pixelCount; ++i) {
        double diff = current.data[i] - target.data[i];
        mse += diff * diff;
    }
    return mse / current.pixelCount;
}
```

## 2. Akselerasi GPU melalui Compute Kernel OpenCL

Menjalankan jutaan evaluasi rasterisasi dan penilaian kecocokan pada CPU membutuhkan waktu bermenit-menit per bentuk. Dengan memindahkan rasterizer ke custom compute kernel OpenCL pada GPU, kita memparalelkan perbandingan selisih piksel ke ribuan stream processor, menghasilkan **peningkatan kecepatan 45x lipat**.

```c
__kernel void rasterize_and_score(
    __global const uchar4* targetImage,
    __global const ShapePrimitive* shapes,
    __global float* fitnessOutputs,
    const int width,
    const int height
) {
    int gid = get_global_id(0);
    // Akumulator selisih piksel terparalelisasi
}
```

::callout-alert{type="info"}
Memindahkan kalkulasi fitness ke memori lokal workgroup GPU memangkas latensi bandwidth memori VRAM global hingga 82%.
::

## 3. Alur Injeksi Memori Langsung (Direct Memory Injection)

Setelah vektor bentuk teroptimasi terbentuk, aplikasi C++ Qt mandiri menuliskan koordinat dan parameter warna secara langsung ke dalam struktur memori permainan, memungkinkan rendering livery instan di dalam game tanpa perlu penempatan manual satu per satu.
