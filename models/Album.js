// filepath: /C:/Users/Ahmad Diaz Ilyasha/Documents/web-kelas/models/Album.js
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    judul: String,
    deskripsi: String,
    gambar: String
});

module.exports = mongoose.model('Album', albumSchema);