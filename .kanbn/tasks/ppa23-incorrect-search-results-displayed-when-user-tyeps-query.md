---
created: 2024-10-12T02:37:21.649Z
updated: 2024-10-12T07:13:51.926Z
assigned: ""
progress: 0
tags:
  - bug
completed: 2024-10-12T07:13:51.927Z
---

# ppa23 Incorrect search results displayed when user tyeps query

## Replication steps: 

1. Open https://picocss.com/ site
2. Open Peter Pla command palette
3. Type "Discover"
4. Observe search 2 results are present, as expected
"Discover the class-less version"
"Discover the responsive font sizes"
4. Close palette.
5. Open palette.
6. Type "Discover"
7. Observe search 3 results are present. They are not relevant to query
- Monthly JSDelivr Requests
- Get started
- Issues
8.Reload page and repeat steps 1-4
9. Search line on the page with text "Discover the responsive font sizes" and observe it is present
10. Inspect element using browser dev tools
```html
<a data-discover="true" href="/docs/typography">Discover the responsive font sizes<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon-arrow-right"><g class="head"><path d="M10 16L14 12"></path><path d="M10 8L14 12"></path></g><path class="line" d="M0 12H14"></path></svg></a>
```
11. Observe debug logs in console when search query returns incorrect results



performSearch function seems to be returning correct result No 15. 
```
Performing search with query: Disc
searchManager.js:92 Results: [
  13,
  15
]
```

12. Observe console logs when earch is intialised: 
"Discover the responsive font sizes"  was added to searchIndex:
```
Added item 13 with text: "Discover the class-less version", tagName: "A"
searchManager.js:31 Removing duplicate key: get started-A
searchManager.js:24 Added item 15 with text: "Discover the responsive font sizes", tagName: "A"
searchManager.js:24 Added item 16 with text: "Learn about the color schemes", tagName: "A"
searchManager.js:24 Added item 17 with text: "Learn about the CSS variables", tagName: "A"
searchManager.js:24 Added item 18 with text: "Quick start", tagName: "A"
searchManager.js:24 Added item 19 with text: "What’s new?", tagName: "A"
```

## Actual result

Command palette does not show search result "Discover the responsive font sizes"

## Expected result 

Command palette does not show search result "Discover the responsive font sizes". 
Confirm that this text is present on the page
