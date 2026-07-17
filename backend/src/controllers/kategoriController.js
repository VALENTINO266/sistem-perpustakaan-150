const db = require('../config/db');

exports.getAllKategori = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM kategori ORDER BY id ASC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, error: "Gagal mengambil data kategori" });
  }
};

exports.createKategori = async (req, res) => {
  try {
    const { nama_kategori, sub_kategori } = req.body;
    if (!nama_kategori) {
      return res.status(400).json({ success: false, error: "Nama kategori wajib diisi" });
    }

    const query = `
      INSERT INTO kategori (nama_kategori, sub_kategori)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await db.query(query, [nama_kategori, sub_kategori || null]);
    res.status(201).json({ success: true, message: "Kategori berhasil ditambahkan", data: result.rows[0] });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, error: "Gagal menyimpan kategori" });
  }
};

exports.updateKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_kategori, sub_kategori } = req.body;

    if (!nama_kategori) {
      return res.status(400).json({ success: false, error: "Nama kategori wajib diisi" });
    }

    const query = `
      UPDATE kategori
      SET nama_kategori = $1, sub_kategori = $2
      WHERE id = $3
      RETURNING *
    `;
    const result = await db.query(query, [nama_kategori, sub_kategori || null, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Kategori tidak ditemukan" });
    }

    res.json({ success: true, message: "Kategori berhasil diperbarui", data: result.rows[0] });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, error: "Gagal memperbarui kategori" });
  }
};

exports.deleteKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM kategori WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Kategori tidak ditemukan" });
    }

    res.json({ success: true, message: "Kategori berhasil dihapus", data: result.rows[0] });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, error: "Gagal menghapus kategori" });
  }
};
