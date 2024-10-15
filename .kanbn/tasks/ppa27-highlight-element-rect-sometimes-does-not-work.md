---
created: 2024-10-13T13:23:37.648Z
updated: 2024-10-13T13:24:40.549Z
assigned: ""
progress: 0
tags:
  - bug
started: 2024-10-13T13:24:40.549Z
---

# ppa27 highlightElementRect sometimes does not work 

ppa27-highlight-element-rect-sometimes-does-not-work
## Replication steps:

1. Open https://picocss.com/ site
2. Open Peter Pla command palette
3. Type "Discover"
4. Observe search 2 results are present, as expected "Discover the class-less version" "Discover the responsive font sizes"
5. press Ctr+Enter on  item "Discover the class-less version" and press Enter
6.  Observe that browser scrolled into view of "Discover the class-less version" link element. 
7. Element outline is highlighted  - function highlightElementOutline. 
8. Observe that rectangle highlighting is not present  - highlightElementRect function.
9.  Type "Examples" and press Ctr+Enter on  "Examples" item in command palette search result 
10. Observe that browser scrolled into view of "Examples" link element.
11. Observe Element outline is highlighted  - function highlightElementOutline. 
12. Observe that rectangle highlighting is not present  - highlightElementRect function.
13. press Ctr+Enter on  "Examples" item in command palette search result again. 
14. Observe Element outline is highlighted  - function highlightElementOutline. 
15. Observe that rectangle highlighting is now present  - displayed by highlightElementRect function.


Expected result

both highlights should always work: highlightElementRect and highlightElementOutline