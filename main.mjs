import { app, BaseWindow } from 'electron';
import initViewsComposition from './views/index.mjs'

/**
 * Managing application lifecycle
 * @see {@link https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app#managing-your-apps-window-lifecycle}
 */
app.whenReady().then(() => {

    /**
     * @win32
     * @linux
     * @darwin
     */
    initViewsComposition();

    /**
     * @darwin
     */
    app.on('activate', () => {
        if (BaseWindow.getAllWindows().length === 0) {
            initViewsComposition();
        }
    })

});

/**
 * @win32
 * @linux
 */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
    