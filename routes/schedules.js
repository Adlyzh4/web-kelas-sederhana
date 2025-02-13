// filepath: /C:/Users/Ahmad Diaz Ilyasha/Documents/web-kelas/routes/schedule.js
const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const path = require('path');

// Tampilkan form tambah jadwal
router.get('/tambahjadwal', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/add_schedule.html'));
});

// Tangani pengiriman data jadwal
router.post('/addjadwal', async (req, res) => {
    const { semester, hari, matkul, waktu, lokasi, dosen } = req.body;
    const newSchedule = new Schedule({
        semester,
        hari,
        matkul,
        waktu,
        lokasi,
        dosen
    });
    await newSchedule.save();
    res.redirect('/schedules');
});

// Tampilkan semua jadwal
router.get('/', async (req, res) => {
    const schedules = await Schedule.find();
    res.json(schedules); // Sementara kirim data JSON
});

// Tampilkan jadwal berdasarkan semester
router.get('/jadwal', async (req, res) => {
    const semester = req.query.semester || '1';
    const schedules = await Schedule.find({ semester });
    res.render('jadwal_student', { schedules, semester });
});

module.exports = router;