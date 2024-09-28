---
created: 2024-09-28T10:52:47.510Z
updated: 2024-09-28T10:55:36.249Z
assigned: ""
progress: 0
tags: []
---

# User Story 6 Scroll into view

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
