user_stories


1. Command Palette Interface:

User Story 1:
As a user, I want to activate a command palette interface using a hotkey, so that I can quickly start searching for elements on a web page without using my mouse.

Acceptance Criteria:
- A hotkey (e.g., Alt+F) activates the command palette overlay
- The command palette appears in the middle of the current web page
- The command palette is keyboard-accessible
- The user's cursor is automatically focused in the search input field

User Story 2:
As a user, I want to type search queries into the command palette, so that I can find interactive elements like buttons, input fields, links on the web page quickly.

Acceptance Criteria:
- The command palette accepts text input
- The search starts automatically as the user types
- The command palette displays matching results in real-time

2. Fuzzy Text Search:

User Story 3:
As a user, I want the extension to perform fuzzy text searches, so that I can find interactive elements like buttons, input fields, links even when I make typos or only remember part of the text.

Acceptance Criteria:
- The search function matches partial text: all buttons, anchors, links and inputs on the page
- The search function is tolerant of minor spelling mistakes
- Search results are ranked by relevance
- The search is performed across all visible elements on the web page

3. Keyboard Navigation:

User Story 4:
As a user, I want to be able to select search result item and navigate to move through results in the command palette using(up/down arrows), updating the UI to show the currently selected item.

Acceptance Criteria:
- Pressing up/down keyboard arrows selects previous/next search result
- Selecting the item in search results updates the UI to show the currently selected item in command pallette visually distinct (e.g.,  changed background, text color)
- Typing additional characters into search field moves selection to the first item from the top (if there are any search results matching) or "No items available".

User tasks: 
1. User has the command palette open with search results displayed
2. User presses the up or down arrow keys to navigate through the list of search results
3. User observes that the currently selected search result item is visually highlighted or distinguished in the command palette UI

4. Dynamic Highlighting:
   
User Story 5:
As a user, I want selected search results to be visually highlighted on the web page, so that I can easily locate the matching elements.

Acceptance Criteria:
- The selected search result is highlighted on the web page.
- The highlighted element may be not in the current view (e.g. when page is long and element located at the bottom)
- The highlight effect is visually distinct (e.g., pulsating border, changed background color)
- The highlight effect is temporary and non-intrusive
- The highlight effect works on various element types (e.g., text, buttons, input fields)


User tasks:

1. User has the command palette open with search results displayed
2. User selects a search result item from the list using the keyboard or mouse
3. The corresponding element on the web page is persistently highlighted with a visually distinct effect (e.g., pulsating border, changed background color)
4. The highlight remains until the user selects a different search result or dismisses the command palette

User Story 6:
As a user, I want to scroll to view search results using Enter key, so that I can quickly move through matches without using my mouse.

Acceptance Criteria:
- Enter key scrolls page into view to ensure selected search result appears in the view. Command pallette is closed
- The selected element is still highlighted on the page 
- Pressing "Ctrl+Enter" key conbination scrolls page into view to ensure selected search result appears in view. Command pallette is still open so that user can select next surch result and press  "Ctrl+Enter" to scroll to view.
- The selected element is still highlighted on the page 
- Pressing Escape key hides command-pallette and deactivates highling. 

User tasks:

1. User has the command palette open with search results displayed
2. User selects a search result item from the list using keyboard or mouse  
3. User presses the "Enter" key
    - The page scrolls to bring the selected element into view
    - The command palette is closed
    - The selected element is highlighted on the page
4. The highlight on the selected element fades away after 4 seconds
5. User presses "Ctrl+Enter" key combination with a search result selected
    - The page scrolls to bring the newly selected element into view  
    - The highlight on the previously selected element is removed
    - The newly selected element is highlighted on the page
    - The command palette remains open
6. User presses the "Escape" key
    - The command palette is closed
    - If an element is currently highlighted, the highlight fades away after 4 seconds


1. Customization:

User Story 7:
As a user, I want to customize the extension's settings, so that I can tailor the search experience to my preferences.

