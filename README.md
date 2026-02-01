# Project name: electron-views-composer

> This is and will be publicly available ongoing (living) project, a multi-window GUI prototype primarily aimed towards [Vekt.js-light](https://github.com/projektorius96/Vekt.js-light) project I also do maintain...

### Conventions

- This repository primarily targets JavaScript, not TypeScript users, thus `.mjs` extension deliberately is reserved for ESM-first Electron's main process or Node.js environments, respectively.
- The `Views` defined under `./views/` path: each path has entry point `index.html` linked with sourced `main.js` within its respective `index.html` counterpart, which unlike `main.mjs`, the `main.js` which self-evidently implies is a part of Document Object Model (DOM) under Electron's renderer process, rather than Electron's main process per se.

### Development process

> Run the following commands on your terminal in ascending order:

1. `npm ci`;
2. `npm start` instead of a long `nodemon --exec npx electron main.mjs` command; **NOTE**: it assumes you have [nodemon](https://nodemon.io/) installed on your machine as a global dependency.

### Remarks

> Make sure your top-level DOM element for each `View` instance has its own `style.height` property set to `height:100vh` - this will allow adjacent `Views` to be stacked in a nice one-to-one manner without any visual gaps present!

### Known Electron issues

- [Request Autofill.enable failed](https://github.com/electron/electron/issues/41614) [[SOLVED](https://github.com/electron/electron/pull/49292) since [v41.0.0-alpha.2#49292](https://releases.electronjs.org/release/compare/v41.0.0-alpha.2/v41.0.0-alpha.2), see for _"DevTools errors are no longer printed to console."_]

---

> Made with ♥ by [**projektorius96**](https://github.com/projektorius96) [2026]