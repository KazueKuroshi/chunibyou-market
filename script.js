let keranjang = [];

fetch('produk.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('produk-container');
    data.forEach((p, index) => {
      const el = document.createElement('div');
      el.className = 'produk';
      el.innerHTML = `
        <h3>${p.nama}</h3>
        <p>${p.deskripsi}</p>
        <p><strong>Rp${p.harga.toLocaleString()}</strong></p>
        <button onclick="tambahKeKeranjang(${index})">🛒 Tambah ke Keranjang</button>
      `;
      container.appendChild(el);
    });
    window.produkList = data;
    ambilKeranjang(); // panggil setelah produk tersedia
    updateKeranjang();
  });

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

  keranjang.forEach((item) => {
    total += item.harga;
    const li = document.createElement('li');
    li.innerHTML = `<span style="color:#ffccff;">✨ ${item.nama}</span> - Rp${item.harga.toLocaleString()}`;
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

function checkout() {
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const notif = document.getElementById('notifikasi');

  if (!nama || !email || keranjang.length === 0) {
    notif.textContent = '⚠️ Lengkapi nama, email & isi keranjang terlebih dahulu!';
    return;
  }

  let pesan = `🧾 *Pesanan dari Chunibyou Market*\n`;
  pesan += `👤 Nama: ${nama}\n📧 Email: ${email}\n\n🛍️ *Daftar Pesanan:*\n`;

  keranjang.forEach((item, i) => {
    pesan += `${i + 1}. ${item.nama} - Rp${item.harga.toLocaleString()}\n`;
  });

  const total = keranjang.reduce((t, i) => t + i.harga, 0);
  pesan += `\n💰 *Total:* Rp${total.toLocaleString()}\n\n🙏 Mohon konfirmasi, ya!`;

  const nomor = "6281234567890"; // Ganti dengan nomor WhatsApp admin
  const link = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
  window.open(link, "_blank");

  summonParticles(); // efek sihir visual
  keranjang = [];
  simpanKeranjang();
  updateKeranjang();
  notif.textContent = `✨ Pesananmu telah dikirim ke WhatsApp!`;
  document.getElementById('nama').value = '';
  document.getElementById('email').value = '';
}

function summonParticles() {
  const canvas = document.getElementById('partikel');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      size: Math.random() * 6 + 2,
      life: 100,
      color: `hsl(${Math.random() * 360}, 100%, 75%)`
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      p.life--;
    });
    particles = particles.filter(p => p.life > 0);
    if (particles.length > 0) requestAnimationFrame(animate);
  }

  animate();
}
