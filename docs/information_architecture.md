# Information Architecture (IA) - Sistem Perpustakaan SDN 150 OKU

## Deskripsi

Information Architecture (IA) menjelaskan struktur navigasi dan organisasi halaman pada Sistem perpustakaan SDN 150 OKU. Tujuannya adalah memastikan pengguna dapat mengakses setiap fitur dengan alur yang jelas, mudah dipahami, dan konsisten.


## Global Layout

Aplikasi menggunakan struktur antarmuka dashboard yang terdiri dari tiga bagian utama:

### Sidebar (Kiri)

Berfungsi sebagai menu navigasi utama yang selalu ditampilkan pada setiap halaman setelah pengguna berhasil login. Menu yang tersedia meliputi:

- Dashboard
- Kategori
- Buku
- Siswa
- Transaksi
- Logout

### Topbar (Atas)

Menampilkan informasi pengguna yang sedang login beserta fungsi pendukung, seperti:

- Nama petugas
- Tanggal saat ini
- Tombol Logout

### Main Content

Area utama yang digunakan untuk menampilkan isi halaman sesuai menu yang dipilih, seperti tabel data, formulir input, maupun detail transaksi.


## Route Map 

| Route | Hak Akses | Deskripsi |
|--------|-----------|-----------|
| `/login` | Unauthenticated | Halaman login petugas. |
| `/dashboard` | Authenticated | Menampilkan ringkasan jumlah buku, siswa, dan aktivitas perpustakaan. |
| `/kategori` | Authenticated | Mengelola data kategori dan subkategori buku. |
| `/buku` | Authenticated | Mengelola data buku serta pencarian buku. |
| `/siswa` | Authenticated | Mengelola data siswa perpustakaan. |
| `/siswa/[idSiswa]/riwayat` | Authenticated | Menampilkan riwayat peminjaman siswa. |
| `/transaksi` | Authenticated | Halaman utama transaksi perpustakaan. |
| `/transaksi/pinjam` | Authenticated | Form transaksi peminjaman buku. |
| `/transaksi/kembali` | Authenticated | Form transaksi pengembalian buku. |

## Struktur Navigasi

```text
Login
   │
   ▼
Dashboard
   │
   ├── Kategori
   │
   ├── Buku
   │
   ├── Siswa
   │      │
   │      └── Riwayat Peminjaman
   │
   └── Transaksi
          ├── Pinjam
          └── Kembali
```

## Alur Navigasi Pengguna

1. Petugas membuka halaman **Login**.
2. Setelah autentikasi berhasil, sistem mengarahkan pengguna ke **Dashboard**.
3. Dari Dashboard, petugas dapat mengakses menu:
   - Kategori
   - Buku
   - Siswa
   - Transaksi
4. Seluruh aktivitas pengelolaan data dilakukan melalui menu tersebut.
5. Setelah selesai menggunakan aplikasi, petugas dapat keluar melalui menu **Logout**.

## Prinsip Navigasi 

- Seluruh halaman selain **Login** hanya dapat diakses setelah autentifikasi berhasil.
- Sidebar selalu ditampilkan untuk memudahkan perpindahan antar menu.
- Setiap menu memiliki fungsi yang spesifik sehingga alur penggunaan lebih sederhana dan mudah dipahami.
