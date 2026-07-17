# Data Model - Sistem Perpustakaan SDN 150 OKU

Sistem ini menggunakan *database* relasional (PostgreSQL) dengan struktur tabel berikut:

## 1. Tabel `kategori`
* `id_kategori` (Primary Key, UUID)
* `nama_kategori` (VARCHAR 100, Not Null)
* `sub_kategori` (VARCHAR 100)

## 2. Tabel `buku`
* `id_buku` (Primary Key, UUID)
* `id_kategori` (Foreign Key -> kategori.id_kategori)
* `judul` (VARCHAR 255, Not Null)
* `penulis` (VARCHAR 150, Not Null)
* `stok` (INT, Default 0)

## 3. Tabel `siswa`
* `id_siswa` (Primary Key, VARCHAR 50) - Menyimpan Nomor Induk Siswa.
* `nama_lengkap` (VARCHAR 150, Not Null)
* `kelas` (VARCHAR 20, Not Null)
* `alamat` (TEXT)

## 4. Tabel `transaksi_peminjaman`
* `id_pinjam` (Primary Key, UUID)
* `id_siswa` (Foreign Key -> siswa.id_siswa)
* `id_buku` (Foreign Key -> buku.id_buku)
* `tanggal_pinjam` (DATE, Not Null)
* `tanggal_kembali` (DATE, Nullable) - Baru terisi saat buku dikembalikan.
* `status` (VARCHAR 20) - Berisi nilai 'Dipinjam' atau 'Dikembalikan'.