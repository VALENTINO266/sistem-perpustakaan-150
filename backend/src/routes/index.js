const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const bukuController = require('../controllers/bukuController');
const kategoriController = require('../controllers/kategoriController');
const siswaController = require('../controllers/siswaController');
const transaksiController = require('../controllers/transaksiController');

// Auth routes
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);

// Kategori routes
router.get('/kategori', kategoriController.getAllKategori);
router.post('/kategori', kategoriController.createKategori);
router.put('/kategori/:id', kategoriController.updateKategori);
router.delete('/kategori/:id', kategoriController.deleteKategori);

// Buku routes
router.get('/buku', bukuController.getAllBuku);
router.get('/buku/:id', bukuController.getBukuById);
router.post('/buku', bukuController.createBuku);
router.put('/buku/:id', bukuController.updateBuku);
router.delete('/buku/:id', bukuController.deleteBuku);
router.get('/buku/:id/cek-stok', bukuController.cekStok);

// Siswa routes
router.get('/siswa', siswaController.getAllSiswa);
router.get('/siswa/:id', siswaController.getSiswaById);
router.post('/siswa', siswaController.createSiswa);
router.put('/siswa/:id', siswaController.updateSiswa);
router.delete('/siswa/:id', siswaController.deleteSiswa);
router.get('/siswa/:id/riwayat', siswaController.getRiwayatSiswa);

// Transaksi routes
router.post('/transaksi/pinjam', transaksiController.tambahPeminjaman);
router.post('/transaksi/kembali', transaksiController.pengembalianBuku);

module.exports = router;
