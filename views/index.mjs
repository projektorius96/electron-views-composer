import CONFIG from '../CONFIG.json' with { type: 'json' }
import { app, screen, BaseWindow, WebContentsView, ipcMain, webContents, globalShortcut } from 'electron';
import { viewPath, importFileModule } from '../utils/index.node.mjs';
import { FRAMELESS_OPTIONS } from './_shared/window-options.mjs';
import floatingWindow from './content/secondary/gui/main.mjs';

export default function initViewsComposition() {
  const { workAreaSize } = screen.getPrimaryDisplay();

  const parentView = createParentView(workAreaSize);
  if (!parentView) return;

  const mainPage = createMainPage();
  const navPage = createNavPage();
  const childView = createChildView(parentView);

  setupIpcHandlers(ipcMain, parentView, childView, navPage, workAreaSize);

  addViewsToParent(parentView, navPage, mainPage);

  if (navPage) {
    setNavPageBounds(navPage, workAreaSize);
    navPage.webContents.loadFile(viewPath('navigation', 'appbar', 'index.html'));
  }

  if (mainPage) {
    setMainPageBounds(mainPage, navPage, workAreaSize);
    mainPage.webContents.loadFile(viewPath('content', 'primary', 'canvas', 'index.html'));
  }

  if (navPage && mainPage) {
    registerGlobalShortcuts(mainPage, childView);
    app.on('before-quit', () => globalShortcut.unregisterAll());
    injectGlobalLayout();
    subscribeResize(parentView, navPage, mainPage);
  }

  subscribeClosed(parentView, navPage, mainPage, childView);
}

function createParentView(workAreaSize) {
  return new BaseWindow({
    ...FRAMELESS_OPTIONS,
    x: 0,
    y: 0,
    width: workAreaSize.width,
    height: workAreaSize.height
  });
}

function createMainPage() {
  return new WebContentsView({
    webPreferences: { devTools: !app.isPackaged }
  });
}

function createNavPage() {
  return new WebContentsView({
    webPreferences: {
      sandbox: false,
      preload: viewPath('navigation', 'appbar', 'preload.mjs')
    }
  });
}

function createChildView(parentView) {
  const childView = floatingWindow.init(parentView);
  childView.loadFile(viewPath('content', 'secondary', 'gui', 'index.html'));
  
  /**
   * @debugging
   * see - [commit:9fd0e6352b100a9a73243bdff537856f3385f442]
   */
  if (CONFIG.MAINTENANCE === true) {
    childView.close(); // DEV_NOTE # this is not the greatest way to handle the childView's UI design flaw, but better than nothing
  }

  childView.webContents.on('did-finish-load', () => {
    childView.webContents.executeJavaScriptInIsolatedWorld(1, [{
      code: `
        let appbar = document.getElementById('appbar');
        appbar.style.height = 'auto'; /* DEV_NOTE (2/21/2026) # see - [commit:9fd0e6352b100a9a73243bdff537856f3385f442] for "childView's UI design flaw" description in-detail... */
        appbar.children.button_minimize.style.display = 'none';
        appbar.children.button_maximize.style.display = 'none';
      `.trim()
    }]);
  });

  return childView;
}

function setupIpcHandlers(ipcMain, parentView, childView, navPage, workAreaSize) {
  if (!navPage) return;

  Object.assign(navPage, { height: 40 });

  ipcMain.handle('action:minimize', () => {
    if (parentView.isMaximized) parentView.minimize();
  });

  ipcMain.handle('action:maximize', () => {
    if (parentView.isMinimized) {
      parentView.setBounds({
        x: 0, y: 0,
        width: workAreaSize.width,
        height: workAreaSize.height
      });
    }
  });

  ipcMain.handle('action:close', () => {
    if (parentView.isFocused()) parentView.close();
    if (!parentView.isDestroyed() && childView.isFocused()) childView.close();
  });
}

function addViewsToParent(parentView, navPage, mainPage) {
  parentView.contentView.addChildView(navPage);
  parentView.contentView.addChildView(mainPage);
}

function setNavPageBounds(navPage, workAreaSize) {
  navPage.setBounds({
    x: 0, y: 0,
    width: workAreaSize.width,
    height: navPage.height
  });
}

function setMainPageBounds(mainPage, navPage, workAreaSize) {
  mainPage.setBounds({
    x: 0,
    y: navPage.height,
    width: workAreaSize.width,
    height: workAreaSize.height - navPage.height
  });
}

function registerGlobalShortcuts(mainPage, childView) {
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    if (mainPage.webContents.isFocused()) mainPage.webContents.toggleDevTools();
    else if (childView.webContents.isFocused()) childView.webContents.toggleDevTools();
  });
}

function injectGlobalLayout() {
  const viewsDir = import.meta.dirname;
  webContents.getAllWebContents().forEach((wc) => {
    wc.executeJavaScript(importFileModule(viewsDir, ['global-layout.js']));
  });
}

function subscribeResize(parentView, navPage, mainPage) {
  parentView.on('resize', () => {
    parentView.setBounds({ ...parentView.getBounds() });
    const { width, height } = parentView.getBounds();
    navPage.setBounds({ x: 0, y: 0, width, height: navPage.height });
    mainPage.setBounds({ x: 0, y: navPage.height, width, height: height - navPage.height });
  });
}

function subscribeClosed(parentView, navPage, mainPage, childView) {
  parentView.on('closed', () => {
    navPage.webContents.close();
    mainPage.webContents.close();
  });
  childView.on('closed', () => mainPage.webContents.focus());
}
