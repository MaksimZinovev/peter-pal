// Debounce function to limit the rate at which a function can fire
export function debounce(func, wait) {
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

// Helper function to sanitize text by removing non-visible characters
/* 
Zero Width Space (U+200B)
Zero Width No-Break Space (U+FEFF)
Zero Width Joiner (U+200D)
Zero Width Non-Joiner (U+200C)
Soft Hyphen (U+00AD)
Line Separator (U+2028)
Paragraph Separator (U+2029)
Object Replacement Character (U+FFFC)
Replacement Character (U+FFFD)
Non-Breaking Space (U+00A0)
*/
export function sanitizeText(text) {
  const nonVisibleCharsPattern =
    /\u200B|\uFEFF|\u200D|\u200C|\u00AD|\u2028|\u2029|\uFFFC|\uFFFD|\u00A0/g;
  return text.replace(nonVisibleCharsPattern, "");
}
