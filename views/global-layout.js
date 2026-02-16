/**
 * 1) Registers custom elements: global-layout, control-button.
 * 2) Builds appbar buttons (minimize, maximize, close) and mounts them.
 * 3) Injects appbar and draggable-region styles.
 */

/* --- 1) Custom elements --- */
customElements.define('global-layout', class extends HTMLElement {
  connectedCallback() {
    const nav = document.createElement('nav');
    nav.id = 'appbar';
    this.appendChild(nav);
  }
});

if (document) {
  document.body.appendChild(new (customElements.get('global-layout'))());
}

const CONTROL_BUTTON = 'control-button';
customElements.define(CONTROL_BUTTON, class extends HTMLButtonElement {
  constructor(symbol) {
    super();
    this.textContent = symbol;
    this.style.padding = '0.5em';
    this.style.userSelect = 'none';
    return this;
  }
}, { extends: 'button' });

/* --- 2) Appbar buttons --- */
function createAppbarButtons() {
  const control = customElements.get(CONTROL_BUTTON);
  const minimize = Reflect.construct(control, [RegExp('\u{1F5D5}').source]);
  minimize.id = 'button_minimize';
  minimize.addEventListener('click', () => window.navigation_appbar.minimize());

  const maximize = Reflect.construct(control, [RegExp('\u{1F5D6}').source]);
  maximize.id = 'button_maximize';
  maximize.addEventListener('click', () => window.navigation_appbar.maximize());

  const close = Reflect.construct(control, [RegExp('\u{1F5D9}').source]);
  close.id = 'button_close';
  close.addEventListener('click', () => window.navigation_appbar.close());

  return [minimize, maximize, close];
}

function getAppbarStyleSheet() {
  const appbar = document.getElementById('appbar');
  const sheet = new CSSStyleSheet();
  sheet.insertRule(`#${appbar.id} { height: 100vh; width: 100%; display: flex; justify-content: flex-end; background-color: rgb(230, 230, 230); }`);
  sheet.insertRule(`#${appbar.id} > button { border: unset; background-color: inherit; }`);
  sheet.insertRule(`#${appbar.id} > button:hover { background-color: rgb(200, 200, 200); }`);
  return sheet;
}

function getDraggableRegionStyleSheet() {
  const sheet = new CSSStyleSheet();
  sheet.insertRule('nav { -webkit-app-region: drag; }');
  sheet.insertRule('nav > button { -webkit-app-region: no-drag; }');
  return sheet;
}

const appbar = document.getElementById('appbar');
appbar.append(...createAppbarButtons());

/* --- 3) Styles --- */
document.adoptedStyleSheets.push(
  getDraggableRegionStyleSheet(),
  getAppbarStyleSheet()
);
