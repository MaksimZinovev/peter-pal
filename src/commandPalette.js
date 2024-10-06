import { commandPaletteHTML } from "./uiComponents.js";
import { initializeSearch, getInitialItems } from "./searchManager.js";

let isCommandPaletteVisible = false;
let isKeyNavigationListenerAdded = false;
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

    const searchInput = document.getElementById("qf-search-input");
    if (searchInput && isKeyNavigationListenerAdded) {
      searchInput.removeEventstener("keydown", handleKeyNavigation);
      isKeyNavigationListenerAdded = false;
    }
  }
}

function focusSearchInput() {
  const searchInput = document.getElementById("qf-search-input");
  if (searchInput) {
    searchInput.focus();
    if (!isKeyNavigationListenerAdded) {
      searchInput.addEventListener("keydown", handleKeyNavigation);
      isKeyNavigationListenerAdded = true;
    }

    const inputLength = searchInput.value.length;
    searchInput.setSelectionRange(inputLength, inputLength);
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
  // if
  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      if (i === currentSelectedIndex) {
        items[i].classList.add("qf-selected");
      } else {
        items[i].classList.remove("qf-selected");
      }
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

function selectFirstResult() {
  const resultsList = document.getElementById("qf-results-list");
  if (resultsList) {
    const items = Array.from(resultsList.getElementsByTagName("li"));
    if (items.length > 0) {
      currentSelectedIndex = 0;
      updateSelectedItem(items);
    } else {
      currentSelectedIndex = -1;
    }
  }
}

export function displayInitialItems() {
  // if (!searchIndex) {
  //   console.error("Search index not initialized");
  //   return;
  // }
  const initialItems = getInitialItems();
  if (initialItems) {
    // console.log("Initial items:", JSON.stringify(initialItems, null, 2));
    displayResults(initialItems);
  } else  {
    console.error("displayInitialItems: No items to display");
  }
}

function displayResults(results) {
  const resultsList = document.getElementById("qf-results-list");
  if (!resultsList) {
    console.error("Results list element not found");
    return;
  }

  resultsList.innerHTML = "";

  if (results.length === 0) {
    resultsList.innerHTML = "<li>No elements found</li>";
    resetSelectedIndex();
    return;
  }

  results.forEach((id) => {
    try {
      const li = document.createElement("li");
      const el = document.querySelectorAll(
        'a, button, input, textarea, select, label, [role="button"]'
      )[id];
      if (el) {
        li.textContent = el.textContent || el.value || el.placeholder || "";
        li.dataset.elementId = id;
        el.dataset.qfId = id;
        li.addEventListener("click", () => {
          try {
            el.focus();
            el.click();
            closeCommandPalette();
          } catch (clickError) {
            console.error(
              "Error interacting with search result element:",
              clickError
            );
          }
        });
        - resultsList.appendChild(li);
      }
    } catch (displayError) {
      console.error("Error displaying search result item:", displayError);
    }
  });
  selectFirstResult();
}

export { scrollToElement, highlightElement, displayResults }