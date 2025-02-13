// filepath: /C:/Users/Ahmad Diaz Ilyasha/Documents/web-kelas/routes/album.js
const express = require('express');
const router = express.Router();
const Album = require('../models/Album');
const path = require('path');
const multer = require('multer')
const fs = require('fs');

// Tampilkan form tambah album
router.get('/tambahalbum', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/add_album.html'));
});

// Pastikan direktori uploads ada
const uploadDir = path.join(__dirname, '../public/uploads/album');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/album/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Tambah siswa baru
router.post('/addalbum', upload.single('gambar'), async (req, res) => {
    const { judul, deskripsi } = req.body;
    const gambar = req.file ? `/uploads/album/${req.file.filename}` : '';
    const newAlbum = new Album({ judul, deskripsi, gambar });
    await newAlbum.save();
    res.redirect('/albums');
});

// Tampilkan semua album
router.get('/', async (req, res) => {
    const albums = await Album.find();
    res.json(albums); // Sementara kirim data JSON
});

// Tampilkan semua album
router.get('/album', async (req, res) => {
    const albums = await Album.find();
    res.render('album_sekolah', { albums });
});

module.exports = router;