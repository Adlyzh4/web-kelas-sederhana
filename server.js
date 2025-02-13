const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const fileUpload = require('express-fileupload');
const studentRoutes = require('./routes/students');
const scheduleRoutes = require('./routes/schedules');
const albumRoutes = require('./routes/albums');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(fileUpload());
app.use(express.static('public'));
app.use('/students', studentRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/albums', albumRoutes)

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk menangani 404
app.use((req, res, next) => {
    res.status(404).send('Halaman tidak ditemukan!');
});

// Middleware untuk menangani error server
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Terjadi kesalahan pada server!');
});


// Sambungkan MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database terkoneksi!'))
    .catch(err => console.error('Koneksi gagal:', err));

// Rute dasar
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


// // Rute untuk add_student.html
// app.get('/add_student', (req, res) => {
//     res.sendFile(__dirname + '/views/add_student.html');
// });

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

