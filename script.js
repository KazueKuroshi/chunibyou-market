let keranjang = [];

// Ambil produk dari Firebase dan tampilkan
db.ref('produk').on('value', snapshot => {
  const data = snapshot.val() || {};
  const produkArray = Object.entries(data).map(([id, p]) => ({ ...p, id }));
  window.produkList = produkArray;
  tampilkanProduk(produkArray);
  ambilKeranjang();
  updateKeranjang();
});

// Tampilkan produk
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

// Keranjang
function tambahKeKeranjang(index) {
  const item = window.produkList[index];
  keranjang.push(item);
  simpanKeranjang();
  updateKeranjang();
}

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

function simpanKeranjang() {
  localStorage.setItem('keranjangHikari', JSON.stringify(keranjang));
}

function ambilKeranjang() {
  const data = localStorage.getItem('keranjangHikari');
  if (data) keranjang = JSON.parse(data);
}

// Checkout + WA + Firebase + Statistik
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

  keranjang.forEach(item => {
    const statRef = db.ref('penjualan/' + item.nama);
    statRef.get().then(snap => {
      const jumlah = snap.val() || 0;
      statRef.set(jumlah + 1);
    });
  });

  // Kirim ke WhatsApp
  const pesan = keranjang.map((item, i) => `${i + 1}. ${item.nama} - Rp${item.harga.toLocaleString()}`).join('\n');
  const teksWA = `🧾 *Pesanan dari Chunibyou Market*\n👤 ${nama}\n📧 ${email}\n\n${pesan}\n\n💰 Total: Rp${pesanan.total.toLocaleString()}`;
  window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(teksWA)}`, '_blank');

  keranjang = [];
  simpanKeranjang();
  updateKeranjang();
  notif.textContent = '✅ Pesanan berhasil dikirim ke WhatsApp!';
  document.getElementById('nama').value = '';
  document.getElementById('email').value = '';
}

//
// 🌌 Mode Gelap + Latar Bintang 🌠
//
document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('modeGelap', isDark ? 'aktif' : 'mati');

  const canvas = document.getElementById('bintangCanvas');
  canvas.style.display = isDark ? 'block' : 'none';
  if (isDark) bintangkan();
});

window.addEventListener('DOMContentLoaded', () => {
  const mode = localStorage.getItem('modeGelap');
  if (mode === 'aktif') {
    document.body.classList.add('dark-mode');
    const canvas = document.getElementById('bintangCanvas');
    canvas.style.display = 'block';
    bintangkan();
  }
});

function bintangkan() {
  const canvas = document.getElementById('bintangCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const bintang = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5
  }));

  function animasiBintang() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    bintang.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animasiBintang);
  }

  animasiBintang();
}
