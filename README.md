# GamesPoi

**GamesPoi** adalah platform rekomendasi game cerdas berbasis web yang membantu pengguna menemukan judul game terbaik sesuai dengan deskripsi keinginan, genre, rentang tahun rilis, dan platform pilihan mereka.

## Live Demo

> <a href="https://gamespoi.netlify.app/" target="_blank" rel="noopener noreferrer">
>   Klik di sini untuk mencoba Live Demo GamesPoi
> </a>

---

## Fitur Utama

- **Pencarian Berbasis Deskripsi AI:** Pengguna dapat mendeskripsikan konsep, cerita, atau gaya permainan yang diinginkan (maksimal 300 kata dengan indikator penghitung kata _real-time_).
- **Filter Multi-Genre & Multi-Platform:** Input tag interaktif yang memungkinkan pengguna menambahkan banyak genre maupun platform sekaligus (mendukung pemisah koma atau tombol `Enter`, lengkap dengan pencegahan duplikasi).
- **Filter Rentang Tahun Rilis:** Menyaring rekomendasi game berdasarkan periode atau rentang tahun rilis tertentu (contoh: `2000 - 2010`).
- **Tampilan Kartu Game Informatif:** Menampilkan sampul (_cover_) game, skor rating, tanggal rilis, daftar genre, ringkasan deskripsi, serta platform yang didukung.
- **Modal Detail Game Interaktif:** Klik pada kartu game untuk melihat informasi lengkap di dalam jendela _pop-up modal_ (mendukung navigasi keyboard seperti `Enter`/`Space` dan `Esc`).
- **Manajemen Request & Responsif:** Dilengkapi pembatalan permintaan otomatis (`AbortController`), status _loading_ dan _error handling_, tombol reset filter, serta tampilan _dark mode_ yang responsif di desktop maupun perangkat mobile.

---

## Teknologi yang Digunakan

### Frontend

- **React 19** — Library utama untuk membangun antarmuka pengguna berbasis komponen.
- **TypeScript** — Menjamin keamanan tipe data (_type-safety_) pada seluruh kode aplikasi.
- **Vite** — _Build tool_ modern yang cepat untuk pengembangan dan _bundling_ produksi.
- **React Router DOM** — Manajemen routing aplikasi web.
- **SCSS (Sass)** — Styling modular dengan variabel tema kustom dan desain responsif.
- **Babel React Compiler** — Optimasi performa rendering komponen React secara otomatis.

### API & Layanan Eksternal

- **Gemini API** — Pemrosesan bahasa alami dan rekomendasi game berbasis AI.
- **RAWG API** — Sumber database informasi, sampul, dan metadata game.

---

## Cara Instalasi Lokal (Setup Guide)

Ikuti langkah-langkah berikut untuk menjalankan projek **GamesPoi** di komputer lokal Anda:

### 1. Prasyarat

Pastikan Anda sudah menginstal:

- [Node.js](https://nodejs.org/) (disarankan versi 20 LTS atau lebih baru)
- Package manager **pnpm** (disarankan) atau **npm**

### 2. Clone Repositori

```bash
git clone https://github.com/username-anda/gamespoi.git
cd gamespoi
```

### 3. Instal Dependensi

Menggunakan **pnpm**:

```bash
pnpm install
```

Atau menggunakan **npm**:

```bash
npm install
```

### 4. Konfigurasi Environment Variables

Salin file `.env.example` menjadi `.env` di direktori utama projek:

```bash
cp .env.example .env
```

Buka file `.env` dan sesuaikan nilai URL endpoint API backend Anda:

```env
VITE_GAME_SEARCH_API_URL=https://url-backend-api-anda.com/api/search
```

### 5. Jalankan Server Pengembangan

Menggunakan **pnpm**:

```bash
pnpm dev
```

Atau menggunakan **npm**:

```bash
npm run dev
```

Aplikasi akan berjalan secara lokal (biasanya di `http://localhost:5173`).

### 6. Build untuk Produksi (Opsional)

Untuk membuat versi produksi yang teroptimasi:

```bash
pnpm build
pnpm preview
```

---

## Struktur Projek

```text
├── public/                 # Aset statis publik
├── src/
│   ├── assets/
│   │   ├── components/     # Komponen UI (Header, SearchForm, GameList, GameCard, GameDetailModal, Footer)
│   │   ├── data/           # Data dummy untuk pengujian tampilan
│   │   └── scss/           # File styling modular SCSS
│   ├── App.tsx             # Komponen utama & logika integrasi API pencarian
│   └── main.tsx            # Entry point aplikasi React
├── .env.example            # Template konfigurasi environment variable
├── index.html              # Template HTML utama
├── package.json            # Daftar dependensi dan skrip projek
└── vite.config.ts          # Konfigurasi Vite & React Compiler
```

---

## Tim Pengembang

1. **Andika Tangkawarow**
2. **Reyfan Korompis**
3. **Imman Loindong**

## Kredit API

- **Gemini API** — Pemrosesan rekomendasi berbasis AI
- **RAWG API** — Database informasi & metadata game
