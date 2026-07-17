const db = require('../config/db');

// Get all books joining categories
exports.getAllBuku = async (req, res) => {
  try {
    const query = `
      SELECT b.id, b.judul, b.penulis, b.stok, b.kategori_id, k.nama_kategori, k.sub_kategori
      FROM buku b
      LEFT JOIN kategori k ON b.kategori_id = k.id
      ORDER BY b.id ASC
    `;
    const result = await db.query(query);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ success: false, error: "Gagal mengambil data buku" });
  }
};

// Get single book by ID
exports.getBukuById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT b.id, b.judul, b.penulis, b.stok, b.kategori_id, k.nama_kategori, k.sub_kategori
      FROM buku b
      LEFT JOIN kategori k ON b.kategori_id = k.id
      WHERE b.id = $1
    `;
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Buku tidak ditemukan" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ success: false, error: "Gagal mengambil detail buku" });
  }
};

// Create a new book
exports.createBuku = async (req, res) => {
  try {
    const { id, judul, penulis, stok, kategori_id } = req.body;

    if (!id || !judul || !penulis || stok === undefined) {
      return res.status(400).json({ success: false, error: "ID Buku, Judul, Penulis, dan Stok wajib diisi" });
    }

    // Check if ID already exists
    const duplicateCheck = await db.query('SELECT id FROM buku WHERE id = $1', [id]);
    if (duplicateCheck.rows.length > 0) {
      return res.status(400).json({ success: false, error: "ID Buku sudah terdaftar" });
    }

    const query = `
      INSERT INTO buku (id, judul, penulis, stok, kategori_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await db.query(query, [id, judul, penulis, parseInt(stok), kategori_id || null]);
    
    res.status(201).json({ success: true, message: "Buku berhasil disimpan", data: result.rows[0] });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ success: false, error: "Gagal menyimpan buku baru" });
  }
};

// Update an existing book
exports.updateBuku = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, penulis, stok, kategori_id } = req.body;

    if (!judul || !penulis || stok === undefined) {
      return res.status(400).json({ success: false, error: "Judul, Penulis, dan Stok wajib diisi" });
    }

    const query = `
      UPDATE buku
      SET judul = $1, penulis = $2, stok = $3, kategori_id = $4
      WHERE id = $5
      RETURNING *
    `;
    const result = await db.query(query, [judul, penulis, parseInt(stok), kategori_id || null, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Buku tidak ditemukan" });
    }

    res.json({ success: true, message: "Buku berhasil diperbarui", data: result.rows[0] });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ success: false, error: "Gagal memperbarui data buku" });
  }
};

// Delete a book
exports.deleteBuku = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM buku WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Buku tidak ditemukan" });
    }

    res.json({ success: true, message: "Buku berhasil dihapus", data: result.rows[0] });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ success: false, error: "Gagal menghapus buku" });
  }
};

// Business Rule 4: Transaksi peminjaman hanya boleh dilakukan jika atribut stok pada Class Buku lebih dari 0.
// Self checking API
exports.cekStok = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT id, judul, stok FROM buku WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Buku tidak ditemukan" });
    }

    const book = result.rows[0];
    res.json({
      success: true,
      buku_id: book.id,
      judul: book.judul,
      stok: book.stok,
      available: book.stok > 0
    });
  } catch (error) {
    console.error("Error checking book stock:", error);
    res.status(500).json({ success: false, error: "Gagal mengecek stok buku" });
  }
};
