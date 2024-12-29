// Function to toggle the command palette
function toggleCommandPalette() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // chrome.tabs.sendMessage(tabs[0].id, {action: "test"}, function(response) {
    //   console.log("Response from content script:", response);
    // });
    if (tabs[0]) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "toggleCommandPalette" },
        () => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          }
        }
      );
    }
  });
}

try {
  // Listen for installation or update of the extension
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed or updated");

    // Set up default theme
    chrome.storage.sync.get("theme", (data) => {
      if (!data.theme) {
        chrome.storage.sync.set({ theme: "dark" }, () => {
          console.log("Default theme set to dark");
        });
      }
    });
  });


  // In the existing chrome.commands.onCommand listener
  chrome.commands.onCommand.addListener((command) => {
    console.log("Command received:", command);
    if (command === "toggle-command-palette") {
      console.log("Toggling command palette");
      toggleCommandPalette();
    } else if (command === "toggle-theme") {
      console.log("Toggling theme");
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "toggleTheme" }, () => {
            if (chrome.runtime.lastError) {
              console.error(
                "Error sending toggleTheme message:",
                chrome.runtime.lastError
              );
            }
          });
        }
      });
    }
  });

  // In the existing chrome.runtime.onMessage listener, remove or comment out this line:
  // console('Setting theme:', request.theme);

  // Listen for messages from content scripts
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTheme") {
      chrome.storage.sync.get("theme", (data) => {
        if (chrome.runtime.lastError) {
          console.error("Error getting theme:", chrome.runtime.lastError);
          sendResponse({ error: "Failed to get theme" });
        } else {
          sendResponse({ theme: data.theme });
        }
      });
      return true; // Indicates that the response is asynchronous
    } else if (request.action === "setTheme") {
      chrome.storage.sync.set({ theme: request.theme }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error setting theme:", chrome.runtime.lastError);
          sendResponse({ error: "Failed to set theme" });
        } else {
          console.log("Setting theme:", request.theme);
          sendResponse({ success: true });
        }
      });
      return true; // Indicates that the response is asynchronous
    }
  });

  console.log("Background script loaded successfully");
} catch (error) {
  console.error("Error in background script:", error);
}
