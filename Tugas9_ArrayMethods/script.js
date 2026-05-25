const mahasiswa = [
  {
    nama: "Hawa Aini Sifa",
    jurusan: "Teknik Informatika",
    nilai: [88, 90, 92],
    kehadiran: 15
  },
  {
    nama: "Taylor Swift",
    jurusan: "Sistem Informasi",
    nilai: [75, 80, 78],
    kehadiran: 14
  },
  {
    nama: "Jungkook BTS",
    jurusan: "Teknik Informatika",
    nilai: [85, 82, 89],
    kehadiran: 16
  },
  {
    nama: "Jennie BLACKPINK",
    jurusan: "Sistem Informasi",
    nilai: [60, 65, 62],
    kehadiran: 10
  },
  {
    nama: "Bruno Mars",
    jurusan: "Teknik Informatika",
    nilai: [70, 74, 76],
    kehadiran: 13
  },
  {
    nama: "Ariana Grande",
    jurusan: "Sistem Informasi",
    nilai: [95, 93, 97],
    kehadiran: 16
  },
  {
    nama: "Justin Bieber",
    jurusan: "Teknik Informatika",
    nilai: [55, 58, 60],
    kehadiran: 9
  },
  {
    nama: "IU",
    jurusan: "Sistem Informasi",
    nilai: [90, 87, 91],
    kehadiran: 15
  }
];

const dataTable = document.getElementById("dataTable");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");

const totalData = document.getElementById("totalData");
const rataNilai = document.getElementById("rataNilai");
const nilaiTertinggi = document.getElementById("nilaiTertinggi");

const namaInput = document.getElementById("namaInput");
const jurusanInput = document.getElementById("jurusanInput");
const tugasInput = document.getElementById("tugasInput");
const utsInput = document.getElementById("utsInput");
const uasInput = document.getElementById("uasInput");
const kehadiranInput = document.getElementById("kehadiranInput");

function hitungRataRata(arrayNilai) {
  let total = arrayNilai.reduce((jumlah, nilai) => jumlah + nilai, 0);
  return total / arrayNilai.length;
}

function tampilkanData() {
  let data = mahasiswa.map((item, index) => {
    let rata = hitungRataRata(item.nilai);

    return {
      ...item,
      rataRata: rata,
      indexAsli: index
    };
  });

  let keyword = searchInput.value.toLowerCase();

  data = data.filter(item =>
    item.nama.toLowerCase().includes(keyword)
  );

  if (filterSelect.value === "lulus") {
    data = data.filter(item => item.rataRata >= 70 && item.kehadiran >= 12);
  } else if (filterSelect.value === "tidak") {
    data = data.filter(item => item.rataRata < 70 || item.kehadiran < 12);
  }

  if (sortSelect.value === "tinggi") {
    data = data.sort((a, b) => b.rataRata - a.rataRata);
  } else if (sortSelect.value === "rendah") {
    data = data.sort((a, b) => a.rataRata - b.rataRata);
  } else if (sortSelect.value === "az") {
    data = data.sort((a, b) => a.nama.localeCompare(b.nama));
  }

  dataTable.innerHTML = "";

  if (data.length === 0) {
    dataTable.innerHTML = `
      <tr>
        <td colspan="9" class="empty-row">Data tidak ditemukan.</td>
      </tr>
    `;
  }

  data.forEach(item => {
    let status =
      item.rataRata >= 70 && item.kehadiran >= 12
        ? "Lulus"
        : "Tidak Lulus";

    let statusClass =
      item.rataRata >= 70 && item.kehadiran >= 12
        ? "lulus"
        : "tidak";

    dataTable.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.jurusan}</td>
        <td>${item.nilai[0]}</td>
        <td>${item.nilai[1]}</td>
        <td>${item.nilai[2]}</td>
        <td>${item.kehadiran}/16</td>
        <td>${item.rataRata.toFixed(1)}</td>
        <td>
          <span class="badge ${statusClass}">
            ${status}
          </span>
        </td>
        <td>
          <button class="delete-btn" onclick="hapusData(${item.indexAsli})">
            Hapus
          </button>
        </td>
      </tr>
    `;
  });

  updateStatistik(data);
}

function updateStatistik(data) {
  totalData.innerHTML = data.length;

  if (data.length === 0) {
    rataNilai.innerHTML = 0;
    nilaiTertinggi.innerHTML = 0;
    return;
  }

  let totalRata = data.reduce(
    (jumlah, item) => jumlah + item.rataRata,
    0
  );

  let rataKeseluruhan = totalRata / data.length;

  let tertinggi = data.reduce(
    (max, item) => item.rataRata > max ? item.rataRata : max,
    data[0].rataRata
  );

  rataNilai.innerHTML = rataKeseluruhan.toFixed(1);
  nilaiTertinggi.innerHTML = tertinggi.toFixed(1);
}

function tambahData() {
  let nama = namaInput.value.trim();
  let jurusan = jurusanInput.value.trim();
  let tugas = Number(tugasInput.value);
  let uts = Number(utsInput.value);
  let uas = Number(uasInput.value);
  let kehadiran = Number(kehadiranInput.value);

  if (
    nama === "" ||
    jurusan === "" ||
    tugasInput.value === "" ||
    utsInput.value === "" ||
    uasInput.value === "" ||
    kehadiranInput.value === ""
  ) {
    alert("Semua data harus diisi");
    return;
  }

  if (
    tugas < 0 || tugas > 100 ||
    uts < 0 || uts > 100 ||
    uas < 0 || uas > 100 ||
    kehadiran < 0 || kehadiran > 16
  ) {
    alert("Nilai harus 0-100 dan kehadiran harus 0-16");
    return;
  }

  mahasiswa.push({
    nama: nama,
    jurusan: jurusan,
    nilai: [tugas, uts, uas],
    kehadiran: kehadiran
  });

  namaInput.value = "";
  jurusanInput.value = "";
  tugasInput.value = "";
  utsInput.value = "";
  uasInput.value = "";
  kehadiranInput.value = "";

  tampilkanData();
}

function hapusData(index) {
  let konfirmasi = confirm("Yakin ingin menghapus data ini?");

  if (konfirmasi) {
    mahasiswa.splice(index, 1);
    tampilkanData();
  }
}

searchInput.addEventListener("input", tampilkanData);
filterSelect.addEventListener("change", tampilkanData);
sortSelect.addEventListener("change", tampilkanData);

tampilkanData();