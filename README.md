# React Playground
With React Playground, you create, test, export, and share your ReactJS Components.

Here you can :
1. 🔗 Share your project. You can get at any moment a shareable link without any registration or login. The page's URL is constantly updated at any keystroke, and you can directly copy it, or use the designed button.
2. ⚛️ Open several tabs, and import/export components and hooks from them.
3. 📦 Import third parties packages, as you would do it in your text editor (e.g. `import styled from 'styled-components'`). React Playground will import them using internally [*esm.sh*]('https://esm.sh). you can select a version by adding `@` + version. (e.g. `import React from 'react@18.0.0'`).
4. 🔲 Export your code to CodeSandbox with a click.

## Known bugs and limitations
- The bundler will automatically import from *esm.sh*, and is therefore subject to any limitations coming from the CDN (e.g. some dependencies cannot be imported)
- You can only open .jsx tabs. However, you can style your components with CSS in js libraries, such as styled-components
- Only JS/JSX third-party libraries can be imported (no CSS). However, libraries like styled-components work.

## Technologies used
- [ReactJS](https://reactjs.org/)
- [styled-components](https://styled-components.com/)
- [evento-react](https://www.npmjs.com/package/evento-react/v/0.2.1), for Component events and less prop-drilling
- [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html), to compress the project code for the shareable URL
- [Vite](https://vitejs.dev/), for scaffolding
- [CodeMirror](https://codemirror.net/), for the online editor (in particular [@uiwjs/react-codemirror](https://github.com/uiwjs/react-codemirror))
- [*esbuild wasm*](https://www.npmjs.com/package/esbuild-wasm), to quickly transpile and bundle on the browser

## Credits
React Playground is inspired by [SvelteJS](https://svelte.dev/repl/hello-world) REPL](https://svelte.dev/repl/hello-world), [SolidJS Playground](https://playground.solidjs.com/), and [VueJS Playground](https://sfc.vuejs.org/)](https://sfc.vuejs.org/).

[This Udemy course](https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/) by Stephen Grider was essential to learn how to work with bundlers in the browser.
