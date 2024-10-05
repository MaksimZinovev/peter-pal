import { Index } from "flexsearch";
import { closeCommandPalette, resetSelectedIndex } from "./commandPalette.js";

let searchIndex;
let items = [];
const initialResultsCount = 5; 
const DEBUG_MODE = false; 
/* items =  [
  {
    "id": 0,
    "text": "screenpipe",
    "tagName": "A"
  },
  {
    "id": 1,
    "text": "screenpipe",
    "tagName": "A"
  }
];  //? 

const removeDuplicates = (arr) => {
  const uniqueMap = new Map();
  
  return arr.filter(obj => {
    const key = `${obj.text}-${obj.tagName}`;
    
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, true);
      return true;
    }
    
    return false;
  });
}; 
removeDuplicates(items) //?  */

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
          items.push({ id: index, text: text.trim() });
          console.log(`Added item ${index} with text: "${text.trim()}"`);
        } catch (addError) {
          console.error("Error adding element to search index:", addError);
        }
      }
    });
    if (DEBUG_MODE) {
      console.table(items); 
    }
    // eslint-disable-next-line no-debugger
    // debugger; 

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

  console.log("All 3 items:", Object.keys(searchIndex.register).slice(0, initialResultsCount));
  return Object.keys(searchIndex.register).slice(0, initialResultsCount); // Return first 3 items
  // return items.slice(0, 3);  // Return first 3 items
}

export function displayInitialItems() {
  if (!searchIndex) {
    console.error("Search index not initialized");
    return;
  }
  const initialItems = getInitialItems();
  // console.log("Initial items:", JSON.stringify(initialItems, null, 2));
  displayResults(initialItems);
}

export function performSearch(query) {
  let results = getInitialItems();
  console.log("Performing search with query:", query);
  if (!searchIndex) {
    console.error("Search index not initialized");
    displayResults([]);
    return;
  }

  try {
    if (query) {
      results = searchIndex.search(query, 10);
      console.log("Results:", JSON.stringify(results, null, 2));
    }
    displayResults(results);
    resetSelectedIndex(); // Reset selection when typing
  } catch (searchError) {
    console.error("Error performing search:", searchError);
    displayResults([]);
  }
}

// Modify the displayResults function
function displayResults(results) {
  const resultsList = document.getElementById("qf-results-list");
  if (!resultsList) {
    console.error("Results list element not found");
    return;
  }

  resultsList.innerHTML = "";

  if (results.length === 0) {
    resultsList.innerHTML = "<li>No items available</li>";
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
        resultsList.appendChild(li);
      }
    } catch (displayError) {
      console.error("Error displaying search result item:", displayError);
    }
  });
}

