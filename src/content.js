// content.js
import { initializeTheme, toggleTheme } from "./themeManager.js";
import {
  toggleCommandPalette,
  closeCommandPalette,
  scrollToElement,
  highlightElement,
} from "./commandPalette.js";
import { performSearch, initializeSearch } from "./searchManager.js";
import { debounce } from "./utils.js";
import { getCurrentTheme } from "./themeManager.js";

let isCommandPaletteVisible = false;
const currentTheme = getCurrentTheme();
let lastHighlightedElement = null;

try {
  // 
  // eslint-disable-next-line no-debugger
  // debugger;
  console.log("Content script loaded");
  initializeSearch();
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isCommandPaletteVisible) {
      closeCommandPalette();
      isCommandPaletteVisible = false;
      if (lastHighlightedElement) {
        setTimeout(() => {
          lastHighlightedElement.classList.remove("qf-highlighted");
        }, 4000);
      }
    } else if (e.key === "Enter" && isCommandPaletteVisible) {
      const selectedItem = document.querySelector(".qf-selected");
      if (selectedItem) {
        const elementId = selectedItem.dataset.elementId;
        const element = document.querySelector(`[data-qf-id="${elementId}"]`);

        if (lastHighlightedElement) {
          lastHighlightedElement.classList.remove("qf-highlighted");
        }
        scrollToElement(element);
        highlightElement(element);
        lastHighlightedElement = element;
        if (!e.ctrlKey) {
          closeCommandPalette();
          isCommandPaletteVisible = false;
        }
      }
    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleCommandPalette") {
      isCommandPaletteVisible = toggleCommandPalette();
      if (isCommandPaletteVisible) {
        const searchInput = document.getElementById("qf-search-input");
        if (searchInput) {
          searchInput.focus();
        }
      }
      sendResponse({ status: "Command palette toggled" });
    } else if (request.action === "toggleTheme") {
      toggleTheme(getCurrentTheme());
      sendResponse({ status: "Theme toggled" });
    }
  });

  // Initialize theme
  initializeTheme(currentTheme);

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
