import { commandPaletteHTML } from "./uiComponents.js";
import { initializeSearch, getInitialItems } from "./searchManager.js";
import { removeHighlightRect, centerPalette } from "./content";

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
      centerPalette(document.querySelector(".qf-command-palette-container"));
      focusSearchInput();
      displayInitialItems();
    } else {
      // Remove event listener when hiding the palette
      const searchInput = document.getElementById("qf-search-input");
      if (searchInput && isKeyNavigationListenerAdded) {
        searchInput.removeEventListener("keydown", handleKeyNavigation);
        isKeyNavigationListenerAdded = false;
      }
    }
  } else {
    try {
      document.body.insertAdjacentHTML("beforeend", commandPaletteHTML);
      isCommandPaletteVisible = true;
      centerPalette(document.querySelector(".qf-command-palette-container"));
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
      searchInput.removeEventListener("keydown", handleKeyNavigation);
      isKeyNavigationListenerAdded = false;
    }
    removeHighlightRect();
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
  const { results, items } = getInitialItems();
/*   console.log("displayInitialItems()");
  console.log(
    "displayInitialItemsgetInitialItems():",
    JSON.stringify(getInitialItems(), null, 2)
  );
  console.log("results:", JSON.stringify(results, null, 2)); */

  if (results && items) {
    // console.log("Initial items:", JSON.stringify(initialItems, null, 2));
    displayResults(results, items);
  } else {
    console.log("displayInitialItems: No items to display");
  }
}

function displayResults(searchResults, items) {
  const resultsList = document.getElementById("qf-results-list");
  if (!resultsList) {
    console.error("Results list element not found");
    return;
  }

  resultsList.innerHTML = "";
  if (searchResults) {
    if (searchResults.length === 0) {
      resultsList.innerHTML = "<li>No elements found</li>";
      resetSelectedIndex();
      return;
    }

    // convert elementId string to Int

    const getItemById = (elementId) =>
      items.find((item) => item.id === parseInt(elementId));
    // display items using search results
/*     console.log("Display results");
    console.log("searchResults:", JSON.stringify(items, null, 2));
    console.log("Items:", JSON.stringify(items, null, 2)); */
    searchResults.forEach((elementId) => {
      try {
        const li = document.createElement("li");
        const item = getItemById(elementId);
        console.log(`elementId: ${elementId}, trext: ${item.text}`);
        if (!item) {
          console.error(`Item with id ${elementId} not found in items array`);
          return;
        }

        // console.log("Item to display:", JSON.stringify(item, null, 2));
        const el = document.querySelector(`[data-qf-id="${elementId}"]`);
        if (el && items) {
          // get element using data-qf-id attribute
          // console.log("Item to display:", JSON.stringify(item, null, 2));
          li.textContent = item["text"] || "no text";
          li.dataset.elementId = elementId;
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
          resultsList.appendChild(li);
        }
      } catch (displayError) {
        console.error("Error displaying search result item:", displayError);
      }
    });
    selectFirstResult();
  }
}
export { scrollToElement,  displayResults };
