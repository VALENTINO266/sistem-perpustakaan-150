"use client";

import { useState } from 'react';

export default function Buku() {
  const [books, setBooks] = useState([
    { id: "B001", judul: "Matematika SD Kelas V", penulis: "Prof. Suparman", stok: 12, kategori: "Pelajaran" },
    { id: "B002", judul: "Kamus Lengkap Indonesia-Inggris", penulis: "Drs. John M.", stok: 4, kategori: "Referensi" },
    { id: "B003", judul: "Si Kancil dan Buaya", penulis: "Kak Seto", stok: 0, kategori: "Fiksi" }, // Stok 0 to show warning state
    { id: "B004", judul: "Sains Alam Semesta", penulis: "Dr. Albert", stok: 2, kategori: "Pelajaran" } // Stok 2 to show low stock warning
  ]);

  const [search, setSearch] = useState('');
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [stok, setStok] = useState('');
  const [kategori, setKategori] = useState('Fiksi');

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!judul || !penulis) return;
    const newBook = {
      id: `B00${books.length + 1}`,
      judul,
      penulis,
      stok: parseInt(stok) || 0,
      kategori
    };
    setBooks([...books, newBook]);
    setJudul('');
    setPenulis('');
    setStok('');
  };

  const filteredBooks = books.filter(b =>
    b.judul.toLowerCase().includes(search.toLowerCase()) ||
    b.penulis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Manajemen Buku</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'start' }}>
        {/* Form Tambah Buku */}
        <div className="card">
          <h2>Tambah Buku Baru</h2>
          <form onSubmit={handleAddBook}>
            <div className="form-group">
              <label className="form-label">Judul Buku</label>
              <input
                type="text"
                className="form-control"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Masukkan judul buku"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Penulis</label>
              <input
                type="text"
                className="form-control"
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
                placeholder="Nama penulis"
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Stok</label>
                <input
                  type="number"
                  className="form-control"
                  value={stok}
                  onChange={(e) => setStok(e.target.value)}
                  placeholder="Jumlah"
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select
                  className="form-control"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                >
                  <option value="Fiksi">Fiksi</option>
                  <option value="Pelajaran">Pelajaran</option>
                  <option value="Referensi">Referensi</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              Simpan Buku
            </button>
          </form>
        </div>

        {/* Tabel Data Buku */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <h2>Daftar Buku</h2>
            <input
              type="text"
              className="form-control"
              style={{ maxWidth: '240px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari buku..."
            />
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID Buku</th>
                  <th>Judul</th>
                  <th>Penulis</th>
                  <th>Kategori</th>
                  <th>Stok</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <div className="empty-state-icon">📂</div>
                      <p>Belum ada data buku saat ini.</p>
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book) => {
                    let stockBadgeStyle = {
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600'
                    };
                    if (book.stok === 0) {
                      stockBadgeStyle.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                      stockBadgeStyle.color = '#EF4444';
                    } else if (book.stok <= 3) {
                      stockBadgeStyle.backgroundColor = 'rgba(245, 158, 11, 0.15)';
                      stockBadgeStyle.color = '#F59E0B';
                    } else {
                      stockBadgeStyle.backgroundColor = 'rgba(34, 197, 94, 0.15)';
                      stockBadgeStyle.color = '#22C55E';
                    }

                    return (
                      <tr key={book.id}>
                        <td><strong>{book.id}</strong></td>
                        <td>{book.judul}</td>
                        <td>{book.penulis}</td>
                        <td>{book.kategori}</td>
                        <td>
                          <span style={stockBadgeStyle}>
                            {book.stok === 0 ? 'Habis (0)' : book.stok}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '12px' }}>
                            Hapus
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}