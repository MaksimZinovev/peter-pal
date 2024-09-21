import "./styles.css";

// Theme toggle functionality
let currentTheme = "light";
let isCommandPaletteVisible = false;

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

function toggleCommandPalette() {
  console.log(`currentTheme: ${currentTheme}`);
  const existingPalette = document.getElementById(
    "quick-fields-command-palette"
  );
  if (existingPalette) {
    isCommandPaletteVisible = !isCommandPaletteVisible;
    existingPalette.style.display = isCommandPaletteVisible ? "flex" : "none";
    if (isCommandPaletteVisible) {
      document.getElementById("qf-search-input").focus();
    }
  } else {
    document.body.insertAdjacentHTML("beforeend", commandPalette);
    isCommandPaletteVisible = true;
    document.getElementById("qf-search-input").focus();
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

  // Add event listener for theme toggle shortcut
  console.log("Content script loaded");
  console.log(`currentTheme: ${currentTheme}`);
} catch (error) {
  console.error("Error in content script:", error);
}
