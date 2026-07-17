# UC-004: Login Petugas

* **Aktor**: Petugas Perpustakaan
* **Pre-condition**: Petugas berada di halaman `/login` dan belum terautentikasi.
* **Main Flow (Alur Utama)**:
  1. Petugas memasukkan Username dan Password ke dalam form login.
  2. Petugas menekan tombol "Masuk".
  3. Sistem memvalidasi kredensial ke database.
  4. Autentikasi berhasil, sistem membuat sesi (session/token) login.
* **Alternative/Exception Flow**:
  * Jika username atau password salah, sistem memunculkan *toast notification* warna merah bertuliskan "Kredensial tidak valid".
* **Post-condition**: Petugas berhasil masuk dan langsung diarahkan (*redirect*) ke halaman `/dashboard`.