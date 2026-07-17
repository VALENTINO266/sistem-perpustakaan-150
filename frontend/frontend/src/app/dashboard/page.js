"use client";

import Link from 'next/link';

export default function Dashboard() {
  // Dummy data for stats
  const stats = [
    { title: "Total Buku", value: 154, desc: "Buku terdaftar di sistem", color: "#0EA5E9" },
    { title: "Total Siswa", value: 89, desc: "Siswa terdaftar aktif", color: "#22C55E" },
    { title: "Transaksi Hari Ini", value: 12, desc: "Peminjaman & pengembalian", color: "#F59E0B" }
  ];

  const recentTransactions = [
    { id: "TX-001", siswa: "Andi Saputra", buku: "Matematika Kelas V", tanggal: "03-07-2026", status: "Dipinjam" },
    { id: "TX-002", siswa: "Siti Rahma", buku: "Kamus Bahasa Indonesia", tanggal: "03-07-2026", status: "Kembali" },
    { id: "TX-003", siswa: "Rian Hidayat", buku: "Sejarah Nasional", tanggal: "02-07-2026", status: "Dipinjam" }
  ];

  return (
    <div>
      <h1 id="dashboard-title">Dasbor Utama</h1>
      <p style={{ color: '#64748B', marginBottom: '24px' }}>Selamat datang kembali di Panel Petugas Perpustakaan SDN 150 OKU.</p>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="card" style={{ borderLeft: `5px solid ${stat.color}`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: '#64748B', fontWeight: '500' }}>{stat.title}</span>
            <span style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B' }}>{stat.value}</span>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>{stat.desc}</span>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="card">
        <h2 style={{ marginBottom: '16px' }}>Aktivitas Transaksi Terakhir</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Nama Siswa</th>
                <th>Judul Buku</th>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td><strong>{tx.id}</strong></td>
                  <td>{tx.siswa}</td>
                  <td>{tx.buku}</td>
                  <td>{tx.tanggal}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: tx.status === 'Dipinjam' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                      color: tx.status === 'Dipinjam' ? '#F59E0B' : '#22C55E'
                    }}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
