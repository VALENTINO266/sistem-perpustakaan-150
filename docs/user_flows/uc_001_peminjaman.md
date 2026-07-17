# UC-001: Proses Peminjaman Buku

* **Aktor**: Petugas Perpustakaan.
* **Pre-condition**: Petugas harus sudah berstatus *login* dan berada di dalam sistem. Data Siswa dan Data Buku sudah terdaftar di database. Stok buku yang akan dipinjam harus > 0.
* **Main Flow (Alur Utama)**:
  1. Petugas menekan menu "Transaksi" di sidebar, lalu memilih sub-menu "Peminjaman".
  2. Sistem menampilkan halaman berisi form peminjaman buku.
  3. Petugas memasukkan ID Siswa dan ID Buku ke dalam form.
  4. Sistem secara otomatis memvalidasi ketersediaan stok buku (`cekStok()`).
  5. Petugas mengatur Tanggal Pinjam dan Tanggal Kembali.
  6. Petugas menekan tombol "Simpan".
  7. Sistem mencatat data transaksi peminjaman dan secara otomatis mengurangi stok buku di database.
* **Alternative/Exception Flow**: 
  * Jika ID Siswa atau ID Buku tidak ditemukan, sistem menampilkan pesan *error* merah di bawah kolom input.
  * Jika stok buku habis (0), sistem memunculkan *toast notification* warna merah (Danger) bertuliskan "Stok buku tidak tersedia" dan proses simpan digagalkan.
* **Post-condition**: Transaksi berhasil dicatat di sistem, stok buku berkurang, dan data riwayat peminjaman siswa diperbarui.
