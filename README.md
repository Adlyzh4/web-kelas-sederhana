# Web Kelas

Web Kelas adalah aplikasi web untuk mengelola jadwal kelas, album, dan data siswa.

## Fitur

- Mengelola jadwal kelas
- Mengelola album
- Mengelola data siswa

## Instalasi

1. Clone repositori ini:

    ```sh
    git clone https://github.com/username/web-kelas.git
    cd web-kelas
    ```

2. Instal dependensi:

    ```sh
    npm install
    ```

3. Buat file  di root direktori proyek Anda dan tambahkan variabel lingkungan berikut:

    ```env
    MONGODB_URI=your_mongodb_uri
    PORT=3000
    ```

4. Jalankan aplikasi:

    ```sh
    npm start
    ```

## Struktur Proyek

- : Berisi skema Mongoose untuk koleksi MongoDB.
- : Berisi rute Express untuk menangani permintaan HTTP.
- : Berisi template EJS untuk rendering halaman HTML.
- : Berisi file statis seperti CSS, gambar, dan JavaScript.
- : File utama untuk menjalankan server Express.

## API Endpoints

### Students

- `GET /students`: Mendapatkan semua data siswa.
- `POST /students/addsiswa`: Menambahkan siswa baru.
- `POST /students/edit/:id`: Mengedit data siswa.
- `GET /students/delete/:id`: Menghapus data siswa.
- `GET /students/tambahsiswa`: Menampilkan form tambah siswa.
- `GET /students/dashboard`: Menampilkan dashboard siswa.
- `GET /students/admin`: Menampilkan halaman admin.

### Schedules

- `GET /schedules`: Mendapatkan semua jadwal.
- `POST /schedules/addjadwal`: Menambahkan jadwal baru.
- `GET /schedules/jadwal`: Mendapatkan jadwal berdasarkan semester.
- `GET /schedules/tambahjadwal`: Menampilkan form tambah jadwal.

### Albums

- `GET /albums`: Mendapatkan semua album.
- `POST /albums/addalbum`: Menambahkan album baru.
- `GET /albums/album`: Menampilkan halaman album.
- `GET /albums/tambahalbum`: Menampilkan form tambah album.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini dan buat pull request dengan perubahan Anda.

## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT. Lihat file `LICENSE` untuk informasi lebih lanjut.
