const startBtn = document.getElementById('startBtn');
const radialMenu = document.getElementById('menu');
const sectors = document.querySelectorAll('.sector');
const subsets = document.querySelectorAll('.sectorsub');

let sectorsVisible = false;
let activeSectors = new Set(); // Track multiple active sectors

function hideAllSectors() {
  sectors.forEach(sector => sector.classList.remove('visible'));
  sectorsVisible = false;
}

function hideAllSubsets() {
  subsets.forEach(sub => sub.classList.remove('visible'));
  activeSectors.clear();
}

function hideSubsetsForSector(sectorNum) {
  subsets.forEach(sub => {
    if (sub.getAttribute('data-parent') === sectorNum) {
      sub.classList.remove('visible');
    }
  });
  activeSectors.delete(sectorNum);
}

function showSubsetsForSector(sectorNum) {
  subsets.forEach(sub => {
    if (sub.getAttribute('data-parent') === sectorNum) {
      sub.classList.add('visible');
    }
  });
  activeSectors.add(sectorNum);
}

function closeMenu() {
  hideAllSectors();
  hideAllSubsets();
}

startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  sectorsVisible = !sectorsVisible;
  sectors.forEach(sector => sector.classList.toggle('visible', sectorsVisible));
  if (!sectorsVisible) hideAllSubsets();
});

sectors.forEach(sector => {
  sector.addEventListener('click', (e) => {
    e.stopPropagation();
    const sectorNum = sector.getAttribute('data-sector');
    
    if (activeSectors.has(sectorNum)) {
      // If this sector's subsets are already visible, hide them
      hideSubsetsForSector(sectorNum);
    } else {
      // Show subsets for this sector (keeping others visible)
      showSubsetsForSector(sectorNum);
    }
  });
});

subsets.forEach(sub => {
  sub.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sub.classList.contains('visible') && sub.matches(':hover')) {
      const link = sub.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    }
  });
});

// Close when clicking outside the menu
document.addEventListener('click', (e) => {
  if (!radialMenu.contains(e.target)) {
    closeMenu();
  }
});