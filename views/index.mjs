import { app, screen, BaseWindow, WebContentsView, ipcMain, webContents, globalShortcut } from 'electron';
import { viewPath, importFileModule } from '../utils/index.node.mjs';
import { WIDGET_BOUND, WINDOW_BOUND } from './_shared/window-options.mjs';

export default function initViewsComposition() {

  const { workAreaSize } = screen.getPrimaryDisplay();

  const parentView = createParentView({workAreaSize});
    if (!parentView) return;

  const mainPage = createMainPage();

  // DEV_NOTE # leaving as an example for any of future IPCs
  /* setupIpcHandlers(ipcMain, parentView, workAreaSize); */

  addViewsToParent(parentView, mainPage);

  if (mainPage) {
    setMainPageBounds(mainPage, workAreaSize);
    mainPage.webContents.loadFile(viewPath('content', 'primary', 'canvas', 'index.html'));
    mainPage.webContents.setWindowOpenHandler(({ frameName }) => {
      if ( frameName.includes('id=pip-window-1') ) {
        return {
          action: 'allow',
          overrideBrowserWindowOptions: {
            // 1. Link it to the existing window
            parent: parentView,
            /* === */
              /**
               * @defaults
               */
              ...WIDGET_BOUND.init(null),
              /**
               * @override
               */
              width: 300,
              height: 300,
            /* === */

          }
        }
      }
      return { action: 'deny' }
    })
  }

  if (mainPage) {
    registerGlobalShortcuts(mainPage);
    app.on('before-quit', () => globalShortcut.unregisterAll());
    /* injectGlobalLayout(); */
    subscribeResize(parentView, mainPage);
  }

  subscribeClosed(parentView, mainPage);

}

function createParentView({workAreaSize, maximized = true}) {
  
  const baseWindow = new BaseWindow({
    ...WIDGET_BOUND.init(null),
    ...WINDOW_BOUND.init(workAreaSize),
  });

  if (maximized) baseWindow.maximize();

  return baseWindow;

}

function createMainPage() {
  return new WebContentsView({
    webPreferences: { devTools: !app.isPackaged }
  });
}

function setupIpcHandlers(ipcMain, parentView, workAreaSize) {

  ipcMain.handle('action:minimize', () => {
    if (parentView.isMaximized) parentView.minimize();
  });

  ipcMain.handle('action:maximize', () => {
    if (parentView.isMinimized) {
      parentView.setBounds({
        ...WIDGET_BOUND.init(null)
      });
    }
  });

  ipcMain.handle('action:close', () => {
    if (parentView.isFocused()) parentView.close();
  });

}

function addViewsToParent(parentView, mainPage) {
  parentView.contentView.addChildView(mainPage);
}

function setMainPageBounds(mainPage, workAreaSize) {
  mainPage.setBounds({
    ...WINDOW_BOUND.init(workAreaSize),
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

function subscribeResize(parentView, mainPage) {
  parentView.on('resize', () => {
    parentView.setBounds({ ...parentView.getBounds() });
    const { width, height } = parentView.getBounds();
      mainPage.setBounds({ x: 0, y: 0, width, height });
  });
}

function subscribeClosed(parentView, mainPage) {
  parentView.on('closed', () => {
    mainPage.webContents.close();
  });
}
