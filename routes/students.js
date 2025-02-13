const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Middleware untuk memastikan direktori uploads ada
const ensureUploadDirExists = (req, res, next) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    next();
};

// Konfigurasi multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Tambah siswa baru
router.post('/addsiswa', ensureUploadDirExists, upload.single('photo'), async (req, res) => {
    try {
        const { name, univ, prodi, angkatan, ig, fb, bio } = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : '';
        const newStudent = new Student({ name, univ, prodi, angkatan, ig, fb, bio, photo });
        await newStudent.save();
        res.redirect('/students');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Edit data siswa
router.post('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Student.findByIdAndUpdate(id, {
            name: req.body.name,
            bio: req.body.bio,
            photo: req.body.photo
        });
        res.redirect('/students');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Hapus data siswa
router.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Student.findByIdAndDelete(id);
        res.redirect('/students');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Tampilkan semua siswa
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students); // Sementara kirim data JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Tampilkan form tambah siswa
router.get('/tambahsiswa', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/add_student.html'));
});

// Tampilkan dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('dashboard', { students });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Tampilkan form admin
router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/admin.html'));
});

module.exports = router;