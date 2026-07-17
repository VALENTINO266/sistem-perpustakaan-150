"use client";

import { useEffect, useState } from 'react';

export default function RiwayatPage({ params }) {
    const { idSiswa } = params;
    // Pastikan inisial state-nya adalah array kosong []
    const [riwayat, setRiwayat] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/siswa/${idSiswa}/riwayat`)
            .then(res => res.json())
            .then(data => {
                // Cek apakah data benar-benar array
                if (Array.isArray(data)) {
                    setRiwayat(data);
                } else {
                    console.error("Data bukan array:", data);
                    setRiwayat([]); // Set jadi array kosong biar tidak error
                }
            })
            .catch(err => {
                console.error("Gagal:", err);
                setRiwayat([]);
            });
    }, [idSiswa]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Riwayat Peminjaman Siswa: {idSiswa}</h1>

            {/* Cek dulu apakah riwayat ada isinya sebelum di-map */}
            {riwayat.length > 0 ? (
                <table style={{ width: '100%', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Buku</th>
                            <th>Tanggal Pinjam</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riwayat.map((item, index) => (
                            <tr key={index}>
                                <td>{item.judul_buku}</td>
                                <td>{item.tanggal_pinjam}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Belum ada riwayat peminjaman untuk siswa ini.</p>
            )}
        </div>
    );
}