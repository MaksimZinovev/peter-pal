// searchManager.js
import { Document } from "flexsearch";
import { closeCommandPalette } from "./commandPalette.js";

let searchIndex;

export function initializeSearch() {
  try {
    searchIndex = new Document({
      document: {
        id: "id",
        index: ["text", "tag"],
      },
      tokenize: "forward",
      optimize: true,
      resolution: 9,
      store: true,
    });

    const elements = document.querySelectorAll(
      'a, button, input, textarea, select, label, [role="button"]'
    );
    console.log("Total elements found:", elements.length);
    elements.forEach((el, index) => {
      let text = el.textContent || el.value || el.placeholder || "";
      let tag = el.tagName.toLowerCase();
      if (text.trim()) {
        try {
          searchIndex.add({
            id: index,
            text: text.trim(),
            tag: tag,
          });
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

function getInitialItems() {
  if (!searchIndex) {
    console.error("Search index not initialized");
    return [];
  }

  try {
    // Search with an empty string to get all items
    const results = searchIndex.search("", {
      limit: 3,
      index: "text",
      enrich: true,
    });
    return results;
  } catch (error) {
    console.error("Error getting initial items:", error);
    return [];
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
    const results = searchIndex.search(query, {
      index: ["text", "tag"], // Specify fields to search
      enrich: true,
      // pluck: "text"
      // limit: 10,
    });
    displayResults(results);
  } catch (searchError) {
    console.error("Error performing search:", searchError);
    displayResults([]);
  }
}

export function displayResults(results) {
  console.log(`Results: ${JSON.stringify(results, null, 2)}`);
  const resultsList = document.getElementById("qf-results-list");
  if (!resultsList) {
    console.error("Results list element not found");
    return;
  }

  resultsList.innerHTML = "";

  if (results.length === 0) {
    // Instead of showing "No results found", get initial items
    results = getInitialItems();
  }

  if (results.length === 0) {
    resultsList.innerHTML = "<li>No items available</li>";
    return;
  }

  results.forEach((field) => {
    field.result.forEach((item) => {
      try {
        const li = document.createElement("li");
        const el = document.querySelectorAll(
          'a, button, input, textarea, select, label, [role="button"]'
        )[item.id];
        if (el) {
          li.textContent = item.doc.text;
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
  });
}
