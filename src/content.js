// content.js
import { initializeTheme, toggleTheme } from "./themeManager.js";
import {
  toggleCommandPalette,
  closeCommandPalette,
  scrollToElement,
} from "./commandPalette.js";
import { performSearch, initializeSearch } from "./searchManager.js";
import { debounce } from "./utils.js";
import { getCurrentTheme } from "./themeManager.js";

let isCommandPaletteVisible = false;
const currentTheme = getCurrentTheme();
let lastHighlightedElement = null;

let highlightRect = [];

function highlightElementRect(element) {
  if (element) {
    const rect = element.getBoundingClientRect();
    //store highlightrect 

    highlightRect.push(document.createElement("div"));
    //get last elementin array
    const lastHighlight = highlightRect[highlightRect.length - 1];
    lastHighlight.style.position = "absolute";
    lastHighlight.style.top = `${rect.top}px`;
    lastHighlight.style.left = "0px";
    lastHighlight.style.width = "100%";
    lastHighlight.style.height = "70px";
    lastHighlight.style.background = "rgba(255, 255, 255, 0.5)";
    lastHighlight.style.zIndex = "1000";
    document.body.appendChild(lastHighlight);

    setTimeout(() => { 
      removeHighlightRect(lastHighlight);
    }, 4000);
  }
}

export function removeHighlightRect (el) {
  if (el && el.parentNode == document.body)
    document.body.removeChild(el);
  }
  


try {
  //
  // eslint-disable-next-line no-debugger
  // debugger;
  console.log("Content script loaded");
  initializeSearch();
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isCommandPaletteVisible) {
       console.log("Pressed Escape button ");
      closeCommandPalette();
      isCommandPaletteVisible = false;
      if (lastHighlightedElement) {
        setTimeout(() => {
          lastHighlightedElement.classList.remove("qf-highlighted");
        }, 4000);
      }
    } else if (e.key === "Enter" && isCommandPaletteVisible) {
       console.log("Pressed Enter button ");
      e.preventDefault();
      const selectedItem = document.querySelector(".qf-selected");
      if (selectedItem) {
        const elementId = selectedItem.dataset.elementId;
        const element = document.querySelector(`[data-qf-id="${elementId}"]`);

        if (lastHighlightedElement) {
          lastHighlightedElement.classList.remove("qf-highlighted");
        }
        scrollToElement(element);
        // highlightElement(element);
        highlightElementRect(element);
        lastHighlightedElement = element;
        if (!e.ctrlKey) {
          console.log("Pressed Ctrl button ");
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

  initializeTheme(currentTheme);

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
