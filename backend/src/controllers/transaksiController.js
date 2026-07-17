const db = require('../config/db');

// Process borrowing transactions (Business Rule 4: stok must be > 0)
exports.tambahPeminjaman = async (req, res) => {
  const client = await db.pool.connect();
  try {
    const { siswa_id, buku_id, tanggal_pinjam, tanggal_kembali } = req.body;

    if (!siswa_id || !buku_id) {
      return res.status(400).json({ success: false, error: "ID Siswa dan ID Buku wajib diisi" });
    }

    // Start Transaction block
    await client.query('BEGIN');

    // 1. Verify student exists
    const studentCheck = await client.query('SELECT id FROM siswa WHERE id = $1', [siswa_id]);
    if (studentCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, error: "ID Siswa tidak ditemukan" });
    }

    // 2. Verify book exists and select stock
    const bookCheck = await client.query('SELECT id, judul, stok FROM buku WHERE id = $1 FOR UPDATE', [buku_id]);
    if (bookCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, error: "ID Buku tidak ditemukan" });
    }

    const book = bookCheck.rows[0];

    // 3. Business Rule 4: stok must be > 0
    if (book.stok <= 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, error: "Stok buku tidak tersedia (Stok: 0)" });
    }

    // 4. Create Peminjaman Record
    const tPinjam = tanggal_pinjam || new Date().toISOString().split('T')[0];
    const tKembali = tanggal_kembali || null;
    
    const insertTxQuery = `
      INSERT INTO peminjaman (siswa_id, buku_id, tanggal_pinjam, tanggal_kembali, status)
      VALUES ($1, $2, $3, $4, 'Dipinjam')
      RETURNING *
    `;
    const txResult = await client.query(insertTxQuery, [siswa_id, buku_id, tPinjam, tKembali]);

    // 5. Decrement Book Stock
    await client.query('UPDATE buku SET stok = stok - 1 WHERE id = $1', [buku_id]);

    // Commit Transaction
    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: "Transaksi peminjaman berhasil diproses",
      data: txResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error in tambahPeminjaman:", error);
    res.status(500).json({ success: false, error: "Terjadi kesalahan saat memproses peminjaman" });
  } finally {
    client.release();
  }
};

// Process book return transactions
exports.pengembalianBuku = async (req, res) => {
  const client = await db.pool.connect();
  try {
    const { id, siswa_id, buku_id, tanggal_kembali } = req.body;

    await client.query('BEGIN');

    let peminjamanRecord;

    if (id) {
      // Return by Transaction ID
      const txCheck = await client.query('SELECT * FROM peminjaman WHERE id = $1 FOR UPDATE', [id]);
      if (txCheck.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ success: false, error: "Transaksi peminjaman tidak ditemukan" });
      }
      peminjamanRecord = txCheck.rows[0];
    } else {
      // Return by student and book combination (latest active borrow)
      if (!siswa_id || !buku_id) {
        await client.query('ROLLBACK');
        return res.status(400).json({ success: false, error: "Harap sertakan ID Transaksi atau kombinasi ID Siswa dan ID Buku" });
      }

      const txCheck = await client.query(
        `SELECT * FROM peminjaman 
         WHERE siswa_id = $1 AND buku_id = $2 AND status = 'Dipinjam' 
         ORDER BY tanggal_pinjam DESC LIMIT 1 FOR UPDATE`,
        [siswa_id, buku_id]
      );

      if (txCheck.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ success: false, error: "Transaksi peminjaman aktif tidak ditemukan untuk siswa dan buku ini" });
      }
      peminjamanRecord = txCheck.rows[0];
    }

    // Check status
    if (peminjamanRecord.status === 'Kembali') {
      await client.query('ROLLBACK');
      return res.status(400).json({ success: false, error: "Buku pada transaksi ini sudah dikembalikan sebelumnya" });
    }

    const tRealKembali = tanggal_kembali || new Date().toISOString().split('T')[0];

    // 1. Update status to 'Kembali' and fill real return date
    const updateTxQuery = `
      UPDATE peminjaman
      SET status = 'Kembali', tanggal_kembali = $1
      WHERE id = $2
      RETURNING *
    `;
    const updateResult = await client.query(updateTxQuery, [tRealKembali, peminjamanRecord.id]);

    // 2. Increment Book Stock
    await client.query('UPDATE buku SET stok = stok + 1 WHERE id = $1', [peminjamanRecord.buku_id]);

    await client.query('COMMIT');

    res.json({
      success: true,
      message: "Transaksi pengembalian berhasil diproses. Stok buku telah dinaikkan.",
      data: updateResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error in pengembalianBuku:", error);
    res.status(500).json({ success: false, error: "Terjadi kesalahan saat memproses pengembalian" });
  } finally {
    client.release();
  }
};
