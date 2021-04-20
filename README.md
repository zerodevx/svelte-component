# svelte-component

An opinionated starter template to create shareable Svelte components, featuring:

- [x] Linting with [Standardjs](https://github.com/standard/standard)
- [x] Workflow for local development cum demo site

## Usage

Clone with [degit](https://github.com/Rich-Harris/degit) and install dependencies

```bash
$ npx degit zerodevx/svelte-component my-component
$ cd my-component
$ npm i
```

Your component's source code lives in `src/Component.svelte`.

You can create a package that exports multiple components by adding them to the `src` directory and editing `src/index.js` to reexport them as named exports.

## Develop your component

Start the server:

```bash
$ npm run dev
```

This serves the `/docs` directory at `http://localhost:5000`, and doubles-up as a demo site as well via Github Pages.

## Consuming components

Your package.json has a `"svelte"` field pointing to `src/index.js`, which allows Svelte apps to import the source code directly, if they are using a bundler plugin like [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte) or [svelte-loader](https://github.com/sveltejs/svelte-loader) (where [`resolve.mainFields`](https://webpack.js.org/configuration/resolve/#resolve-mainfields) in your webpack config includes `"svelte"`). **This is recommended.**

For everyone else, `npm run build` will bundle your component's source code into a plain JavaScript module (`dist/index.mjs`) and a UMD script (`dist/index.js`). This will happen automatically when you publish your component to npm, courtesy of the `prepublishOnly` hook in package.json.
