```markdown
1. 
2. remove duplicates

```
```js
[
    {
        "id": 0,
        "text": "screenpipe",
        "tagName: "A"
    },
    {
        "id": 1,
        "text": "screenpipe",
                "tagName: "A"
    }
]
```

```

```
```javascript
const removeDuplicates = (arr) => {
  const uniqueMap = new Map();
  
  return arr.filter(obj => {
    const key = `${obj.text}-${obj.tagName}`;
    
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, true);
      return true;
    }
    
    return false;
  });
};

// Example usage:
const array = [
  {
    "id": 0,
    "text": "screenpipe",
    "tagName": "A"
  },
  {
    "id": 1,
    "text": "screenpipe",
    "tagName": "A"
  }
];

const result = removeDuplicates(array);
console.log(result);

```