"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Kategori Buku', path: '/kategori' },
    { name: 'Daftar Buku', path: '/buku' },
    { name: 'Manajemen Siswa', path: '/siswa' },
    { name: 'Peminjaman Buku', path: '/transaksi/pinjam' },
    { name: 'Pengembalian Buku', path: '/transaksi/kembali' },
  ];

  return (
    <html lang="id">
      <head>
        <title>Sistem Perpustakaan SDN 150 OKU</title>
        <meta name="description" content="Sistem Informasi Perpustakaan SDN 150 OKU untuk digitalisasi data peminjaman buku." />
      </head>
      <body>
        {isLoginPage ? (
          <main>{children}</main>
        ) : (
          <div className="app-container">
            {/* Sidebar (Kiri) */}
            <aside className="sidebar">
              <div className="sidebar-brand">
                📚 Perpustakaan 150 OKU
              </div>
              <ul className="sidebar-menu">
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link 
                        href={item.path} 
                        className={`sidebar-link ${isActive ? 'active' : ''}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Main Wrapper (Kanan) */}
            <div className="main-wrapper">
              {/* Topbar (Atas) */}
              <header className="topbar">
                <div className="topbar-date">
                  📅 {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="topbar-info">
                  <div className="topbar-profile">
                    👤 Petugas Perpustakaan
                  </div>
                  <Link href="/login" className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
                    Logout
                  </Link>
                </div>
              </header>

              {/* Main Content (Tengah) */}
              <main className="main-content">
                {children}
              </main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
