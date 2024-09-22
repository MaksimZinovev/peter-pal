// content.js
import { initializeTheme, toggleTheme } from './themeManager.js';
import { toggleCommandPalette, closeCommandPalette } from './commandPalette.js';
import { performSearch } from './searchManager.js';
import { debounce } from './utils.js';


let isCommandPaletteVisible = false;

try {
  console.log("Content script loaded");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isCommandPaletteVisible) {
      closeCommandPalette();
      isCommandPaletteVisible = false;
    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleCommandPalette") {
      isCommandPaletteVisible = toggleCommandPalette();
      sendResponse({ status: "Command palette toggled" });
    } else if (request.action === "toggleTheme") {
      toggleTheme();
      sendResponse({ status: "Theme toggled" });
    }
  });

  // Initialize theme
  initializeTheme();

  // Add event listener for search input with debounce
  document.addEventListener(
    "input",
    debounce((e) => {
      if (e.target.id === "qf-search-input") {
        performSearch(e.target.value);
      }
    }, 50)
  );

} catch (error) {
  console.error("Error in content script:", error);
}
