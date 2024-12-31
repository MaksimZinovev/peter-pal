// uiComponents.js
export const commandPaletteHTML = `
  <div id="peterpal-command-palette" class="peterpal-command-palette">
    <div class="peterpal-command-palette-container">
      <div class="peterpal-search-wrapper">
        <input type="text" id="peterpal-search-input" class="peterpal-search-input" placeholder="Search ..">
      </div>
      <div class="peterpal-results-container">
        <div id="qf-recently-used" class="qf-recently-used">
        </div>
        <ul id="peterpal-results-list " class="peterpal-results-list "></ul>
      </div>
      <div class="peterpal-footer">
        Type to search, use ↑↓ to navigate, Enter to select, Alt+Shift+T to toggle theme
      </div>
    </div>
  </div>
`;
