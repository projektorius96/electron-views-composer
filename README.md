# Project name: electron-views-composer

> This is and will be publicly available ongoing (living) project, a multi-window GUI prototype primarily aimed towards [Vekt.js-light](https://github.com/projektorius96/Vekt.js-light) project I also do maintain...

### Conventions

- This repository primarily targets JavaScript, not TypeScript users, thus `.mjs` extension deliberately is reserved for ESM-first Electron's main process or Node.js environments, respectively.
- The `Views` defined under `./views/` path: each path has entry point `index.html` linked with sourced `main.js` within its `index.html` counterpart, which unlike `main.mjs`, the `main.js` indicates that is part of Document Object Model (DOM) structure under Electron's renderer process, rather than the part of Electron's main process or so...

### Development process

> Run the following commands on your terminal in ascending order:

1. `npm ci`;
2. `npm start` instead of a long `nodemon --exec npx electron main.mjs` command.

### Remarks

> Make sure your top-level DOM element for each `View` instance has its own `style.height` property set to `height:100vh` - this will allow adjacent `Views` to be stacked in a nice one-to-one manner without any visual gaps experienced !

### Known Electron issues

- [Request Autofill.enable failed](https://github.com/electron/electron/issues/41614)(UNSOLVED)

---

> Made with ♥ by [**projektorius96**](https://github.com/projektorius96)