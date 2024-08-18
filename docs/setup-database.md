# Setup Database

Untuk menjalankan aplikasi diperlukan database untuk penyimpanan data aplikasi. Database yang digunakan adalah menggunakan MySQL, untuk mempermudah instalasi database menggunakan Docker untuk menginstall menjalankan database nya. Berikut langkah-langkah mengatur database.

## Installation

1. Pastikan Docker sudah terinstall. Dan jalankan program Docker
2. Pastikan Node.js sudah terinstall.
3. Buka Source Code
4. Buka CMD pada folder root source code
5. Pada CMD ketik

```bash
npm install
```

6. Kemudian jalankan docker compose yang sudah di sediakan pada source code untuk melakukan installasi mysql pada docker.

```bash
docker-compose up -d
```

7. Jika sudah selesai, buat table pada database berdasarkan skema database pada folder `prisma/schema.prisma` dengan menjalankan command berikut.

```bash
npm run db:push
```

8. Jika sudah maka database sudah terbentuk dan bisa di buka melalui aplikasi Database Editor