Acceptance Criteria:
- Users can customize the activation hotkey
- Users can choose from different highlighting styles
- Users can adjust search sensitivity or fuzzy matching parameters
- Settings are saved and persist between browser sessions

5. Cross-page Compatibility:

User Story 8:
As a user, I want the Peter Pal extension to work consistently across different websites, so that I can rely on it regardless of the web page structure.

Acceptance Criteria:
- The extension functions on various website layouts and designs
- The search and highlight features work with dynamically loaded content
- The extension doesn't interfere with the normal functioning of websites

6. Performance:

User Story 9:
As a user, I want the Peter Pal extension to perform searches quickly and efficiently, so that it doesn't slow down my browsing experience.

Acceptance Criteria:
- The command palette appears within 500ms of activating the hotkey
- Search results update within 100ms of typing
- The extension doesn't noticeably impact the loading time or performance of web pages

These user stories cover the main features and requirements of the Peter Pal Chrome browser extension. They can be used as a starting point for development and can be further refined or expanded based on additional stakeholder input or technical considerations.


## Roadmap 

1. [done] Navigation Improvements:
   1. Automatically focus on palette input field when palette is triggered
   2. Type query, automatically select first result from the top
2. [todo] Search mode improvements: remove duplicates from search results
3. Search mode improvements: trim too long text
4.  Highlighting improvements: Highlight the row: full-page width area containing the element. Height of the row 70px
5. UI: add frosted glass palette background
6. Search mode improvements: do not display elements with text like `​​&ZeroWidthSpace​`
7. Search mode improvements: filter specific kind of elements, e.g. all childs of `nav`
8. Search mode improvements: allow to see all search results in palette and scroll using mouse, page down. page up
9. Search mode improvements: classic. Search all text displayed on page
10. Use accessibility tree instead of tags to search elements on the page 
11. Add commit linter 
12. Rewrite in the future to use shadcn components
13. Serch mode improvements: Do not display in results elements with no text
14. Serch mode improvements: display in fuzzy-search suggestions prefix - the tag of the element
15. Navigation Improvements:
   1. Automtically focus on palette input field when palette is triggered
   2. Type query, automatically select first result from the top
   3. Press "Shft+Enter". Automatically scroll into element view. Do not close palette. Automatically select next search result up. 
   4. Press "Ctrl+Enter". Automatically scroll into element view. Do not close palette. Automatically select next search result up. 





User Story 10:
As a user, I want to scroll to view search results using Enter key, so that I can quickly move through matches without using my mouse.

Acceptance Criteria:
- Enter key scrolls page into view to ensure selected search result appears in the view. Command pallette is closed
- The selected element is still highlighted on the page 
- Pressing "Ctrl+Enter" key conbination scrolls page into view to ensure selected search result appears in view. Command pallette is still open so that user can select next surch result and press  "Ctrl+Enter" to scroll to view.
- The selected element is still highlighted on the page 
- Pressing Escape key hides command-pallette and deactivates highling. 



##  Search mode improvements: remove duplicates from search results

1. Elements with the same tag-text


## Search mode improvements: filter specific kind of elements, e.g. all childs of `nav`

1. Can use syntax of css locators 
2. Use case: select one element from the group (e.g. menu item), then with a single command list all siblings (e.g. all other menu items), then select desired element using keyboard, mous or filter by text

```markdown
Some examples:
li a DOM descendant combinator. All a tags that are a child of li tags
div.row * selects all elements that are descendant (or child) of the elements with div tag and ‘row’ class
li > a Difference combinator. Select direct descendants, instead of all descendants like the descendant selectors
li + a The adjacent combinator. It selects the element that is immediately preceded by the former element. In this case, only the first a after each li.
li, a Selects all a elements and all li elements.
li ~ a The sibling combinator. Selects a element following a li element.
```

https://www.freecodecamp.org/news/css-selectors-cheat-sheet/