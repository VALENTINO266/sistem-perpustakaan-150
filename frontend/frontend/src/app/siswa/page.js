"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Siswa() {
  const [students, setStudents] = useState([
    { id: "S001", nama: "Andi Saputra", kelas: "Kelas V-A", alamat: "Jl. Merdeka No. 10" },
    { id: "S002", nama: "Siti Rahma", kelas: "Kelas VI-B", alamat: "Jl. Sudirman No. 45" },
    { id: "S003", nama: "Rian Hidayat", kelas: "Kelas IV-A", alamat: "Perum Indah Blok C" }
  ]);

  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [alamat, setAlamat] = useState('');

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!nama) return;
    const newStudent = {
      id: `S00${students.length + 1}`,
      nama,
      kelas,
      alamat
    };
    setStudents([...students, newStudent]);
    setNama('');
    setKelas('');
    setAlamat('');
  };

  return (
    <div>
      <h1>Manajemen Siswa</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'start' }}>
        {/* Form Register Siswa */}
        <div className="card">
          <h2>Daftarkan Siswa Baru</h2>
          <form onSubmit={handleAddStudent}>
            <div className="form-group">
              <label className="form-label">Nama Siswa</label>
              <input 
                type="text" 
                className="form-control" 
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama lengkap siswa"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Kelas</label>
              <input 
                type="text" 
                className="form-control" 
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                placeholder="Misal: Kelas V-A"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Alamat</label>
              <textarea 
                className="form-control" 
                rows="3"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat rumah"
                style={{ resize: 'vertical' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Daftarkan Siswa
            </button>
          </form>
        </div>

        {/* Tabel Siswa */}
        <div className="card">
          <h2>Daftar Anggota / Siswa</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID Siswa</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Alamat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td><strong>{student.id}</strong></td>
                    <td>{student.nama}</td>
                    <td>{student.kelas}</td>
                    <td>{student.alamat || '-'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link href={`/siswa/${student.id}/riwayat`} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          Riwayat
                        </Link>
                        <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          Hapus
                        </button>
                      </div>
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
