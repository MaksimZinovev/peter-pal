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
let activeHighlight = null;
let activeTimeout;

function highlightElement(element, type) {
  if (element) {
    removeHighlight();

    element.classList.add("qf-highlighted");
    element.classList.add(`qf-highlighted-${type}`);
    
    if (activeTimeout) {
      clearTimeout(activeTimeout);
    }

    if (type === "rect") {
      console.log("highlightRect");
      adjustCommandPalettePosition(element);
      activeHighlight = { element, type };
      activeTimeout = setTimeout(() => {
        removeHighlight();
      }, 4000);
    } else
      setTimeout(() => {
        activeHighlight.element.classList.remove("qf-highlighted");
        activeHighlight.element.classList.remove(`qf-highlighted-outline`);
      }, 4000);
  }
}

function highlightElementOutline(element) {
  highlightElement(element, "outline");
}

function highlightElementRect(element) {
  highlightElement(element, "rect");
   console.log("highlightElementRect");
}

export function removeHighlight() {
  if (activeHighlight) {
    activeHighlight.element.classList.remove("qf-highlighted");
    activeHighlight.element.classList.remove(
      `qf-highlighted-${activeHighlight.type}`
    );
    activeHighlight = null;

    if (activeTimeout) {
      clearTimeout(activeTimeout);
      activeTimeout = null;
    }
  }
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
      if (activeHighlight) {
        removeHighlight();
      }
    } else if (e.key === "Enter" && isCommandPaletteVisible) {
      console.log("Pressed Enter button ");
      const selectedItem = document.querySelector(".qf-selected");
      if (selectedItem) {
        const elementId = selectedItem.dataset.elementId;
        const element = document.querySelector(`[data-qf-id="${elementId}"]`);

        if (activeHighlight) {
          removeHighlight();
        }
        if (element) {
          scrollToElement(element);
          highlightElementOutline(element);
          highlightElementRect(element);

          // Adjust the palette position for the newly selected element
          // adjustCommandPalettePosition(element);
        }

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
export function centerPalette(paletteContainer) {
  paletteContainer.style.left = "50vw";
  paletteContainer.style.right = "auto";
  paletteContainer.style.transform = "translateX(-50%)";
}

function adjustCommandPalettePosition(element) {
  const paletteContainer = document.querySelector(
    ".qf-command-palette-container"
  );
  const windowWidth = window.innerWidth;

  if (paletteContainer && element) {
    const elementRect = element.getBoundingClientRect();
    const paletteRect = paletteContainer.getBoundingClientRect();

    // Calculate the center position
    const centerPosition = {
      left: "50vw",
      right: "auto",
      transform: "translateX(-50%)",
    };

    // Check if centering would cause an overlap
    const centerLeft = (windowWidth - paletteRect.width) / 2;
    const centerRight = centerLeft + paletteRect.width;
    const wouldOverlapInCenter =
      (elementRect.left - 100) < centerRight && (elementRect.right + 100)  > centerLeft;

    if (wouldOverlapInCenter) {
      // There would be an overlap if centered, so adjust the palette position
      if (elementRect.left < windowWidth / 2) {
        // Element is closer to the left side, move palette to the right
        paletteContainer.style.right = "100px";
        paletteContainer.style.left = "auto";
        paletteContainer.style.transform = "none";
      } else {
        // Element is closer to the right side, move palette to the left
        
        paletteContainer.style.left = "100px";
        paletteContainer.style.right = "auto";
        paletteContainer.style.transform = "none";
      }
    } else {
      // No overlap if centered, so move to center
      paletteContainer.style.left = centerPosition.left;
      paletteContainer.style.right = centerPosition.right;
      paletteContainer.style.transform = centerPosition.transform;
    }
  }
}
