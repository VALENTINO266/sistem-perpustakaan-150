# UC-003: Kelola Data Buku (CRUD)

* **Aktor**: Petugas Perpustakaan
* **Pre-condition**: Petugas sudah login ke dalam sistem.
* **Main Flow (Alur Utama)**:
  1. Petugas menekan menu "Data Buku" di sidebar.
  2. Petugas menekan tombol "Tambah Buku".
  3. Sistem memunculkan *modal form* input data buku.
  4. Petugas mengisi Judul, Penulis, memilih Kategori, dan memasukkan jumlah Stok.
  5. Petugas menekan tombol "Simpan".
  6. Sistem memvalidasi isian form.
* **Alternative/Exception Flow**:
  * Jika ada kolom wajib yang kosong (misal: Judul belum diisi), sistem memunculkan teks *error* merah di bawah kolom tersebut.
* **Post-condition**: Data buku baru berhasil tersimpan di database PostgreSQL dan langsung muncul di baris paling atas pada tabel daftar buku.