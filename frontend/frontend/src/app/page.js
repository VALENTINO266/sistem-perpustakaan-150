"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Scaffold redirect to /login by default
    router.replace('/login');
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <div className="loading-spinner"></div>
      <p style={{ marginLeft: '12px' }}>Mengarahkan ke halaman login...</p>
    </div>
  );
}
