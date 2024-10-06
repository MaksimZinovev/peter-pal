import { Index } from "flexsearch";
import { displayResults } from "./commandPalette.js";

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

export function getInitialItems() {
  if (!searchIndex) {
    console.error("Search index not initialized");
    return [];
  }

  console.log(
    "Initial " + initialResultsCount + " items:",
    Object.keys(searchIndex.register).slice(0, initialResultsCount)
  );
  return Object.keys(searchIndex.register).slice(0, initialResultsCount); // Return first N items
  // return items.slice(0, 3);  // Return first 3 items
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
    return results;
  } catch (searchError) {
    console.error("Error performing search:", searchError);
    displayResults([]);
    return [];
  }
}


