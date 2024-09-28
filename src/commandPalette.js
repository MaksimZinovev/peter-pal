import { commandPaletteHTML } from "./uiComponents.js";
import {
  displayInitialItems,
  initializeSearch,
} from "./searchManager.js";

let isCommandPaletteVisible = false;
let currentSelectedIndex = -1;

export function toggleCommandPalette() {
  // const currentTheme = getCurrentTheme();
  // console.log(`currentTheme: ${currentTheme}`);
  const existingPalette = document.getElementById(
    "quick-fields-command-palette"
  );
  if (existingPalette) {
    isCommandPaletteVisible = !isCommandPaletteVisible;
    existingPalette.style.display = isCommandPaletteVisible ? "flex" : "none";
    if (isCommandPaletteVisible) {
      focusSearchInput();
      displayInitialItems();
      currentSelectedIndex = -1; // Reset the selected index
    }
  } else {
    try {
      document.body.insertAdjacentHTML("beforeend", commandPaletteHTML);
      isCommandPaletteVisible = true;
      initializeSearch();
      displayInitialItems();
      focusSearchInput();
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
    searchInput.addEventListener("keydown", handleKeyNavigation);
  } else {
    console.error("Search input element not found");
  }
}

function handleKeyNavigation(event) {
  const resultsList = document.getElementById("qf-results-list");
  const items = resultsList.getElementsByTagName("li");

  if (event.key === "ArrowDown") {
    event.preventDefault();
    currentSelectedIndex = (currentSelectedIndex + 1) % items.length;
    updateSelectedItem(items);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    currentSelectedIndex =
      (currentSelectedIndex - 1 + items.length) % items.length;
    updateSelectedItem(items);
  } else if (event.key === "Enter") {
    event.preventDefault();
    const selectedItem = items[currentSelectedIndex];
    if (selectedItem) {
      const elementId = selectedItem.dataset.elementId;
      const element = document.querySelector(`[data-qf-id="${elementId}"]`);
      scrollToElement(element);
      highlightElement(element);
      if (!event.ctrlKey) {
        closeCommandPalette();
      }
    }
  }
}

function updateSelectedItem(items) {
  for (let i = 0; i < items.length; i++) {
    if (i === currentSelectedIndex) {
      items[i].classList.add("qf-selected");
    } else {
      items[i].classList.remove("qf-selected");
    }
  }
}

export function resetSelectedIndex() {
  currentSelectedIndex = -1;
}

function scrollToElement(element) {
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function highlightElement(element) {
  if (element) {
    element.classList.add("qf-highlighted");
    setTimeout(() => {
      element.classList.remove("qf-highlighted");
    }, 4000);
  }
}


export { scrollToElement, highlightElement };