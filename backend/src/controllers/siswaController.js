const db = require('../config/db');

// Get all students
exports.getAllSiswa = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM siswa ORDER BY id ASC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, error: "Gagal mengambil data siswa" });
  }
};

// Get single student by ID
exports.getSiswaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM siswa WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Siswa tidak ditemukan" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ success: false, error: "Gagal mengambil data siswa" });
  }
};

// Create a new student
exports.createSiswa = async (req, res) => {
  try {
    const { id, nama, kelas, alamat } = req.body;

    if (!id || !nama || !kelas) {
      return res.status(400).json({ success: false, error: "ID Siswa, Nama, dan Kelas wajib diisi" });
    }

    // Check duplication
    const duplicateCheck = await db.query('SELECT id FROM siswa WHERE id = $1', [id]);
    if (duplicateCheck.rows.length > 0) {
      return res.status(400).json({ success: false, error: "ID Siswa sudah terdaftar" });
    }

    const query = `
      INSERT INTO siswa (id, nama, kelas, alamat)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await db.query(query, [id, nama, kelas, alamat || null]);
    res.status(201).json({ success: true, message: "Siswa berhasil didaftarkan", data: result.rows[0] });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ success: false, error: "Gagal mendaftarkan siswa baru" });
  }
};

// Update student profile
exports.updateSiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, kelas, alamat } = req.body;

    if (!nama || !kelas) {
      return res.status(400).json({ success: false, error: "Nama dan Kelas wajib diisi" });
    }

    const query = `
      UPDATE siswa
      SET nama = $1, kelas = $2, alamat = $3
      WHERE id = $4
      RETURNING *
    `;
    const result = await db.query(query, [nama, kelas, alamat || null, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Siswa tidak ditemukan" });
    }

    res.json({ success: true, message: "Profil siswa berhasil diperbarui", data: result.rows[0] });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ success: false, error: "Gagal memperbarui data siswa" });
  }
};

// Delete student profile
exports.deleteSiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM siswa WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Siswa tidak ditemukan" });
    }

    res.json({ success: true, message: "Data siswa berhasil dihapus", data: result.rows[0] });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ success: false, error: "Gagal menghapus data siswa" });
  }
};

// Get borrowing history of a specific student
exports.getRiwayatSiswa = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if student exists first
    const studentCheck = await db.query('SELECT nama FROM siswa WHERE id = $1', [id]);
    if (studentCheck.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Siswa tidak ditemukan" });
    }

    const query = `
      SELECT p.id, p.buku_id, b.judul AS judul_buku, p.tanggal_pinjam, p.tanggal_kembali, p.status
      FROM peminjaman p
      JOIN buku b ON p.buku_id = b.id
      WHERE p.siswa_id = $1
      ORDER BY p.tanggal_pinjam DESC
    `;
    const result = await db.query(query, [id]);

    res.json({
      success: true,
      siswa: {
        id,
        nama: studentCheck.rows[0].nama
      },
      riwayat: result.rows
    });
  } catch (error) {
    console.error("Error fetching student borrow history:", error);
    res.status(500).json({ success: false, error: "Gagal mengambil riwayat transaksi siswa" });
  }
};
