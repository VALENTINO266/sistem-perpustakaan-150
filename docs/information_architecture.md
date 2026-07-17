# Information Architecture (IA)

## Global Layout
Aplikasi web wajib menggunakan struktur antarmuka dasbor standar:
* **Sidebar (Kiri)**: Berisi menu navigasi utama aplikasi yang bersifat statis.
* **Topbar (Atas)**: Berisi informasi profil Petugas yang sedang login, tanggal hari ini, dan tombol Logout.
* **Main Content (Tengah/Kanan)**: Area dinamis yang menampilkan tabel data, form input, atau detail transaksi sesuai menu yang dipilih.

## Route Map & Navigasi
* `/login` (Unauthenticated) - Halaman wajib bagi Petugas untuk memasukkan kredensial sebelum mengakses sistem.
* `/dashboard` (Authenticated) - Halaman beranda utama. Menampilkan ringkasan/monitoring total buku, total siswa, dan transaksi hari ini.
* `/kategori` (Authenticated) - Halaman untuk mengelola (tambah, ubah, hapus) data namaKategori dan subKategori.
* `/buku` (Authenticated) - Halaman tabel daftar buku. Terdapat fitur pencarian buku dan form untuk mengelola atribut buku (Judul, Penulis, Stok).
* `/siswa` (Authenticated) - Halaman manajemen anggota/siswa. Memiliki sub-halaman `/siswa/[idSiswa]/riwayat` untuk melihat detail history peminjaman.
* `/transaksi` (Authenticated) - Halaman utama sirkulasi.
  * `/transaksi/pinjam`: Form untuk memproses tambahPeminjaman().
  * `/transaksi/kembali`: Form untuk memproses pengembalianBuku().
