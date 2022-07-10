# React Playground
With React Playground, you create, test, export and share your ReactJS Components.

Here you can :
1. 🔗 Share your project. You can get at any moment a shareable link without any registration or login. The page's URL is constantly updated at any key stroke, and you can direcly copy it, or use the designed button.
2. ⚛️ Open several tabs, and import/export components and hooks from them.
3. 📦 Import third parties packages, as you would do it in your text editor (e.g. `import styled from 'styled-components'`). React Playground will import them using internally **UNPKG**. you can select a version by adding `@` + version. (e.g. `import React from 'react@18.0.0'`).
4. 🔲 Export your code to CodeSandbox with a click.

## Known bugs and limitations
- When opening a React Plyground for the first time on a browser, the editor may be blank, despite the output being shown. Normally reloading the page will solve the problem. The causes are currently under investigation.
- Imports with URLs won't work, as the bundler will automatically import from **UNPKG**. However it is possible to fetch specific files from a library (e.g. to make MUI work on React Playground, you can do : `import { Alert } from '@mui/material@latest/umd/material-ui.development.js'`)
- You can only open .jsx tabs. However you can style your components with css in js libraries, such as styled-components
- Only JS/JSX third party libraries can be imported (no CSS). However libraries like styled-components work.

## Technologies used
- React
- styled-components
- evento-react, for Component events and less prop-drilling
- lz-string, to compress the project code for the shareble URL
- vite, for scaffolding
- CodeMirror, for the online editor
- *esbuild wasm*, to quickly transpile and bundle on the browser

## Credits
React Playground inspired by [SvelteJS REPL](https://svelte.dev/repl/hello-world), [SolidJS Playground](https://playground.solidjs.com/) and [VueJS Playground](https://sfc.vuejs.org/).
[This Udemy course](https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/) by Stephen Grider, was essential to learn how to work with bundlers in the browser
