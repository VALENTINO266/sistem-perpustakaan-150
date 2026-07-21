# Perpustakaan Digital SDN 150 OKU

## Deskripsi Singkat
Perpustakaan SDN 150 OKU adalah aplikasi manajemen perpustakaan berbasis web yang dirancang untuk mendigitalisasi sirkulasi buku secara praktis dan efektif. Aplikasi ini menyediakan kemudahan bagi petugas dalam mengelola stok buku serta data keanggotaan siswa guna meningkatkan efisiensi layanan literasi di sekolah.

### Fitur Utama
- **Dashboard**
  - Menampilkan informasi jumlah buku, jumlah siswa, transaksi peminjaman, serta ringkasan aktivitas perpustakaan.
- **Manajemen Kategori**
  - Menambah, mengubah, dan menghapus kategori serta sub-kategori buku.
- **Manajemen Buku**
  - Mengelola data buku meliputi penambahan,perubahan, penghapusan, pencarian buku, dan pemantauan stok buku.
- **Manajemen Siswa**
  - Mengelola data anggota perpustakaan serta melihat riwayat peminjaman setiap siswa.
- **Transaksi Peminjaman dan Pengembalian**
  - Mencatat transaksi peminjaman dan pengembalian buku secara digitalserta melakukan pengecekan ketersediaan stok buku sebelum proses peminjman dilakukan.
- **Monitoring**
  - Menampilkan riwayat transaksi peminjaman dan oengembalian untuk memudahkan pengawasan aktivitas perpustakaan.
    
## Anggota Tim dan Pembagian Peran
- Candra Valentino (2200016023) - Project lead, Databasedesign
- Pimpin Dwi Wibowo (2200016065) - Backend Developer
- Milzamulhaq (2200016054) - Frontend Developer
- Surya Dirgantara (2100016080) - QA Testing

## Teknologi yang Digunakan
- Frontend: Next.js 
- Backend: Node.js 
- Database: PostgreSQL

## Struktur Repository
sistem-perpustakaan-150/
|--- backend/
|--- frontend/
|--- docs/
|--- database_sdn150.sql
|--- README.md

## Dokumentasi
Dokumentasi pengembangan sistem tersedia pada folder **docs**, yang meliputi:
- Software Requirement Specification (SRS)
- Data Model
- Information Architecture
- Design System

## Cara Menjalankan Aplikasi
### 1. Clone Repository

git clone https://github.com/VALENTINO266/sistem-perpustakaan-150.git
cd sistem-perpustakaan-150

### 2. Masuk ke Folder Project

cd sistem-perpustakaan-150

### 3. Jalankan Backend

cd backend
npm instal
npm run dev

### 4. Jalankan Frontend

cd frontend
npm install
npm run dev

### 5. Buka Browser

http://localhost:3000


## Tautan Penting
- **Deployment**
  http://localhost:3000/dashboard (link deploy)
- **Repository GitHub**
  https://github.com/VALENTINO266/sistem-perpustakaan-150
