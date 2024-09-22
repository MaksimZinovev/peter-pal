let currentTheme = "light";

export function loadThemeCSS(theme) {
  try {
    const existingLink = document.querySelector(
      `link[href*="theme-${theme}.bundle.css"]`
    );
    if (existingLink) {
      console.log(`Theme CSS already loaded: ${existingLink.href}`);
      return;
    }

    const link = document.createElement("link");
    link.href = chrome.runtime.getURL(`dist/theme-${theme}.bundle.css`);
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    console.log(`Theme CSS loaded: ${link.href}`);
  } catch (error) {
    console.error("Error loading theme CSS:", error);
  }
}

export function toggleTheme(currentTheme) {
  const oldTheme = currentTheme;
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  console.log(`Setting theme: ${currentTheme}`);
  document.body.classList.remove(`qf-${oldTheme}-theme`);
  document.body.classList.add(`qf-${currentTheme}-theme`);
  const oldLink = document.querySelector(
    `link[href*="theme-${oldTheme}.bundle.css"]`
  );
  if (oldLink) {
    oldLink.remove();
  }
  loadThemeCSS(currentTheme);
  chrome.runtime.sendMessage({ action: "setTheme", theme: currentTheme });
}

export function initializeTheme(currentTheme) {
  chrome.runtime.sendMessage({ action: "getTheme" }, (response) => {
    if (response.theme) {
      currentTheme = response.theme;
      console.log(`Initialize currentTheme: ${currentTheme}`);
      document.body.classList.add(`qf-${currentTheme}-theme`);
      loadThemeCSS(currentTheme);
    }
  });
}

export function getCurrentTheme() {
  return currentTheme;
}