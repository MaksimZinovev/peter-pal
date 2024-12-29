// uiComponents.js
export const commandPaletteHTML = `
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
