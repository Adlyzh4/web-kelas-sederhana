// filepath: /C:/Users/Ahmad Diaz Ilyasha/Documents/web-kelas/models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    semester: String,
    hari: String,
    matkul: String,
    waktu: String,
    lokasi: String,
    dosen: String
});

module.exports = mongoose.model('Schedule', scheduleSchema);