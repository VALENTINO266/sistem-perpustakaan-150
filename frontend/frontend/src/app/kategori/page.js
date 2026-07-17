"use client";

import { useState } from 'react';

export default function Kategori() {
  const [categories, setCategories] = useState([
    { id: 1, namaKategori: "Fiksi", subKategori: "Novel, Cerpen, Dongeng" },
    { id: 2, namaKategori: "Pelajaran", subKategori: "Matematika, IPA, IPS, Bahasa Indonesia" },
    { id: 3, namaKategori: "Referensi", subKategori: "Kamus, Ensiklopedia, Atlas" }
  ]);

  const [namaKategori, setNamaKategori] = useState('');
  const [subKategori, setSubKategori] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!namaKategori) return;
    const newCat = {
      id: categories.length + 1,
      namaKategori,
      subKategori
    };
    setCategories([...categories, newCat]);
    setNamaKategori('');
    setSubKategori('');
  };

  return (
    <div>
      <h1>Manajemen Kategori Buku</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Form Tambah Kategori */}
        <div className="card">
          <h2>Tambah Kategori Baru</h2>
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label className="form-label">Nama Kategori</label>
              <input 
                type="text" 
                className="form-control" 
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
                placeholder="Misal: Ensiklopedia"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Subkategori (Pisahkan dengan koma)</label>
              <input 
                type="text" 
                className="form-control" 
                value={subKategori}
                onChange={(e) => setSubKategori(e.target.value)}
                placeholder="Misal: Sains, Sejarah, Geografi"
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Simpan Kategori
            </button>
          </form>
        </div>

        {/* Tabel Kategori */}
        <div className="card">
          <h2>Daftar Kategori</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Kategori</th>
                  <th>Subkategori</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td><strong>{cat.namaKategori}</strong></td>
                    <td>{cat.subKategori || '-'}</td>
                    <td>
                      <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '12px' }}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
