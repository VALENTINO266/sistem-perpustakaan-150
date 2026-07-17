"use client";

import { useState } from 'react';

export default function KembaliBuku() {
  const [transaksiId, setTransaksiId] = useState('');
  const [bukuId, setBukuId] = useState('');
  const [siswaId, setSiswaId] = useState('');
  const [tanggalKembali, setTanggalKembali] = useState(new Date().toISOString().split('T')[0]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleKembali = (e) => {
    e.preventDefault();
    
    // Simulate successful return which updates book stock (increment)
    showToast(`Pengembalian buku untuk transaksi ${transaksiId || 'baru'} berhasil diproses. Stok buku telah dikembalikan!`, "success");
    
    setTransaksiId('');
    setBukuId('');
    setSiswaId('');
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  return (
    <div>
      <h1>Formulir Pengembalian Buku</h1>
      <p style={{ color: '#64748B', marginBottom: '24px' }}>Input ID Transaksi atau detail Siswa & Buku untuk memproses pengembalian.</p>

      <div style={{ maxWidth: '600px' }}>
        <div className="card">
          <h2>Proses Pengembalian</h2>
          <form onSubmit={handleKembali}>
            <div className="form-group">
              <label className="form-label">ID Transaksi Peminjaman (Opsional)</label>
              <input 
                type="text" 
                className="form-control" 
                value={transaksiId}
                onChange={(e) => setTransaksiId(e.target.value)}
                placeholder="Masukkan ID Transaksi (contoh: TX-001)"
              />
            </div>

            <div style={{ borderTop: '1px dashed #E2E8F0', margin: '20px 0', position: 'relative' }}>
              <span style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#FFFFFF',
                padding: '0 12px',
                fontSize: '12px',
                color: '#94A3B8',
                fontWeight: '500'
              }}>
                ATAU MASUKKAN DETAIL
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">ID Siswa</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={siswaId}
                  onChange={(e) => setSiswaId(e.target.value)}
                  placeholder="ID Siswa"
                  required={!transaksiId}
                />
              </div>
              <div className="form-group">
                <label className="form-label">ID Buku</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={bukuId}
                  onChange={(e) => setBukuId(e.target.value)}
                  placeholder="ID Buku"
                  required={!transaksiId}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tanggal Pengembalian Riil</label>
              <input 
                type="date" 
                className="form-control" 
                value={tanggalKembali}
                onChange={(e) => setTanggalKembali(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success" style={{ width: '100%', marginTop: '16px', padding: '12px' }}>
              Proses Pengembalian Buku
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
