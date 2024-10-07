---
created: 2024-10-07T10:12:25.098Z
updated: 2024-10-07T10:16:07.110Z
assigned: ""
progress: 0
tags:
  - feature
started: 2024-10-07T10:16:07.110Z
---

# ppa18 Search improvements. Remove duplicates

### User Story 1: Remove Duplicates from Search Results

**As a** user of the Peter Pal Chrome extension,  
**I want** the search results to exclude duplicates,  
**So that** I can see only unique matches and avoid redundant options.

**Acceptance Criteria:**
1. When a user performs a search, the extension should filter out any duplicate results based on the combination of the tag and text content of the elements (case insensitive).
2. The search results should display only unique matches.
3. The removal of duplicates should not affect the performance of the search operation.

**User Tasks:**
1. Perform a search using the command palette.
2. Verify that the search results do not contain any duplicate entries based on the combination of tag and text.
3. Ensure that the performance of the search operation is not negatively impacted.

### User Story 2: Remove Single Character Results

**As a** user of the Peter Pal Chrome extension,  
**I want** the search results to exclude single character results (e.g., "@"),  
**So that** I can avoid unhelpful and irrelevant matches in my search.

**Acceptance Criteria:**
1. When a user performs a search, the extension should filter out any results that consist of a single character.
2. The search results should not include any single character matches.
3. The filtering of single character results should not affect the performance of the search operation.

**User Tasks:**
1. Perform a search using the command palette.
2. Verify that the search results do not contain any single character entries.
3. Ensure that the performance of the search operation is not negatively impacted.


Certainly! Here is a list of common non-visible characters that are often used on web pages and should be filtered out to improve search results:

### User Story 3: Remove Zero-Width Space and Similar Search Results

**As a** user of the Peter Pal Chrome extension,  
**I want** the search results to exclude zero-width spaces and similar non-visible characters,  
**So that** I can avoid unhelpful and irrelevant matches in my search.

**Acceptance Criteria:**
1. When a user performs a search, the extension should filter out any results that contain the following non-visible characters:
   - Zero Width Space (U+200B)
   - Zero Width No-Break Space (U+FEFF)
   - Zero Width Joiner (U+200D)
   - Zero Width Non-Joiner (U+200C)
   - Soft Hyphen (U+00AD)
   - Line Separator (U+2028)
   - Paragraph Separator (U+2029)
   - Object Replacement Character (U+FFFC)
   - Replacement Character (U+FFFD)
   - Non-Breaking Space (U+00A0)
2. The search results should not include any entries with the listed non-visible characters.
3. The filtering of non-visible characters should not affect the performance of the search operation.

**User Tasks:**
1. Perform a search using the command palette.
2. Verify that the search results do not contain any entries with the following non-visible characters:
   - Zero Width Space (U+200B)
   - Zero Width No-Break Space (U+FEFF)
   - Zero Width Joiner (U+200D)
   - Zero Width Non-Joiner (U+200C)
   - Soft Hyphen (U+00AD)
   - Line Separator (U+2028)
   - Paragraph Separator (U+2029)
   - Object Replacement Character (U+FFFC)
   - Replacement Character (U+FFFD)
   - Non-Breaking Space (U+00A0)
3. Ensure that the performance of the search operation is not negatively impacted.

### Additional Notes:

- **Performance:** Ensure that the filtering processes for duplicates, single character results, and non-visible characters do not significantly slow down the search functionality.
- **User Feedback:** Consider adding a setting in the customization options for users to toggle these filters on or off, if desired.
