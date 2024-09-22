import { commandPaletteHTML } from './uiComponents.js';
import { initializeSearch, displayResults } from './searchManager.js';
import { getCurrentTheme } from './themeManager.js';

let isCommandPaletteVisible = false;


export function toggleCommandPalette() {
  const currentTheme = getCurrentTheme();
  console.log(`currentTheme: ${currentTheme}`);
  const existingPalette = document.getElementById(
    "quick-fields-command-palette"
  );
  if (existingPalette) {
    isCommandPaletteVisible = !isCommandPaletteVisible;
    existingPalette.style.display = isCommandPaletteVisible ? "flex" : "none";
    if (isCommandPaletteVisible) {
      initializeSearch();
      focusSearchInput();
      displayResults([]); // This will show initial items
    }
  } else {
    try {
      document.body.insertAdjacentHTML("beforeend", commandPaletteHTML);
      isCommandPaletteVisible = true;
      initializeSearch();
      focusSearchInput();
      displayResults([]); // This will show initial items
    } catch (paletteError) {
      console.error("Error creating command palette:", paletteError);
    }
  }
  return isCommandPaletteVisible;
}


export function closeCommandPalette() {
  const palette = document.getElementById("quick-fields-command-palette");
  if (palette) {
    palette.style.display = "none";
    isCommandPaletteVisible = false;
  }
}

function focusSearchInput() {
  const searchInput = document.getElementById("qf-search-input");
  if (searchInput) {
    searchInput.focus();
  } else {
    console.error("Search input element not found");
  }
}
