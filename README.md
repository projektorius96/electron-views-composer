# Project name: electron-views-composer

> This is and will be publicly available ongoing (live) project, a multi-window GUI prototype primarily aimed towards [Placard.js-light](https://github.com/projektorius96/Placard.js-light) project I am actively working on...

### Development process

1. Prerequisites: `npm ci`
2. Run command: `npx electron main.mjs`

> **Dev advice**: If you have [nodemon](https://www.npmjs.com/package/nodemon) installed on your system globally, simply run `nodemon --exec npx electron main.mjs`: _the entry file name_ (e.g. _main.mjs_) may vary tho, so beware !

### Dev experience

> **IMPORTANT**: Make sure your top-level DOM element for each View has `style.height` property set as `height:100vh` - this will allow adjacent `Views` to be stacked in a nice one-to-one manner without any visual gaps

---

> Made with ♥ by [**projektorius96**](https://github.com/projektorius96)