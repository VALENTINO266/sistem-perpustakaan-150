# Data Model - Sistem Perpustakaan SDN 150 OKU

## Deskripsi

Data model menjelaskan struktur basis data yang digunakan pada Sistem Perpustakaan SDN 150 OKU. Sistem menggunakan database relasional PostgreSQL yang terdiri dari empat entitas utama, yaitu kategori, buku, siswa, dan transaksi peminjaman. Setiap entitas saling berhubungan untuk mendukung proses pengelolaan secara terintegrasi.

## Entity Relationship

Hubungan antar entitas pada sistem adalah sebagai berikut:

- Satu kategori dapat memiliki banyak buku (One-to-Many).
- Satu buku dapat memiliki banyak transaksi peminjaman (One-to_Many).
- Satu siswa dapat memiliki banyak transaksi peminjamana (One-to-Many).
- Setiap transaksi peminjaman hanya berkaitan dengan satu buku dan satu siswa.


## Tabel Kategori

| Atribut | Tipe Data | Keterangan |
|----------|-----------|------------|
| id_kategori | UUID | Primary Key |
| nama_kategori | VARCHAR(100) | Nama kategori buku |
| sub_kategori | VARCHAR(100) | Subkategori buku |


## Tabel Buku

| Atribut | Tipe Data | Keterangan |
|----------|-----------|------------|
| id_buku | UUID | Primary Key |
| id_kategori | UUID | Foreign Key → kategori.id_kategori |
| judul | VARCHAR(255) | Judul buku |
| penulis | VARCHAR(150) | Nama penulis |
| stok | INTEGER | Jumlah stok buku |


## Tabel Siswa

| Atribut | Tipe Data | Keterangan |
|----------|-----------|------------|
| id_siswa | VARCHAR(50) | Primary Key (Nomor Induk Siswa) |
| nama_lengkap | VARCHAR(150) | Nama siswa |
| kelas | VARCHAR(20) | Kelas siswa |
| alamat | TEXT | Alamat siswa |


## Tabel Transaksi Peminjaman

| Atribut | Tipe Data | Keterangan |
|----------|-----------|------------|
| id_pinjam | UUID | Primary Key |
| id_siswa | VARCHAR(50) | Foreign Key → siswa.id_siswa |
| id_buku | UUID | Foreign Key → buku.id_buku |
| tanggal_pinjam | DATE | Tanggal peminjaman |
| tanggal_kembali | DATE | Tanggal pengembalian |
| status | VARCHAR(20) | Status transaksi (Dipinjam/Dikembalikan) |

## Relasi Antar Tabel

| Tabel Asal | Kardinalitas | Tabel Tujuan |
|-------------|--------------|--------------|
| kategori | 1 : N | buku |
| buku | 1 : N | transaksi_peminjaman |
| siswa | 1 : N | transaksi_peminjaman |

## Entity Relationship Diagram (Konseptual)

```text
kategori
    │
    │ 1
    │
    └──────────────< buku
                        │
                        │ 1
                        │
                        └──────────────< transaksi_peminjaman >────────────── siswa
                                                              N             1
```
