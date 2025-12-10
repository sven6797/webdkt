// Daftar semua gambar pamflet
const pamflets = [
  "/pamflet/pamflet1.jpg",
  "/pamflet/pamflet2.jpg",
  "/pamflet/pamflet3.jpg",
  "/pamflet/pamflet4.png",
  "/pamflet/pamflet5.png",
  "/pamflet/pamflet6.png",
];

let startIndex = 0;
const perPage = 3;

function renderPamflets(direction = null) {
  const container = document.getElementById("pamfletContainer");
  container.innerHTML = "";

  // Reset animasi dulu
  container.classList.remove("slide-left", "slide-right");

  const slice = pamflets.slice(startIndex, startIndex + perPage);

  slice.forEach((src) => {
    container.innerHTML += `
      <div class="rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
        <img src="${src}" class="w-full h-80 object-cover bg-white cursor-pointer transition duration-300 hover:scale-105"
        onclick="openImageModal('${src}')">
      </div>
    `;
  });

  // Beri animasi arah sesuai klik panah
  if (direction === "next") {
    container.classList.add("slide-left");
  } else if (direction === "prev") {
    container.classList.add("slide-right");
  }

  updateButtons();
}

function updateButtons() {
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");

  // Sembunyikan PREV kalau sudah di paling kiri
  if (startIndex === 0) {
    prev.style.opacity = "0";
    prev.style.pointerEvents = "none";
  } else {
    prev.style.opacity = "1";
    prev.style.pointerEvents = "auto";
  }

  // Sembunyikan NEXT kalau sudah paling kanan
  if (startIndex + perPage >= pamflets.length) {
    next.style.opacity = "0";
    next.style.pointerEvents = "none";
  } else {
    next.style.opacity = "1";
    next.style.pointerEvents = "auto";
  }
}

// Tombol next
document.getElementById("nextBtn").addEventListener("click", () => {
  if (startIndex + perPage < pamflets.length) {
    startIndex += perPage;
    renderPamflets("next");
  }
});

// Tombol prev
document.getElementById("prevBtn").addEventListener("click", () => {
  if (startIndex - perPage >= 0) {
    startIndex -= perPage;
    renderPamflets("prev");
  }
});

// Render awal
renderPamflets();
