# Bugeur

![Badge](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Deskripsi

**Bugeur** adalah aplikasi web internal yang dirancang untuk membantu tim dalam mengelola dan memperbaiki bug (kesalahan
dalam kode) agar aplikasi dapat berjalan dengan baik. Nama "Bugeur" diambil dari kata "Bug" (kesalahan dalam kode) dan "
Bageur" (bahasa Sunda yang berarti "baik"). Tujuan aplikasi ini adalah untuk memastikan bahwa setiap bug dapat
diidentifikasi, dilaporkan, dan diperbaiki dengan efisien, sehingga kualitas produk tetap terjaga.

Aplikasi ini memiliki empat peran pengguna dengan hak akses yang berbeda:

1. **Admin**: Mengelola pengguna dan proyek, serta melihat ringkasan data secara keseluruhan.
2. **Project Manager**: Memantau proyek dan bug yang terkait dengan tim mereka, serta menyetujui laporan bug.
3. **Developer**: Memperbaiki bug dengan mengubah status bug menjadi "in progress" atau "resolved".
4. **Quality Assurance (QA)**: Melaporkan bug baru dan memverifikasi apakah bug telah selesai diperbaiki.

## Fitur Utama

- **Manajemen Pengguna**: Admin dapat menambah, mengedit, dan menghapus pengguna.
- **Manajemen Proyek**: Admin dan Project Manager dapat mengelola proyek (aktif/non-aktif).
- **Pelaporan Bug**: Quality Assurance dapat melaporkan bug baru.
- **Pelacakan Bug**: Setiap bug dapat dilacak statusnya (baru, in progress, resolved, disetujui).
- **Ringkasan Data**: Setiap aktor dapat melihat ringkasan data yang relevan dengan peran mereka, seperti total
  pengguna, proyek, dan bug.
- **Autentikasi Pengguna**: Setiap pengguna memiliki akses yang disesuaikan dengan peran mereka.

## Cara Memulai

### Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi 16 atau lebih baru)
- [npm](https://www.npmjs.com/) (biasanya sudah terinstal bersama Node.js)
- [Git](https://git-scm.com/)
- Database (contoh: MySQL, PostgreSQL, atau MongoDB) - pastikan sudah terinstal dan berjalan.

### Instalasi

1. **Clone Repositori**:
   Buka terminal dan jalankan perintah berikut untuk mengunduh proyek:
   ```bash
   git clone https://github.com/username/bugeur.git
