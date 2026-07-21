# Software Requirements Specification (SRS) - Sistem Perpustakaan SDN 150 OKU

## Tujuan Sistem
Sistem Informasi Perpustakaan SDN 150 OKU wajib dibangun untuk mendigitalkan proses pengelolaan perpustakaan yang sebelumnya dilakukan secara manual menggunakan buku. Sistem ini harus mempercepat proses pencatatan data buku, transaksi peminjaman, dan pengembalian buku, serta mengintegrasikan klasifikasi kategori agar pencarian riwayat peminjaman siswa menjadi lebih mudah dan efisien.

## Aktor Pengguna
1. **Petugas Perpustakaan**: Pengguna dengan hak akses penuh yang wajib melakukan login (username dan password) untuk mengelola data buku, menginput transaksi peminjaman dan pengembalian, serta memantau (monitoring) aktivitas perpustakaan.
2. **Siswa**: Pengguna layanan perpustakaan yang datanya dicatat dalam sistem untuk keperluan pencarian data buku dan melihat riwayat peminjaman.

## Stakeholder

| Stakeholder | Peran | Kepentingan |
|-------------|-------|-------------|
| Petugas Perpustakaan | Pengguna utama sistem | Mengelola data buku, data siswa, transaksi peminjaman, dan pengembalian buku. |
| Siswa | Pengguna layanan perpustakaan | Memanfaatkan layanan perpustakaan dan memiliki riwayat peminjaman yang tercatat dalam sistem. |
| SDN 150 OKU | Pemilik sistem | Mendukung digitalisasi pengelolaan perpustakaan agar proses administrasi menjadi lebih efektif. |

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

## Functional Requirements

| ID | Functional Requirement |
|----|-------------------------|
| FR-01 | Sistem harus menyediakan fitur login bagi petugas menggunakan username dan password. |
| FR-02 | Sistem harus menyediakan pengelolaan kategori dan subkategori buku. |
| FR-03 | Sistem harus menyediakan pengelolaan data buku. |
| FR-04 | Sistem harus menyediakan pengelolaan data siswa. |
| FR-05 | Sistem harus melakukan pengecekan stok sebelum proses peminjaman dilakukan. |
| FR-06 | Sistem harus mencatat transaksi peminjaman buku. |
| FR-07 | Sistem harus mencatat transaksi pengembalian buku. |
| FR-08 | Sistem harus menampilkan riwayat peminjaman siswa. |
| FR-09 | Sistem harus menampilkan dashboard monitoring perpustakaan. |

## Out-of-Scope Features
Sistem dilarang menyertakan fitur berikut:
1. Sistem pendaftaran mandiri (registrasi) untuk Siswa. Semua data siswa hanya boleh diinput oleh Petugas Perpustakaan.
2. Integrasi denda keterlambatan uang digital (tidak ada perhitungan denda di dalam spesifikasi).

## Non Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | Sistem dapat diakses melalui browser modern. |
| NFR-02 | Antarmuka sistem bersifat responsif. |
| NFR-03 | Sistem menggunakan PostgreSQL sebagai basis data. |
| NFR-04 | Sistem menggunakan autentikasi login untuk membatasi akses pengguna. |
| NFR-05 | Sistem dikembangkan menggunakan Next.js dan Express.js. |

## Business Rules

1. Satu kategori dapat memiliki banyak buku.

2. Satu siswa dapat melakukan lebih dari satu transaksi peminjaman.

3. Satu buku dapat dipinjam berkali-kali pada waktu yang berbeda.

4. Transaksi peminjaman hanya dapat dilakukan apabila stok buku masih tersedia.

5. Status transaksi berubah menjadi **Dikembalikan** setelah proses pengembalian selesai.

## Use Case Summary

| Aktor | Aktivitas |
|--------|-----------|
| Petugas | Login, mengelola kategori, mengelola buku, mengelola siswa, melakukan transaksi peminjaman dan pengembalian, serta memantau aktivitas perpustakaan. |
| Siswa | Memanfaatkan layanan perpustakaan dan memiliki riwayat peminjaman yang tercatat dalam sistem. |
