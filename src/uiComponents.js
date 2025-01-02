// uiComponents.js
export const commandPaletteHTML = `
  <div id="quick-fields-command-palette" class="qf-command-palette">
    <div class="qf-command-palette-container">
      <div class="qf-search-wrapper">
        <input type="text" id="qf-search-input" class="qf-search-input" placeholder="Search ..">
      </div>
      <div class="peterpal-results-container">
        <div id="peterpal-recently-used" class="peterpal-recently-used">
        </div>
        <ul id="peterpal-results-list" class="peterpal-results-list"></ul>
      </div>
      <div class="qf-footer">
        Type to search, use ↑↓ to navigate, Enter to select, Alt+Shift+T to toggle theme
      </div>
    </div>
  </div>
`;
