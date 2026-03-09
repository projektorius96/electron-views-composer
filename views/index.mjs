import { app, screen, BaseWindow, WebContentsView, ipcMain, webContents, globalShortcut } from 'electron';
import { viewPath, importFileModule } from '../utils/index.node.mjs';
import { FRAMELESS_OPTIONS } from './_shared/window-options.mjs';

export default function initViewsComposition() {

  const { workAreaSize } = screen.getPrimaryDisplay();

  const parentView = createParentView(workAreaSize);
    if (!parentView) return;

  const mainPage = createMainPage();
  const navPage = createNavPage();

  setupIpcHandlers(ipcMain, parentView, navPage, workAreaSize);

  addViewsToParent(parentView, navPage, mainPage);

  if (navPage) {
    setNavPageBounds(navPage, workAreaSize);
    navPage.webContents.loadFile(viewPath('navigation', 'appbar', 'index.html'));
  }

  if (mainPage) {
    setMainPageBounds(mainPage, navPage, workAreaSize);
    mainPage.webContents.loadFile(viewPath('content', 'primary', 'canvas', 'index.html'));
    mainPage.webContents.setWindowOpenHandler(({ frameName }) => {
      if ( frameName.includes('id=pip-window-1') ) {
        return {
          action: 'allow',
          overrideBrowserWindowOptions: {
            // 1. Link it to the existing window
            parent: parentView, 
            width: 300,
            height: 300,
            frame: true, // Modals usually look better with a standard frame
              autoHideMenuBar: true,        
          }
        }
      }
      return { action: 'deny' }
    })
  }

  if (navPage && mainPage) {
    registerGlobalShortcuts(mainPage);
    app.on('before-quit', () => globalShortcut.unregisterAll());
    injectGlobalLayout();
    subscribeResize(parentView, navPage, mainPage);
  }

  subscribeClosed(parentView, navPage, mainPage);

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

function setupIpcHandlers(ipcMain, parentView, navPage, workAreaSize) {
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

function registerGlobalShortcuts(mainPage) {
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    if (mainPage.webContents.isFocused()) mainPage.webContents.toggleDevTools();
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

function subscribeClosed(parentView, navPage, mainPage) {
  parentView.on('closed', () => {
    navPage.webContents.close();
    mainPage.webContents.close();
  });
}
