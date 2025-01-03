<div align="center">
  <img src="./img/logo.png" alt="Peter Pal Logo" width="400" height="400"/>
  <h1>Peter Pal 🔍</h1>
  <p>Your keyboard-focused search companion for Chrome</p>
</div>

![Static Badge](https://img.shields.io/badge/mission-your_keyboard_focused_search_companion_for_chrome-purple)  
![GitHub top language](https://img.shields.io/github/languages/top/maksimzinovev/peter-pal) ![GitHub last commit](https://img.shields.io/github/last-commit/MaksimZinovev/peter-pal) [![License: MIT](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
<br/>

<h2>📋 Table of Contents</h2>

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [For Developers](#for-developers)
  - [For End Users](#for-end-users)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

<h2>🧐 About</h2>

Peter Pal is a tiny Chrome extension that provides a command palette for effortless, user-friendly, keyboard-focused search on web pages. It allows quick search of elements by text and highlights them for improved visibility. The extension aims to streamline navigation and enhance productivity for users interacting with content-heavy web pages.

> [!NOTE]
> This is work in progress and my first open-source project I built using AI tools. I am not a software developer. This is educational project helping me to learn how to build web apps. Expect bugs and mistakes in code 🐞

> [!NOTE]
> I will appreciate your feedback. Feel free to submit your bug report of feature request. Click this [link](https://github.com/MaksimZinovev/peter-pal/issues).
> I hope this repo will be helpful for other people. 

Check out my YouTube channel for more info. 

<div align="center">
  <a href="https://youtu.be/5PGIb2lSfHM" target="_blank">
    <img src="./img/youtube-thumbnail.png" alt="Youtube Peter Pal" width="400" />
  </a>
</div>


<h2>✨ Features</h2>

1. 🎨 Command Palette Interface: An intuitive keyboard-driven interface using a command palette for efficient text-based searches.
2. 🔍 Fuzzy Text Search: Super-fast fuzzy search capability that matches elements based on their textual content, even with partial or misspelled queries.
3. ⌨️ Keyboard navigation: Ability to select search result items and navigate through results in the command palette using up/down arrow keys.
4. 🎯 Automatic focus on element: Ability to scroll to view selected search results using the Enter key, so that users can quickly move through matches without using their mouse.
5. 🌟 Dynamic Highlighting: After pressing Enter or Ctr+Enter selected element is instantly highlighted on the web page with dynamic visual effects, making it easier for users to spot the targeted elements amid a large number of fields and components.
6. 🌓 Theme Toggle: Switch between light and dark themes for comfortable usage in different environments.

<div align="center">
  <img src="./img/palette-dark.png" alt="Command Pallete Dard" width="800" />
  <br/>
  <img src="./img/palette-light.png" alt="Command Pallete Dard" width="800" />
  
</div>


<h2>🚀 Getting Started</h2>

<h3>👨‍💻 For Developers</h3>

<h4>Prerequisites</h4>

To work on Peter Pal, you'll need:

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)
- Google Chrome browser

<h4>Installation</h4>

1. Clone the repository:
   ```
   git clone https://github.com/your-username/peter-pal.git
   cd peter-pal
   ```

2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   - For production:
     ```
     npm run build
     ```
   - For development:
     ```
     npm run build:dev
     ```
   - To watch for changes during development:
     ```
     npm run watch
     ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the `dist` directory in your project folder

5. Start developing!

Common recommendations for Chrome extension development:
- Always test your changes in an actual Chrome environment
- Use the Chrome Developer Tools for debugging
- Familiarize yourself with the [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- Keep security in mind and follow best practices for extension development

<h3>👥 For End Users (Coming Soon)</h3>

To install Peter Pal as an end user:

1. Visit the Chrome Web Store (link to be provided once the extension is published)
2. Click on "Add to Chrome"
3. Confirm the installation when prompted
4. The Peter Pal icon should now appear in your Chrome toolbar

<h2>📖 Usage</h2>

Peter Pal is designed to be intuitive and keyboard-friendly. Here are the main keyboard shortcuts:

- `Alt+Shift+I`: Toggle the command palette
- `Alt+Shift+T`: Toggle between light and dark themes

To use Peter Pal:

1. Press `Alt+Shift+I` to open the command palette
2. Start typing to search for elements on the page
3. Use up/down arrow keys to navigate through search results
4. Press `Ctr+Enter` to focus on the selected element. This does not close palette
5. Press `Enter` to focus on the selected element and close palette

For a more detailed guide on usage and features, please refer to our documentation (link to be added).

<h2>🤝 Contributing</h2>

We welcome contributions to Peter Pal! If you'd like to contribute, please:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Submit a pull request with a clear description of your changes

For more information on contributing, please see our contribution guidelines (link to be added). 
 
<h2>📄 License</h2>

This project is licensed under the Apache-2.0 license. See the LICENSE file for details.

## Primary contributors

<a href="https://github.com/MaksimZinovev"><img src="https://avatars.githubusercontent.com/u/53397443?v=4" title="Maksim Zinovev" width="50" height="50"></a>
<br /><br />
<a href="https://x.com/maxfaber_Om">![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/maxfaber_Om)</a>

<h2> Inspiration and Interesting links</h2>

- https://htmlcsscleaner.com
- https://www.htmlwasher.com