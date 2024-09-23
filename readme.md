


## Continue 

- Highlight code and press ⌘I to quickly make natural language edits
- Highlight code and press ⌘L to add it to the chat window
- Click the gear icon in the bottom right to configure Continue


## How It Works 

```mermaid 
   subgraph content.js
        A[Initialize] --> B{Event Listeners}
        B --> |"Esc key"| C[closeCommandPalette]
        B --> |"toggleCommandPalette"| D[toggleCommandPalette]
        B --> |"toggleTheme"| E[toggleTheme]
        B --> |"input"| F[performSearch]
    end

    subgraph commandPalette.js
        G[toggleCommandPalette] --> H{Palette Exists?}
        H --> |Yes| I[Toggle Visibility]
        H --> |No| J[Create Palette]
        I --> K[focusSearchInput]
        J --> K
        K --> L[displayInitialItems]
        M[closeCommandPalette]
    end

    subgraph themeManager.js
        N[initializeTheme] --> O[loadThemeCSS]
        P[toggleTheme] --> Q[Update DOM classes]
        Q --> O
        R[getCurrentTheme]
    end

    subgraph searchManager.js
        S[initializeSearch] --> T[Create Index]
        T --> U[Add Elements to Index]
        V[performSearch] --> W{Query Exists?}
        W --> |Yes| X[Search Index]
        W --> |No| Y[Get Initial Items]
        X --> Z[displayResults]
        Y --> Z
        AA[displayInitialItems] --> Y
    end

    A --> N
    D --> G
    E --> P
    F --> V
    G --> R
    L --> AA
    C --> M

```


## Inspiration 

1. [RangerMauve/web-palette](https://github.com/RangerMauve/web-palette)