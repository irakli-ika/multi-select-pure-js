# MultiselectJs

A clean, customizable multi-select dropdown component built with pure JavaScript and Tailwind CSS.

## Features

* ✅ Lightweight & fast
* ✅ No dependencies (except Tailwind CSS)
* ✅ Easy integration with any project
* ✅ Flexible option data
* ✅ Modern UI with Tailwind styling

## Requirements

- Tailwind CSS is required for styling.

## Installation

Include directly from CDN:

```html
<script src="https://unpkg.com/multiselect"></script>
```

Or install via NPM 

```bash
npm i multiselectjs
```

## Usage

1. Add a container element that will be passed to the MultiSelect instance:

    ```html
    <!-- By ID -->
    <div id="my-select" data-ms></div>
    ```

2. Initialize the MultiSelectJs
    - Option A: ESM
    
    ```js
    import MultiSelectJs from 'multiselectjs';

    const options = [
        { id: 1, name: 'Option A' },
        { id: 2, name: 'Option B' },
        { id: 3, name: 'Option C' }
    ];

    new MultiSelectJs(document.querySelector('[data-ms]'), options);
    ```

    - Option B: Using CDN

    ```html
    <script src="https://unpkg.com/multiselectjs"></script>
    <script>
        const options = [
            { id: 1, name: 'Option A' },
            { id: 2, name: 'Option B' },
            { id: 3, name: 'Option C' }
        ];

        new MultiSelectJs(document.querySelector('[data-ms]'), options);
    </script>
    ```

    - Option C: Using CommonJS
    
    ```js
    const MultiSelectJs = require('multiselectjs');
    
    const options = [
            { id: 1, name: 'Option A' },
            { id: 2, name: 'Option B' },
            { id: 3, name: 'Option C' }
        ];

    new MultiSelectJs(document.querySelector('[data-ms]'), options);
    ```

## Example Options Format

The options must have `id` and `name`

for example:

```js
[
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'PHP' },
  { id: 3, name: 'Python' }
]
```