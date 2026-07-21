# System Logics - Sistem Perpustakaan SDN 150 OKU

## Deskripsi

System Logic menjelaskan alus proses bisnis utama pada backend sistem, khususnya proses pemninjaman dan pengembalian buku. Logika ini memastikan data transaksi dan stok buku selalu konsisten di dalam database PostgreSQL.


## 1. Logika Peminjaman (`tambahPeminjaman`)

### Trigger

Petugas menekan tombol **Simpan** pada form peminjaman.

### Alur Proses

1. Sistem menerima data peminjaman dari frontend.
2. Sistem memvalidasi data siswa dan buku yang dipilih.
3. Sistem melakukan pengecekan stok buku pada database.
4. Jika stok buku lebih dari 0:
   - Sistem menyimpan data transaksi ke tabel `transaksi_peminjaman`.
   - Sistem mengurangi stok buku sebanyak 1.
   - Sistem mengembalikan pesan bahwa transaksi berhasil.
5. Jika stok buku sama dengan 0:
   - Sistem membatalkan proses transaksi.
   - Sistem mengirimkan pesan bahwa stok buku tidak tersedia.
  
### Output

- Data transaksi berhasil disimpan.
- Stok buku berkurang.
- Status transaksi menjadi **Dipinjam**.


## 2. Logika Pengembalian (`pengembalianBuku`)

### Trigger

Petugas memilih transaksi yang akan dikembalikan kemudian menekan tombol **Dikembalikan**.

### Alur Proses

1. Sistem mencari data transaksi berdasarkan ID transaksi.
2. Sistem memperbarui tanggal pengembalian.
3. Sistem mengubah status transaksi menjadi **Dikembalikan**.
4. Sistem menambahkan stok buku sebanyak 1.
5. Sistem mengirimkan notifikasi bahwa proses pengembalian berhasil.

### Output

- Status transaksi berubah menjadi **Dikembalikan**.
- Tanggal pengembalian tercatat.
- Stok buku bertambah.

## Flow Proses

```text
Petugas
   │
   ▼
Input Data Peminjaman
   │
   ▼
Validasi Data
   │
   ▼
Cek Stok Buku
   │
   ├── Stok > 0
   │      │
   │      ▼
   │ Simpan Transaksi
   │      │
   │      ▼
   │ Kurangi Stok
   │      │
   │      ▼
   │ Transaksi Berhasil
   │
   └── Stok = 0
          │
          ▼
     Tampilkan Pesan
     "Stok Buku Habis"
```

## Business Rules

- Transaksi peminjaman hanya dapat dilakukan apabila stok buku masih tersedia.
- Setiap transaksi peminjaman akan mengurangi stok buku sebanyak satu.
- Setiap transaksi pengembalian akan menambah stok buku sebanyak satu.
- Status transaksi hanya memiliki dua nilai, yaitu **Dipinjam** dan **Dikembalikan**.
- Data transaksi tidak dihapus agar riwayat peminjaman tetap tersimpan.
