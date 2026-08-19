---
title: "Mitos 'Rewrite' dan Realita Bisnis: Mengapa 'If It Works, Don't Touch It' Bukan Sekadar Lelucon"
subtitle: "Pelajaran dari kurva lonceng programmer, HHVM Facebook, dan integrasi hybrid Next.js + C++"
summary: "Membongkar jebakan idealisme rewrite total dari kacamata engineering velocity, kelangsungan bisnis, dan studi kasus nyata arsitektur perangkat lunak skala produksi."
publishedAt: "2026-08-18"
readTime: "6 menit baca"
category: "Engineering Strategy"
tags: ["Software Engineering", "Technical Debt", "Architecture", "Business Velocity", "C++", "Next.js"]
coverImage: "/images/projects/train_simul_preview.png"
---

Meme kurva lonceng (*bell curve meme*) tentang *"If it works, don't touch it"* membagi mentalitas programmer menjadi tiga fase evolusi:

1. **Kiri (Pemula)**: Takut menyentuh atau mengubah kode karena khawatir merusak apa yang sudah berjalan tanpa paham akar masalahnya.
2. **Tengah (Idealis / Mid-Level)**: Menuntut *rewrite* total dari nol karena merasa basis kodenya "berantakan", tidak mematuhi *clean code*, atau belum menerapkan *design patterns* terkini.
3. **Kanan (Senior Engineer)**: Paham bahwa merombak kode stabil yang sedang menghasilkan uang tanpa dasar bisnis yang kuat adalah tindakan bunuh diri operasional.

---

## 1. Studi Kasus Skala Raksasa: Facebook dan HipHop Virtual Machine

Di masa awal pertumbuhannya yang eksponensial, seluruh kode monolitik Facebook ditulis menggunakan PHP. Ketika trafik global meledak, eksekusi interpretasi PHP menjadi terlalu lambat dan membebani infrastruktur server secara masif.

Reaksi instingtif kebanyakan engineer di tengah kurva lonceng adalah: 
> *"Tulis ulang seluruh sistemnya dari nol pakai C++ atau Java!"*

Namun dari perspektif bisnis, keputusan tersebut adalah jebakan maut. Melakukan *total rewrite* pada basis kode raksasa yang sedang melayani ratusan juta pengguna berarti **Engineering Velocity** (kecepatan rilis fitur baru) akan terhenti total selama berbulan-bulan hingga bertahun-tahun. Produk akan stagnan, kompetitor akan menyalip, dan perusahaan kehilangan pangsa pasar secara permanen.

::callout-alert{type="warning"}
Perangkat lunak dengan arsitektur paling sempurna di dunia tidak ada harganya jika bisnisnya mati karena kalah cepat merilis produk ke pasar.
::

### Solusi Infrastruktur Tingkat Bawah
Apa yang akhirnya dilakukan tim engineering Facebook? Mereka menerapkan filosofi *"If it works, don't touch it"* pada kode aplikasi utama:

- Alih-alih merombak jutaan baris kode PHP yang sudah stabil dan menghasilkan pendapatan, mereka **menggeser beban kerja ke lapisan kompilasi dan infrastruktur bawah**.
- Mereka membangun **HipHop Virtual Machine (HHVM)** dan kompilator JIT (*Just-In-Time*) untuk mengeksekusi kode PHP lama mereka mendekati kecepatan eksekusi native C++.

Hasilnya: **Kode lama tetap berjalan, fitur baru tetap rilis setiap hari, performa naik berlipat ganda, dan kelangsungan bisnis terselamatkan.**

---

## 2. Realita Integrasi Sistem Hybrid: Next.js dan C++ QtWebEngine

Pelajaran ini sangat relevan saat mengintegrasikan arsitektur multi-teknologi yang kompleks. Pada salah satu proyek hybrid saya—mengintegrasikan antarmuka modern **Next.js (TypeScript, Tailwind CSS)** dengan backend simulasi numerik berperforma tinggi **C++17 (Qt 6)** via **Chromium QtWebEngine**:

```
+-------------------------------------------------------+
|  Next.js 14 Web UI (Chromium QtWebEngine Context)     |
|  - Operator Dashboard, Recharts Analytics, Driver.js  |
+---------------------------+---------------------------+
                            | QWebChannel IPC Bridge
+---------------------------v---------------------------+
|  C++17 Core Engine (Stateless Controllers & SoA POD)  |
|  - Longitudinal Physics, FIS Fuzzy Optimization       |
+-------------------------------------------------------+
```

Menghadapi sistem yang terdistribusi seperti ini, godaan untuk merombak seluruh lapisan UI ke C++ murni atau sebaliknya memaksa komputasi berat ke JavaScript sering kali muncul. 

Namun, keputusan engineering terbaik adalah **membiarkan masing-masing lapisan menjalankan tugas terbaiknya**:
- Antarmuka web tetap lincah merender visual dan alur UX modern.
- Komputasi fisika dan optimasi Mamdani Fuzzy tetap dieksekusi di C++ dengan alokasi memori nol.
- Menjaga stabilitas *interop bridge* jauh lebih bernilai bagi pengguna akhir daripada membuang waktu berminggu-minggu menulis ulang seluruh logika UI di native widget C++.

---

## 3. Menimbang Nilai Clean Code vs Technical Debt

Sebagai software engineer, kita harus memegang teguh prinsip: **Clean Code itu wajib** untuk mencegah menumpuknya *Technical Debt* yang melumpuhkan. Namun, tugas utama seorang engineer bukanlah sekadar menulis kode yang indah secara estetika, melainkan **menulis kode yang menyelesaikan masalah bisnis nyata**.

::callout-alert{type="tip"}
Kunci kematangan teknis adalah mengetahui kapan harus membayar Technical Debt secara bertahap (*strangler fig pattern*), dan kapan harus menolak godaan rewrite total.
::

### Pertanyaan Refleksi
> **Menurut kalian, kapan sebuah Technical Debt benar-benar pantas dibayar dengan melakukan rewrite total dari nol?**
