let daftarTugas = [];

let inputTugas = document.getElementById("inputTugas");
let listTugas = document.getElementById("daftarTugas");
let emptyText = document.getElementById("emptyText");

let totalTugas = document.getElementById("totalTugas");
let tugasSelesai = document.getElementById("tugasSelesai");
let tugasBelum = document.getElementById("tugasBelum");

let tanggal = document.getElementById("tanggal");
tanggal.innerHTML = new Date().toLocaleDateString("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

function tambahTugas() {
  let tugas = inputTugas.value.trim();

  if (tugas === "") {
    alert("Tugas tidak boleh kosong");
    return;
  }

  daftarTugas.push({
    nama: tugas,
    selesai: false
  });

  inputTugas.value = "";
  tampilkanTugas();
}

function tampilkanTugas() {
  listTugas.innerHTML = "";

  for (let i = 0; i < daftarTugas.length; i++) {
    let statusClass = daftarTugas[i].selesai ? "done" : "pending";
    let statusText = daftarTugas[i].selesai ? "Selesai" : "Belum selesai";
    let classSelesai = daftarTugas[i].selesai ? "selesai" : "";

    listTugas.innerHTML += `
      <li class="${classSelesai}">
        <div class="task-info">
          <span>${daftarTugas[i].nama}</span>
          <small class="badge ${statusClass}">${statusText}</small>
        </div>

        <div class="actions">
          <button class="done-btn" onclick="ubahStatus(${i})">✓</button>
          <button class="delete-btn" onclick="hapusTugas(${i})">×</button>
        </div>
      </li>
    `;
  }

  updateStatistik();
}

function ubahStatus(index) {
  daftarTugas[index].selesai = !daftarTugas[index].selesai;
  tampilkanTugas();
}

function hapusTugas(index) {
  daftarTugas.splice(index, 1);
  tampilkanTugas();
}

function updateStatistik() {
  let jumlahSelesai = daftarTugas.filter(tugas => tugas.selesai === true).length;
  let jumlahBelum = daftarTugas.length - jumlahSelesai;

  totalTugas.innerHTML = daftarTugas.length;
  tugasSelesai.innerHTML = jumlahSelesai;
  tugasBelum.innerHTML = jumlahBelum;

  if (daftarTugas.length === 0) {
    emptyText.style.display = "block";
  } else {
    emptyText.style.display = "none";
  }
}

inputTugas.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    tambahTugas();
  }
});

updateStatistik();