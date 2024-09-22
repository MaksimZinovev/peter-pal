import "./styles.css";
import { Index } from "flexsearch";

// Global variables to store the search index and UI state
let searchIndex;
let isCommandPaletteVisible = false;
let currentTheme = "light";

// Function to load theme CSS
function loadThemeCSS(theme) {
  try {
    const existingLink = document.querySelector(
      `link[href*="theme-${theme}.bundle.css"]`
    );
    if (existingLink) {
      console.log(`Theme CSS already loaded: ${existingLink.href}`);
      return;
    }

    const link = document.createElement("link");
    link.href = chrome.runtime.getURL(`dist/theme-${theme}.bundle.css`);
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    console.log(`Theme CSS loaded: ${link.href}`);
  } catch (error) {
    console.error("Error in content script:", error);
  }
}

function toggleTheme() {
  const oldTheme = currentTheme;
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  console.log(`Setting theme: ${currentTheme}`);
  document.body.classList.remove(`qf-${oldTheme}-theme`);
  document.body.classList.add(`qf-${currentTheme}-theme`);
  // Remove old theme CSS
  const oldLink = document.querySelector(
    `link[href*="theme-${oldTheme}.bundle.css"]`
  );
  if (oldLink) {
    oldLink.remove();
  }
  loadThemeCSS(currentTheme);
  chrome.runtime.sendMessage({ action: "setTheme", theme: currentTheme });
}

// Function to toggle the visibility of the command palette
function toggleCommandPalette() {
  console.log(`currentTheme: ${currentTheme}`);
  const existingPalette = document.getElementById(
    "quick-fields-command-palette"
  );
  if (existingPalette) {
    // If the palette already exists, toggle its visibility
    isCommandPaletteVisible = !isCommandPaletteVisible;
    existingPalette.style.display = isCommandPaletteVisible ? "flex" : "none";
    if (isCommandPaletteVisible) {
      initializeSearch(); // Reinitialize search when showing the palette
      const searchInput = document.getElementById("qf-search-input");
      if (searchInput) {
        searchInput.focus();
      } else {
        console.error("Search input element not found");
      }
    }
  } else {
    // If the palette doesn't exist, create it
    try {
      document.body.insertAdjacentHTML("beforeend", commandPalette);
      isCommandPaletteVisible = true;
      initializeSearch();
      const searchInput = document.getElementById("qf-search-input");
      if (searchInput) {
        searchInput.focus();
      } else {
        console.error("Search input element not found");
      }
    } catch (paletteError) {
      console.error("Error creating command palette:", paletteError);
    }
  }
}

function closeCommandPalette() {
  const palette = document.getElementById("quick-fields-command-palette");
  if (palette) {
    palette.style.display = "none";
    isCommandPaletteVisible = false;
  }
}

const commandPalette = `
  <div id="quick-fields-command-palette" class="qf-command-palette">
    <div class="qf-command-palette-container">
      <div class="qf-search-wrapper">
        <input type="text" id="qf-search-input" class="qf-search-input" placeholder="Search ..">
      </div>
      <div class="qf-results-container">
        <div id="qf-recently-used" class="qf-recently-used">
        </div>
        <ul id="qf-results-list" class="qf-results-list"></ul>
      </div>
      <div class="qf-footer">
        Type to search, use ↑↓ to navigate, Enter to select, Alt+Shift+T to toggle theme
      </div>
    </div>
  </div>
`;

// Function to initialize the search index and populate it with page elements
// #region function initializeSearch()
function initializeSearch() {
  try {
    // Create a new Flexsearch Index with specific configuration
    searchIndex = new Index({
      tokenize: "forward",
      resolution: 9,
      cache: 100,
      minlength: 2,
      encoder: "simple", // or use a custom encoder function if needed
    });

    // Select all interactive elements on the page
    const elements = document.querySelectorAll(
      'a, button, input, textarea, select, label, [role="button"]'
    );
    console.log("Total elements found:", elements.length);
    elements.forEach((el, index) => {
      // Extract text content from the element
      let text = el.textContent || el.value || el.placeholder || "";
      if (text.trim()) {
        console.log(`Adding element to index: "${text.trim()}"`);
        try {
          // Add each element to the search index
          searchIndex.add(index, text.trim());
        } catch (addError) {
          console.error("Error adding element to search index:", addError);
        }
      }
    });
    console.log("Search index initialized successfully");
  } catch (initError) {
    console.error("Error initializing search index:", initError);
    searchIndex = null;
  }
}

// Debounce function to limit how often a function is called
// This helps to reduce the number of searches performed while the user is still typing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to perform the search using Flexsearch
// #region performSearch(query)
function performSearch(query) {
  console.log("Performing search with query:", query);
  if (!searchIndex) {
    console.error("Search index not initialized");
    displayResults([]);
    return;
  }

  try {
    // Perform the search and limit to 10 results
    console.log("Search index", JSON.stringify(searchIndex, null, 2));
    const results = searchIndex.search(query, 10);
    // console.log("Search results:", JSON.stringify(results, null, 2));
    displayResults(results);
  } catch (searchError) {
    console.error("Error performing search:", searchError);
    displayResults([]);
  }
}

// Function to display search results in the command palette
function displayResults(results) {
  const resultsList = document.getElementById("qf-results-list");
  if (!resultsList) {
    console.error("Results list element not found");
    return;
  }

  resultsList.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    resultsList.innerHTML = "<li>No results found</li>";
    return;
  }

  // Iterate through the results and create list items for each
  results.forEach((id) => {
    try {
      const li = document.createElement("li");
      const el = document.querySelectorAll(
        'a, button, input, textarea, select, label, [role="button"]'
      )[id];
      if (el) {
        li.textContent = el.textContent || el.value || el.placeholder || "";
        // Add click event to focus and click the original element
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
}

try {
  console.log("Content script loaded");
  console.log(` currentTheme: ${currentTheme}`);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isCommandPaletteVisible) {
      closeCommandPalette();
    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleCommandPalette") {
      toggleCommandPalette();
      sendResponse({ status: "Command palette toggled" });
    } else if (request.action === "toggleTheme") {
      toggleTheme();
      sendResponse({ status: "Theme toggled" });
    }
  });

  // Initialize theme
  chrome.runtime.sendMessage({ action: "getTheme" }, (response) => {
    console.log(`Initialize currentTheme: `);
    if (response.theme) {
      currentTheme = response.theme;
      console.log(`Initialize currentTheme: ${currentTheme}`);
      document.body.classList.add(`qf-${currentTheme}-theme`);
      loadThemeCSS(currentTheme);
    }
  });

  // Add event listener for search input with debounce
  document.addEventListener(
    "input",
    debounce((e) => {
      if (e.target.id === "qf-search-input") {
        performSearch(e.target.value);
      }
    }, 50)
  ); // Wait for 300ms of inactivity before performing the search

  console.log("Content script loaded");
  console.log(`currentTheme: ${currentTheme}`);
} catch (error) {
  console.error("Error in content script:", error);
}
