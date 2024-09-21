function loadThemeCSS(theme) {
  try {
    const existingLink = document.querySelector(`link[href*="theme-${theme}.bundle.css"]`);
    if (existingLink) {
      console.log(`Theme CSS already loaded: ${existingLink.href}`);
      return;
    }

    const link = document.createElement('link');
    link.href = chrome.runtime.getURL(`dist/theme-${theme}.bundle.css`);
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    console.log(`Theme CSS loaded: ${link.href}`);
  } catch (error) {
    console.error("Error in content script:", error);
  }
}
