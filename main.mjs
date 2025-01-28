import { app, screen, BaseWindow, WebContentsView } from 'electron';

app.whenReady().then(() => {

    const
        { workAreaSize } = screen.getPrimaryDisplay()
        ,
        parentView = new BaseWindow({
            frame: true,
            x: 0,
            y: 0,
            width: workAreaSize.width,
            height: workAreaSize.height,
        })
        ,
        mainPage = new WebContentsView()
        ;

    if (mainPage) {
        const bounds = parentView.getContentBounds();
            mainPage.setBounds({
                x: 0,
                y: 0,
                width: bounds.width,
                height: bounds.height,
            });
        
        mainPage.webContents.loadFile('index.html');
        /* mainPage.webContents.openDevTools(); */// # shows the debugger
    }

    if (parentView) {

        parentView.maximize();

        /**
         * Credits to github:projektorius96 (me) for raising a relevant question, and github:nikwen for answering it 
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