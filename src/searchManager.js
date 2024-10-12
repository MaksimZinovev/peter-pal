import { Index } from "flexsearch";
import { displayResults } from "./commandPalette.js";
import { sanitizeText } from "./utils.js";

let searchIndex;
let items = [];
let searchIndexInitialized = false;
const initialResultsCount = 5;
const DEBUG_MODE = false;

function generateSearchIndex(elements) {
  const uniqueMap = new Map();
  elements.forEach((el, index) => {
    let text = el.textContent || el.value || el.placeholder || "";
    let tagName = el.tagName;
    text = sanitizeText(text);
    if (text.trim().length > 1) {
      const key = `${text.toLowerCase()}-${tagName}`;
      if (!uniqueMap.has(key)) {
        try {
          uniqueMap.set(key, true);
          searchIndex.add(index, text.trim());
          items.push({ id: index, text: text.trim(), tagName: tagName });
          el.dataset.qfId = index;
          console.log(
            `Added item ${index} with text: "${text.trim()}", tagName: "${tagName}"`
          );
        } catch (addError) {
          console.error("Error adding element to search index:", addError);
        }
      } else {
        console.log(`Removing duplicate key: ${key}`);
      }
    } else {
      console.log(`Removing text less than 1 char: ${text.trim()}`);
    }
  });
}

export function initializeSearch() {
  if (searchIndexInitialized) return;
  searchIndexInitialized = true;
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
    generateSearchIndex(elements);
    if (DEBUG_MODE) {
      console.table(items);
    }
    // eslint-disable-next-line no-debugger
    // debugger;
    console.log("Search index initialized successfully");
    // console.log("searchIndex:", JSON.stringify(searchIndex, null, 2));
  } catch (initError) {
    console.error("Error initializing search index:", initError);
    searchIndex = null;
  }
}

export function getInitialItems() {
  if (!searchIndex) {
    console.error("Search index not initialized");
    return { results: [], items: [] }; 
  }

  console.log(
    "Initial " + initialResultsCount + " items:",
    Object.keys(searchIndex.register).slice(0, initialResultsCount)
  );
  return {
    results: Object.keys(searchIndex.register).slice(0, initialResultsCount),
    items: items,
  }; // Return first N items

}

export function performSearch(query) {
  let { results, items } = getInitialItems();
  console.log("Performing search with query:", query);
  if (!searchIndex) {
    console.error("Search index not initialized");
    displayResults([], items);
    return;
  }

  try {
    if (query) {
      results = searchIndex.search(query, 10);
      console.log("Results:", JSON.stringify(results, null, 2));
    }

    displayResults(results, items);
    return results;
  } catch (searchError) {
    console.error("Error performing search:", searchError);
    displayResults([], items);
    return [];
  }
}
