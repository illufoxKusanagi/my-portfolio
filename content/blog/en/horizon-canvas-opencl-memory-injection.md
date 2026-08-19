---
title: "High-Performance Vector Shape Decomposition in C++ & OpenCL"
subtitle: "Reverse-engineering livery memory layers and accelerating primitive scoring loops"
summary: "How I engineered a GPU-accelerated utility for Forza Horizon that translates complex raster images into hundreds of overlapping geometric primitives, evaluating visual fitness millions of times per second using OpenCL."
publishedAt: "2026-06-14"
readTime: "8 min read"
category: "Systems & C++"
tags: ["C++", "OpenCL", "Qt", "Reverse Engineering", "GPU"]
coverImage: "/images/projects/horizon_canvas_preview.png"
---

In racing simulators like Forza Horizon, player livery editors restrict decals to a predefined library of primitive geometric shapes. Recreating intricate anime characters or complex corporate logos by hand can take dozens of tedious hours.

## 1. The Core Genetic Optimization Algorithm

Horizon Canvas treats image reconstruction as an optimization problem: given a target raster image, discover the sequence, transformations, and colors of $N$ geometric primitives (squares, circles, polygons) that minimize the Mean Squared Error (MSE) loss against the target.

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

## 2. GPU Acceleration via OpenCL Compute Kernels

Running millions of rasterization and scoring evaluations on the CPU takes minutes per shape. By moving the shape rasterizer to custom OpenCL compute kernels on the GPU, we parallelized pixel fitness comparisons across thousands of stream processors, yielding a **45x speedup**.

```c
__kernel void rasterize_and_score(
    __global const uchar4* targetImage,
    __global const ShapePrimitive* shapes,
    __global float* fitnessOutputs,
    const int width,
    const int height
) {
    int gid = get_global_id(0);
    // Parallelized pixel diff accumulator
}
```

::callout-alert{type="info"}
Moving fitness evaluations into GPU local workgroup memory reduces global VRAM memory bandwidth latency by 82%.
::

## 3. Direct Memory Injection Pipeline

Once optimized shape vectors are generated, the standalone Qt C++ application writes coordinates and color parameters directly into game memory structures, allowing instant in-game livery rendering without manual placement.
