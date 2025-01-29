import { app, screen, BaseWindow, WebContentsView } from 'electron';
import { WindowManagement } from './utils/index.mjs';

app.whenReady().then(() => {

    const
        /* DEV_NOTE # Essentially, workAreaSize is same as WindowManagement.screenArea utility method, except that the utility does not return you {x, y} pair: */
        { workAreaSize } = screen.getPrimaryDisplay()
        ,
        parentView = new BaseWindow({
            frame: true,/* # iff := false, it disregards `autoHideMenu` no matter what Boolean value it was assigned to:.. */
            autoHideMenuBar: !true,
            x: 0,
            y: 0,
            width: workAreaSize.width,
            height: workAreaSize.height,
        })
        ,
        mainPage = new WebContentsView({
            webPreferences: {
                disableBlinkFeatures: String('SharedAutofill')
            }
        })
        ;

    if (mainPage) {

        mainPage.setBounds({
            ...WindowManagement.availableScreenArea(parentView)
        });

        mainPage.webContents.loadFile('index.html');
        /* mainPage.webContents.openDevTools(); */// # shows the debugger

    }

    if (parentView) {

        parentView.maximize();

        /**
         * Credits to github:nikwen for putting on the right track 
         * @see {@link https://github.com/electron/electron/issues/45367#issuecomment-2620264791}
         */
        parentView.contentView.addChildView(mainPage);

        /**
         * Read more about Resource Management... 
         * @see {@link https://www.electronjs.org/docs/latest/api/base-window#resource-management|Resource Management}
         */
        parentView.on('closed', () => {
            mainPage.webContents.close();
        });

    }

})