let keranjang = [];

// Ambil data produk secara realtime dari Firebase
db.ref('produk').on('value', snapshot => {
  const data = snapshot.val() || {};
  const produkArray = Object.entries(data).map(([id, p]) => ({ ...p, id }));
  window.produkList = produkArray;
  tampilkanProduk(produkArray);
  ambilKeranjang();
  updateKeranjang();
});

// Tampilkan produk ke halaman
function tampilkanProduk(data) {
  const container = document.getElementById('produk-container');
  container.innerHTML = '';
  data.forEach((p, index) => {
    const el = document.createElement('div');
    el.className = 'produk';
    el.innerHTML = `
      <h3>${p.nama}</h3>
      <p>${p.deskripsi}</p>
      <p><strong>Rp${p.harga.toLocaleString()}</strong></p>
      <button onclick="tambahKeKeranjang(${index})">🛒 Tambah</button>
    `;
    container.appendChild(el);
  });
}

// Tambahkan produk ke keranjang
function tambahKeKeranjang(index) {
  const item = window.produkList[index];
  keranjang.push(item);
  simpanKeranjang();
  updateKeranjang();
}

// Perbarui tampilan keranjang dan total
function updateKeranjang() {
  const list = document.getElementById('list-keranjang');
  const totalEl = document.getElementById('total');
  list.innerHTML = '';
  let total = 0;
  keranjang.forEach(item => {
    total += item.harga;
    const li = document.createElement('li');
    li.textContent = `${item.nama} - Rp${item.harga.toLocaleString()}`;
    list.appendChild(li);
  });
  totalEl.textContent = 'Rp' + total.toLocaleString();
}

// Simpan keranjang ke localStorage
function simpanKeranjang() {
  localStorage.setItem('keranjangHikari', JSON.stringify(keranjang));
}

// Ambil keranjang dari localStorage
function ambilKeranjang() {
  const data = localStorage.getItem('keranjangHikari');
  if (data) keranjang = JSON.parse(data);
}

// Proses checkout dan kirim ke WhatsApp + simpan ke Firebase
function checkout() {
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const notif = document.getElementById('notifikasi');

  if (!nama || !email || keranjang.length === 0) {
    notif.textContent = '⚠️ Lengkapi data checkout.';
    return;
  }

  const pesanan = {
    pemesan: { nama, email },
    isiKeranjang: keranjang,
    total: keranjang.reduce((t, i) => t + i.harga, 0),
    waktu: new Date().toISOString()
  };

  const orderID = 'order_' + Date.now();
  db.ref('pesanan/' + orderID).set(pesanan);

  // Tambahkan statistik penjualan
  keranjang.forEach(item => {
    const itemRef = db.ref('penjualan/' + item.nama);
    itemRef.get().then(snapshot => {
      const jumlah = snapshot.val() || 0;
      itemRef.set(jumlah + 1);
    });
  });

  // Kirim ke WhatsApp
  const pesan = keranjang.map((item, i) => `${i + 1}. ${item.nama} - Rp${item.harga.toLocaleString()}`).join('\n');
  const teksWA = `🧾 *Pesanan dari Chunibyou Market*\n👤 ${nama}\n📧 ${email}\n\n${pesan}\n\n💰 Total: Rp${pesanan.total.toLocaleString()}`;
  window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(teksWA)}`, '_blank');

  // Reset form dan keranjang
  keranjang = [];
  simpanKeranjang();
  updateKeranjang();
  notif.textContent = '✅ Pesananmu berhasil dikirim ke WhatsApp!';
  document.getElementById('nama').value = '';
  document.getElementById('email').value = '';
}
