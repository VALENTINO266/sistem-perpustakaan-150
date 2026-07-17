# Design System - Sistem Perpustakaan SDN 150 OKU

## Warna (Color Palette)
Aplikasi menggunakan skema warna profesional yang cocok untuk instansi pendidikan:
* **Primary**: `#0EA5E9` (Light Blue) - Digunakan untuk tombol utama, navbar, dan tautan aktif.
* **Secondary**: `#F1F5F9` (Slate 100) - Digunakan untuk latar belakang (background) aplikasi dan area netral.
* **Success**: `#22C55E` (Green) - Digunakan untuk status "Tersedia", notifikasi berhasil, dan tombol simpan.
* **Warning**: `#F59E0B` (Amber) - Digunakan untuk status "Stok Menipis" atau peringatan.
* **Danger**: `#EF4444` (Red) - Digunakan untuk aksi destruktif (Hapus Data) dan pesan error.
* **Text Main**: `#1E293B` (Slate 800) - Digunakan untuk teks utama dan heading.
* **Text Muted**: `#64748B` (Slate 500) - Digunakan untuk teks sekunder dan placeholder.

## Tipografi
* **Font Family**: Menggunakan `Inter` atau `Roboto` sebagai font utama.
* **Heading 1 (H1)**: 24px, Font Weight: Bold (digunakan untuk judul halaman).
* **Heading 2 (H2)**: 20px, Font Weight: Semi-Bold (digunakan untuk judul seksi/kartu).
* **Body Text**: 14px atau 16px, Font Weight: Regular (digunakan untuk paragraf dan tabel).

## Komponen UI
* **Button**:
  * Harus memiliki sudut sedikit melengkung (`border-radius: 6px` atau `rounded-md`).
  * Saat *hover*, warna harus sedikit lebih gelap dari warna dasar.
  * Harus memiliki *padding* yang konsisten (misal: `px-4 py-2`).
* **Input Form**:
  * Kolom isian teks harus memiliki garis tepi (border) berwarna abu-abu terang (`border-slate-300`).
  * Saat aktif (fokus), *border* berubah menjadi warna Primary.
  * Sudut melengkung (`rounded-md`).
* **Card & Table**:
  * Menggunakan latar belakang putih (`#FFFFFF`).
  * Memiliki bayangan tipis (`box-shadow: sm` atau `shadow-sm`) untuk memisahkan dari background utama.
  * Tabel harus memiliki garis pemisah antar baris yang tipis.

## State Management Visual
* **Empty State (Data Kosong)**: Menampilkan ilustrasi sederhana atau ikon kotak kosong di tengah layar beserta teks penjelas warna abu-abu (misal: "Belum ada data buku saat ini").
* **Loading State (Memuat)**: Menampilkan animasi *spinner* atau efek *skeleton loading* pada tabel/form saat data sedang diambil dari database.
* **Error State**: Menampilkan *toast notification* (notifikasi melayang) di pojok kanan
