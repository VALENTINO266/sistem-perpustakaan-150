"use client";

import { useState } from 'react';

export default function PinjamBuku() {
  const [siswaId, setSiswaId] = useState('');
  const [bukuId, setBukuId] = useState('');
  const [tanggalPinjam, setTanggalPinjam] = useState(new Date().toISOString().split('T')[0]);
  const [tanggalKembali, setTanggalKembali] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Mock list of books to check stock
  const mockBukuDB = {
    "B001": { judul: "Matematika SD Kelas V", stok: 12 },
    "B002": { judul: "Kamus Lengkap Indonesia-Inggris", stok: 4 },
    "B003": { judul: "Si Kancil dan Buaya", stok: 0 } // Stok 0
  };

  const handlePinjam = (e) => {
    e.preventDefault();

    // Business rule checks
    const book = mockBukuDB[bukuId];
    if (!book) {
      showToast("ID Buku tidak ditemukan!", "danger");
      return;
    }

    // Business Rule 4: Transaksi peminjaman hanya boleh dilakukan jika stok > 0
    if (book.stok <= 0) {
      showToast("Stok buku tidak tersedia!", "danger");
      return;
    }

    showToast(`Peminjaman buku "${book.judul}" berhasil diproses!`, "success");
    // Clear inputs
    setSiswaId('');
    setBukuId('');
    setTanggalKembali('');
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  return (
    <div>
      <h1>Formulir Peminjaman Buku</h1>
      <p style={{ color: '#64748B', marginBottom: '24px' }}>Input ID Siswa dan ID Buku untuk memproses transaksi peminjaman.</p>

      <div style={{ maxWidth: '600px' }}>
        <div className="card">
          <h2>Tambah Peminjaman Baru</h2>
          <form onSubmit={handlePinjam}>
            <div className="form-group">
              <label className="form-label">ID Siswa</label>
              <input 
                type="text" 
                className="form-control" 
                value={siswaId}
                onChange={(e) => setSiswaId(e.target.value)}
                placeholder="Masukkan ID Siswa (contoh: S001)"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">ID Buku</label>
              <input 
                type="text" 
                className="form-control" 
                value={bukuId}
                onChange={(e) => setBukuId(e.target.value)}
                placeholder="Masukkan ID Buku (contoh: B001, B003)"
                required
              />
              {bukuId && mockBukuDB[bukuId] && (
                <div style={{ marginTop: '6px', fontSize: '13px' }}>
                  📖 Buku: <strong>{mockBukuDB[bukuId].judul}</strong> | 
                  Stok: <strong style={{ color: mockBukuDB[bukuId].stok > 0 ? '#22C55E' : '#EF4444' }}>
                    {mockBukuDB[bukuId].stok}
                  </strong>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Tanggal Pinjam</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={tanggalPinjam}
                  onChange={(e) => setTanggalPinjam(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tanggal Kembali</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={tanggalKembali}
                  onChange={(e) => setTanggalKembali(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px', padding: '12px' }}>
              Proses Peminjaman
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
