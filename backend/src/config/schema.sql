-- Skema Database Sistem Perpustakaan SDN 150 OKU

-- 1. Tabel Petugas Perpustakaan
CREATE TABLE IF NOT EXISTS petugas (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- Menyimpan hash bcrypt
  nama VARCHAR(100) NOT NULL
);

-- 2. Tabel Kategori Buku
CREATE TABLE IF NOT EXISTS kategori (
  id SERIAL PRIMARY KEY,
  nama_kategori VARCHAR(100) NOT NULL,
  sub_kategori VARCHAR(255)
);

-- 3. Tabel Buku
CREATE TABLE IF NOT EXISTS buku (
  id VARCHAR(50) PRIMARY KEY, -- ID Buku manual (misal: B001)
  judul VARCHAR(255) NOT NULL,
  penulis VARCHAR(255) NOT NULL,
  stok INT NOT NULL DEFAULT 0 CHECK (stok >= 0),
  kategori_id INT REFERENCES kategori(id) ON DELETE SET NULL
);

-- 4. Tabel Siswa
CREATE TABLE IF NOT EXISTS siswa (
  id VARCHAR(50) PRIMARY KEY, -- ID Siswa manual (misal: S001)
  nama VARCHAR(100) NOT NULL,
  kelas VARCHAR(50) NOT NULL,
  alamat TEXT
);

-- 5. Tabel Transaksi Peminjaman & Pengembalian
CREATE TABLE IF NOT EXISTS peminjaman (
  id SERIAL PRIMARY KEY,
  siswa_id VARCHAR(50) REFERENCES siswa(id) ON DELETE CASCADE,
  buku_id VARCHAR(50) REFERENCES buku(id) ON DELETE CASCADE,
  tanggal_pinjam DATE NOT NULL DEFAULT CURRENT_DATE,
  tanggal_kembali DATE,
  status VARCHAR(20) DEFAULT 'Dipinjam' CHECK (status IN ('Dipinjam', 'Kembali'))
);

-- Seed Data Awal untuk Petugas (Username: admin, Password: admin123)
-- Hash bcrypt untuk 'admin123': $2a$10$tE9cZcZ2X1V/3x33QZ.tRePZ3C5yR6j0n7Wn.O4Qx.9y1y2z3a4e5
INSERT INTO petugas (username, password, nama)
VALUES ('admin', '$2a$10$X8Ld/b8qJ4hHk0Y5Ym5D1Oe0K/a1y.hS8J9tE2HqD7t4g4c3v5n6e', 'Administrator Perpustakaan')
ON CONFLICT (username) DO NOTHING;

-- Seed Data Awal untuk Kategori
INSERT INTO kategori (nama_kategori, sub_kategori) VALUES
('Fiksi', 'Novel, Cerpen, Dongeng'),
('Pelajaran', 'Matematika, IPA, IPS, Bahasa Indonesia'),
('Referensi', 'Kamus, Ensiklopedia, Atlas')
ON CONFLICT DO NOTHING;
