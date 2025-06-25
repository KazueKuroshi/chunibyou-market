# ✨ Chunibyou Market ✨

Portal jual beli otaku bergaya chunibyou, dengan kekuatan Firebase dan nuansa sihir bercahaya. 🌌🛍️

## 🚀 Fitur Unggulan

- 🧺 Belanja produk dari Firebase Realtime Database
- 📦 Checkout langsung via WhatsApp
- 🔐 Login admin dengan verifikasi email (Firebase Auth)
- 📈 Dashboard admin: tambah produk, hapus, grafik penjualan (Chart.js), ekspor CSV
- 🌙 Toggle dark mode dengan latar bintang animasi
- 🎨 Desain responsif + logo animasi + segel "光" sebagai favicon

## 🧰 Struktur Proyek

```
chunibyou-market/
├── index.html
├── login.html
├── dashboard.html
├── style.css
├── script.js
├── firebaseConfig.js
├── favicon.ico
├── magic-loading.gif (opsional)
└── README.md
```
## 🔧 Setup

1. Buat proyek di [Firebase Console](https://console.firebase.google.com)
2. Aktifkan:
   - Realtime Database (Start in test mode)
   - Authentication (Email/Password)
3. Salin konfigurasi ke `firebaseConfig.js`
4. Ubah `rules` database:

```json
{
  "rules": {
    "produk": {
      ".read": true,
      ".write": "auth != null"
    },
    "pesanan": {
      ".read": false,
      ".write": true
    },
    "penjualan": {
      ".read": false,
      ".write": true
    }
  }
}
```


## 📱 Checkout WhatsApp

Edit nomor WA di script.js:

```javascript
window.open(https://wa.me/6281234567890?text=...)
```

Ganti dengan nomor admin tokomu.

## 🎯 TODO Fitur Tambahan (Opsional)

- [ ] Multi admin dengan custom claims Firebase
- [ ] Filter kategori produk
- [ ] Notifikasi pesanan baru (real-time)
- [ ] Upload gambar produk (Firebase Storage)

---

> Dikembangkan dengan 💜 oleh komunitas Hikari Bunko  
> Theme: Otaku ✨ Sihir ✨ Kesungguhan level 99
