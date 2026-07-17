# System Logics - Pengecekan Stok & Transaksi

Berikut adalah logika algoritma di sisi *backend* (Node.js) untuk memproses sirkulasi:

## 1. Logika Peminjaman (`tambahPeminjaman`)
* **Trigger**: Saat Petugas menekan tombol Simpan di form peminjaman.
* **Proses Berjalan**:
  1. Sistem melakukan *query* ke database untuk mengecek `stok` buku.
  2. Jika `stok > 0`:
     * Sistem memasukkan data ke tabel `transaksi_peminjaman`.
     * Sistem mengurangi stok: `UPDATE buku SET stok = stok - 1`.
     * Transaksi berhasil.
  3. Jika `stok == 0`:
     * Sistem membatalkan proses *query*.
     * Mengembalikan pesan error ke antarmuka (*frontend*).

## 2. Logika Pengembalian (`pengembalianBuku`)
* **Trigger**: Saat Petugas memproses pengembalian buku.
* **Proses Berjalan**:
  1. Sistem memperbarui data di tabel `transaksi_peminjaman` (mengisi `tanggal_kembali` dan mengubah status).
  2. Sistem menambah stok buku kembali: `UPDATE buku SET stok = stok + 1`.
  3. Transaksi selesai.