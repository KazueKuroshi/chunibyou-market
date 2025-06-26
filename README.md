# ✨ Chunibyou Market

Chunibyou Market adalah toko virtual bergaya otaku yang memadukan tema sihir, estetika anime, dan kekuatan Firebase—dilengkapi dengan sistem multi-admin, checkout via WhatsApp, statistik penjualan, dan progresif sebagai PWA (Progressive Web App).

## 🚀 Fitur Utama

- 🌟 Antarmuka toko produk interaktif dengan animasi dan mode malam berbintang
- 🧺 Keranjang belanja dinamis & Checkout melalui WhatsApp
- 🔐 Autentikasi admin (dengan verifikasi email)
- 🧙‍♀️ Dashboard admin multi-role: `superadmin`, `moderator`, `viewer`
- 📈 Grafik penjualan real-time (Chart.js)
- 📥 Ekspor data transaksi ke CSV
- 🧾 Pendaftaran admin baru dengan penyimpanan ke Firestore
- 🎖️ Panel SuperAdmin untuk kelola peran dan menghapus admin
- 📦 PWA-ready dengan splash screen, ikon, dan offline mode (service worker)

---

## 🗂️ Struktur Folder

```
chunibyou-market/
├─ index.html             → Halaman utama toko
├─ login.html             → Login admin
├─ register.html          → Daftar admin baru
├─ dashboard.html         → Dashboard admin dengan deteksi peran
├─ adminPanel.html        → Panel SuperAdmin untuk role admin
├─ splash.html            → Layar pembuka animasi
├─ 404.html               → Halaman tidak ditemukan bertema otaku
├─ style.css              → Gaya visual global
├─ script.js              → Logika produk, keranjang, dan efek animasi
├─ firebaseConfig.js      → Konfigurasi Firebase
├─ manifest.json          → Deskripsi PWA
├─ service-worker.js      → Cache & offline
├─ database.rules.json    → Rules Realtime Database
├─ firestore.rules        → Rules Firestore
├─ firebase.json          → Konfigurasi deploy Firebase Hosting
├─ .firebaserc            → Profil Firebase CLI
├─ favicon.svg            → Ikon segel "光"
```

---

## 🔧 Instalasi & Deploy

1. Install Firebase CLI
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

   
---

## 2. Masuk ke folder proyek
   ```bash
   cd chunibyou-market
   firebase init hosting
   ```


---

## 3. Deploy ke Firebase Hosting
   ```bash
   firebase deploy
   ```

---

## 📱 Progressive Web App (PWA)

- Sudah terintegrasi `manifest.json`, `service-worker.js`, dan splash screen
- Dapat diinstal sebagai aplikasi dari browser mobile
- Dapat berjalan secara offline (mode terbatas)

---

## 🧙‍♀️ Kredit

Desain dan sistem oleh Kazue Kurosaki, terinspirasi oleh otaku culture dan dimensi chunibyou.  
Dibantu oleh saklar, dan mantra 🌙

---

> Untuk dokumentasi dan penyesuaian lanjut, kunjungi halaman dashboard atau Firestore console.
