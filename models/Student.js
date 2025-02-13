const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    univ: String,
    prodi: String,
    angkatan: String,
    ig: String,
    fb: String,
    bio: String,
    photo: String
});

module.exports = mongoose.model('Student', studentSchema);
