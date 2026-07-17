const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Controller for Authentication with Database and bcryptjs
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: "Username dan password wajib diisi" });
    }

    // Query database to find petugas
    const result = await db.query('SELECT * FROM petugas WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: "Username atau password salah" });
    }

    const petugas = result.rows[0];

    // Compare bcrypt hash
    const isMatch = await bcrypt.compare(password, petugas.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Username atau password salah" });
    }

    // Success response (In standard app, this would sign a JWT token, but we return a success response with petugas details)
    return res.json({
      success: true,
      message: "Login berhasil",
      token: "jwt-token-placeholder-for-" + petugas.username,
      petugas: {
        id: petugas.id,
        username: petugas.username,
        nama: petugas.nama
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Terjadi kesalahan pada server" });
  }
};

exports.logout = async (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
};
