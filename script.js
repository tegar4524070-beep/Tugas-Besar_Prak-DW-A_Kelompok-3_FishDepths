const speciesData = {
  sunlit: [
    { name: "Clownfish", zone: "Sunlit Zone", description: "Ikan badut yang hidup di anemon" },
    { name: "Coral", zone: "Sunlit Zone", description: "Terumbu karang pembentuk ekosistem" },
    { name: "Sea Turtle", zone: "Sunlit Zone", description: "Penyu laut yang berenang di permukaan" },
    { name: "Dolphin", zone: "Sunlit Zone", description: "Mamalia laut yang cerdas" },
    { name: "Tuna", zone: "Sunlit Zone", description: "Ikan pelagis yang berenang cepat" }
  ],
  twilight: [
    { name: "Lanternfish", zone: "Twilight Zone", description: "Ikan dengan bioluminesensi" },
    { name: "Hatchetfish", zone: "Twilight Zone", description: "Ikan berbentuk pipih seperti kapak" },
    { name: "Squid", zone: "Twilight Zone", description: "Cumi-cumi yang hidup di kedalaman sedang" },
    { name: "Jellyfish", zone: "Twilight Zone", description: "Ubur-ubur bercahaya" }
  ],
  midnight: [
    { name: "Anglerfish", zone: "Midnight Zone", description: "Ikan dengan lampu alami untuk menarik mangsa" },
    { name: "Gulper Eel", zone: "Midnight Zone", description: "Belut dengan mulut raksasa" },
    { name: "Giant Squid", zone: "Midnight Zone", description: "Cumi-cumi raksasa misterius" },
    { name: "Vampire Squid", zone: "Midnight Zone", description: "Cumi-cumi vampir dengan tentakel unik" },
    { name: "Viperfish", zone: "Midnight Zone", description: "Ikan dengan gigi tajam seperti taring" }
  ]
};

const allSpecies = [
  ...speciesData.sunlit,
  ...speciesData.twilight,
  ...speciesData.midnight
];

function searchSpecies(query) {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    return [];
  }
  return allSpecies.filter(species => 
    species.name.toLowerCase().includes(searchTerm) ||
    species.zone.toLowerCase().includes(searchTerm) ||
    species.description.toLowerCase().includes(searchTerm)
  );
}

function createBubbles(container) {
  const oldBubbles = container.querySelectorAll('.bubble');
  oldBubbles.forEach(b => b.remove());
  
  for (let i = 0; i < 15; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 60 + 20; // 20-80px
    const left = Math.random() * 100; // 0-100%
    const duration = Math.random() * 8 + 6; // 6-14s
    const delay = Math.random() * 5; // 0-5s
    const randomX = (Math.random() - 0.5) * 100; // -50 to 50px
    
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = left + '%';
    bubble.style.animationDuration = duration + 's';
    bubble.style.animationDelay = delay + 's';
    bubble.style.setProperty('--random-x', randomX + 'px');
    
    container.appendChild(bubble);
  }
}

function displaySearchResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  
  if (!resultsContainer) {
    const container = document.createElement('div');
    container.id = 'searchResults';
    container.className = 'search-results-container';
    document.getElementById('products').insertAdjacentElement('beforebegin', container);
  }
  
  const resultsDiv = document.getElementById('searchResults');
  
  if (results.length === 0) {
    resultsDiv.innerHTML = `
      <div class="container py-4">
        <div class="alert alert-info" role="alert">
          <h5>Tidak ada hasil ditemukan</h5>
          <p>Coba kata kunci lain seperti nama spesies atau zona laut.</p>
        </div>
      </div>
    `;
    resultsDiv.style.display = 'block';
    return;
  }
  
  let html = `
    <div class="container py-5">
      <h3 class="mb-4">Hasil Pencarian (${results.length} ditemukan)</h3>
      <div class="row g-4">
  `;
  
  results.forEach(species => {
    const zoneClass = species.zone.toLowerCase().replace(' ', '-');
    html += `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 search-result-card">
          <div class="card-body">
            <span class="badge bg-primary mb-2">${species.zone}</span>
            <h5 class="card-title">${species.name}</h5>
            <p class="card-text">${species.description}</p>
          </div>
        </div>
      </div>
    `;
  });
  
  html += `
      </div>
      <button class="btn btn-secondary mt-4" onclick="clearSearch()">Tutup Hasil Pencarian</button>
    </div>
  `;
  
  resultsDiv.innerHTML = html;
  resultsDiv.style.display = 'block';
  
  createBubbles(resultsDiv);
  
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


function clearSearch() {
  const resultsDiv = document.getElementById('searchResults');
  if (resultsDiv) {
    resultsDiv.style.display = 'none';
    resultsDiv.innerHTML = '';
  }
  document.getElementById('searchInput').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.querySelector('form[role="search"]');
  const searchInput = document.getElementById('searchInput');
  
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value;
      const results = searchSpecies(query);
      displaySearchResults(results);
    });
    
    // Real-time search saat mengetik (opsional)
    searchInput.addEventListener('input', function() {
      if (this.value.length >= 3) {
        const results = searchSpecies(this.value);
        displaySearchResults(results);
      } else if (this.value.length === 0) {
        clearSearch();
      }
    });
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { searchSpecies, displaySearchResults, clearSearch };
}

  document.getElementById("commentForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    const output = document.getElementById("commentOutput");
    output.innerHTML += `
      <div class="comment-item">
        <strong>${name}</strong>
        <p>${message}</p>
      </div>
    `;

    this.reset();
  });

  const waButton = document.getElementById("waButton");
  const waPopup = document.getElementById("waPopup");
  const waLink = document.getElementById("waLink");

  waButton.addEventListener("click", (e) => {
    e.stopPropagation(); 
    waPopup.classList.toggle("show");
  });

  waLink.addEventListener("click", (e) => {
    e.stopPropagation(); 
  });

  document.addEventListener("click", () => {
    waPopup.classList.remove("show");
  });

  const igButton = document.getElementById("igButton");
  const igPopup = document.getElementById("igPopup");
  const igLink = document.getElementById("igLink");

  igButton.addEventListener("click", (e) => {
    e.stopPropagation(); 
    igPopup.classList.toggle("show");
  });

  igLink.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    igPopup.classList.remove("show");
  });
