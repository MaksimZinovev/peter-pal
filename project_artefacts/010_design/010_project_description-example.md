Here are the details for the new project:
-----------------------------
Here is a high level description of "Hello_World_Demo":
```
**Project Specification for Simple Theme Switching Web Page**

**Overall Description and Goals:**
The goal is to create a simple web page with a dark theme as the default. This page will feature a "Hello World" H1 heading and a button that allows users to switch between dark and light themes. The user's theme preference should be saved to local storage, ensuring that upon revisiting the page, their chosen theme is automatically applied.

**Features:**
1. **Theme Switching:** A button that toggles the page theme between dark and light.
2. **Theme Persistence:** The chosen theme is saved in the browser's local storage, allowing the theme to persist between page visits.
3. **Content Display:** An H1 heading displaying the text "Hello World" centered above the theme switch button.

**Functional Specification:**

1. **User Interface:**
   - Upon visiting the page, the user is presented with a dark theme by default.
   - The page contains a centrally aligned H1 heading with the text "Hello World".
   - Below the heading, there is a button to switch the theme. The button is labeled according to the current theme (e.g., "Switch to Light Theme" when in dark mode).
   - Clicking the button changes the theme to light if it's currently dark, and to dark if it's currently light.
   - The user’s theme preference is saved to local storage immediately upon selection.

2. **Theme Details:**
   - **Dark Theme:** Background color of the page and text colors should be defined for optimal readability in dark mode.
   - **Light Theme:** Background color of the page and text colors should be adjusted for light mode.

**Technical Specification:**

- **Platform/Technologies:** The application will be a web application built using the Node/Express/MongoDB/Mongoose/EJS stack. The frontend will utilize vanilla JavaScript for functionality and Bootstrap for styling.
- **Local Storage:** JavaScript code for handling theme switching will include functions to save the current theme preference to local storage and retrieve it on subsequent page loads.
- **Frontend:**
  - **Theme Switch Logic:** JavaScript to detect the current theme, switch upon button click, and save the preference.
  - **Styling:** CSS defined for both dark and light themes, toggled by adding or removing a class on the body element.
  - **Persistence:** On page load, a script checks the local storage for the saved theme preference and applies it immediately.

**Integration Specification:**

- **3rd Party Integrations:** None required for this project.
- **Custom API Usage:** Not applicable.

**Architecture:**

- The application will have a simple architecture, with the server rendering the initial HTML page using EJS.
- The frontend will handle theme switching and saving preferences to local storage.
- No backend logic is required for theme management, as this will be entirely handled on the client side.

**Components:**

1. **Server-Side:** A minimal Express setup to serve the initial HTML page.
2. **Client-Side:**
   - HTML layout with EJS for dynamic content if needed in the future.
   - A CSS file defining styles for dark and light themes.
   - Vanilla JavaScript file for handling theme switching and local storage interaction.

This specification outlines the development of a simple web application allowing users to toggle between dark and light themes, with their selection persisting between visits. The implementation focuses on client-side logic for theme management, utilizing local storage for persistence, and leveraging the Node/Express framework for serving the application.
Additional info/examples:
''
```