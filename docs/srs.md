# Software Requirements Specification (SRS) - Sistem Perpustakaan SDN 150 OKU

## Tujuan Sistem
Sistem Informasi Perpustakaan SDN 150 OKU wajib dibangun untuk mendigitalkan proses pengelolaan perpustakaan yang sebelumnya dilakukan secara manual menggunakan buku. Sistem ini harus mempercepat proses pencatatan data buku, transaksi peminjaman, dan pengembalian buku, serta mengintegrasikan klasifikasi kategori agar pencarian riwayat peminjaman siswa menjadi lebih mudah dan efisien.

## Aktor Pengguna
1. **Petugas Perpustakaan**: Pengguna dengan hak akses penuh yang wajib melakukan login (username dan password) untuk mengelola data buku, menginput transaksi peminjaman dan pengembalian, serta memantau (monitoring) aktivitas perpustakaan.
2. **Siswa**: Pengguna layanan perpustakaan yang datanya dicatat dalam sistem untuk keperluan pencarian data buku dan melihat riwayat peminjaman.

## Tech Stack
* **Frontend**: React.js / Next.js (Wajib mengimplementasikan antarmuka responsif).
* **Backend**: Node.js dengan Express.js.
* **Database**: PostgreSQL.

## In-Scope Features
Sistem wajib memiliki fitur-fitur berikut:
1. **Autentikasi Petugas**: Petugas wajib bisa melakukan login ke dalam sistem menggunakan username dan password.
2. **Manajemen Kategori (CRUD)**: Sistem wajib bisa menambah, mengubah, dan menghapus Kategori serta Subkategori buku.
3. **Manajemen Buku (CRUD)**: Sistem wajib bisa menambah, mengubah, menghapus, dan mencari data buku (mencakup ID Buku, Judul, Penulis, Stok, dan relasinya ke Kategori).
4. **Manajemen Siswa (CRUD)**: Sistem wajib bisa mendaftarkan dan mengubah data identitas Siswa (mencakup ID Siswa, Nama, Kelas, dan Alamat).
5. **Sistem Pengecekan Stok**: Sistem wajib mengecek ketersediaan stok buku secara otomatis (cekStok()) sebelum transaksi peminjaman disetujui.
6. **Transaksi Peminjaman & Pengembalian**: Sistem wajib mencatat ID Pinjam, Tanggal Pinjam, Tanggal Kembali, serta mengintegrasikannya dengan ID Siswa dan ID Buku.
7. **Riwayat & Monitoring**: Sistem wajib menampilkan riwayat peminjaman buku untuk siswa dan dasbor pemantauan transaksi untuk petugas.

## Out-of-Scope Features
Sistem dilarang menyertakan fitur berikut:
1. Sistem pendaftaran mandiri (registrasi) untuk Siswa. Semua data siswa hanya boleh diinput oleh Petugas Perpustakaan.
2. Integrasi denda keterlambatan uang digital (tidak ada perhitungan denda di dalam spesifikasi).

## Business Rules
1. Satu kategori buku dapat memiliki dan menaungi banyak buku.
2. Satu siswa diizinkan untuk melakukan banyak transaksi peminjaman.
3. Satu buku dapat dipinjam beberapa kali dalam waktu yang berbeda (riwayat berkelanjutan).
4. Transaksi peminjaman hanya boleh dilakukan jika atribut stok pada Class Buku lebih dari 0.
