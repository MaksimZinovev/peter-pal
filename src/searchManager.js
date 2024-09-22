// searchManager.js
import { Index } from "flexsearch";
import { closeCommandPalette } from "./commandPalette.js";

let searchIndex;

export function initializeSearch() {
  try {
    searchIndex = new Index({
      tokenize: "forward",
      resolution: 9,
      cache: 100,
      minlength: 2,
      encoder: "simple",
    });

    const elements = document.querySelectorAll(
      'a, button, input, textarea, select, label, [role="button"]'
    );
    console.log("Total elements found:", elements.length);
    elements.forEach((el, index) => {
      let text = el.textContent || el.value || el.placeholder || "";
      if (text.trim()) {
        try {
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

export function performSearch(query) {
  console.log("Performing search with query:", query);
  if (!searchIndex) {
    console.error("Search index not initialized");
    displayResults([]);
    return;
  }

  try {
    const results = searchIndex.search(query, 10);
    displayResults(results);
  } catch (searchError) {
    console.error("Error performing search:", searchError);
    displayResults([]);
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
    resultsList.innerHTML = "<li>No results found</li>";
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
