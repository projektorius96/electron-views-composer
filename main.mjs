import node_path from 'node:path';

import { app, screen, BaseWindow, WebContentsView, ipcMain } from 'electron';
/* import { WindowManagement } from './utils/index.mjs'; */// DEV_NOTE # might use in the future...

import floatWindow from './modules/shell/gui/main.js';

app.whenReady().then(() => {

    const
        /* DEV_NOTE # Essentially, workAreaSize is same as WindowManagement.screenArea utility method, except that the utility does not return you {x, y} pair: */
        { workAreaSize } = screen.getPrimaryDisplay()
        ,
        parentView = new BaseWindow({
            frame: !true,/* DEV_NOTE # iff := false, it disregards `autoHideMenu` no matter what Boolean value it would be assigned to:.. */
            autoHideMenuBar: true,
            movable: true,
            resizable: !false,
            x: 0,
            y: 0,
            width: workAreaSize.width,
            height:  workAreaSize.height,
        })
        ,
        mainPage = new WebContentsView({})
        ,
        navPage = new WebContentsView({
            webPreferences: {
                /* disableBlinkFeatures: String('SharedAutofill') */// [FAILING]
                preload: node_path.join(node_path.resolve(), 'preload.mjs'),
                sandbox: false, /* # this allows ESM imports in preload.mjs script file */
            }
        })
        ;

    if (parentView) {
        
        if (navPage){

            const childView = floatWindow.init(parentView);
            /* childView.setParentWindow(parentView); */// # if you need decision being made at run-time 
            childView.loadFile(node_path.join(node_path.resolve(), ...['modules', 'shell', 'gui', 'index.html']))

            /* navPage.webContents.setDevToolsWebContents(childView.webContents) */
    
            if (childView){
    
                ipcMain.handle('action:gui', ()=>{
                    console.log("Hello from floating-window")
                })
    
                childView.webContents.toggleDevTools();
    
            }

            ipcMain.handle('action:minimize', ()=>{
                if (parentView.isMaximized){
                    parentView.minimize()
                }
            })
    
            ipcMain.handle('action:maximize', ()=>{
                if (parentView.isMinimized){
                    /* parentView.maximize() *//*
                        > DEV_NOTE # works buggy with `parentView.on('resize')`,..
                        thus decided to work it around with the following:
                    */
                    parentView.setBounds({
                        x: 0,
                        y: 0,
                        width: workAreaSize.width,
                        height:  workAreaSize.height,
                    })
                }
            })
    
            ipcMain.handle('action:close', ()=>{
                if (parentView.isFocused){
                    parentView.close()
                }
            })

        }

        /**
         * Credits to github:nikwen for putting on the right track 
         * @see {@link https://github.com/electron/electron/issues/45367#issuecomment-2620264791}
         */
        parentView.contentView.addChildView(navPage);
        parentView.contentView.addChildView(mainPage);

        let navPage$workAreaSize = {
            height: 40
        }
        if (navPage){

            navPage.setBounds({
                x: 0,
                y: 0,
                width: workAreaSize.width,
                height: navPage$workAreaSize.height,
            });

            navPage.webContents.loadFile(node_path.join(node_path.resolve(), ...['index.html']));
            /* navPage.webContents.toggleDevTools(); */
        }

        if (mainPage){

            mainPage.setBounds({
                x: 0,
                y: navPage$workAreaSize.height,
                width: workAreaSize.width,
                height: Number( workAreaSize.height - navPage$workAreaSize.height ),
            });
            
            mainPage.webContents.loadFile(node_path.join(node_path.resolve(), ...['modules', 'canvas', 'index.html']));
            /* mainPage.webContents.loadURL('http://localhost:5173'); */
            /* mainPage.webContents.toggleDevTools(); */
        }

        if (navPage && mainPage){

            parentView.on('resize', ()=>{
                
                parentView.setBounds({
                    ...parentView.getBounds()
                })

                navPage.setBounds({
                    x: 0,
                    y: 0,
                    width: parentView.getBounds().width,
                    height: navPage$workAreaSize.height,
                });

                mainPage.setBounds({
                    x: 0,
                    y: navPage$workAreaSize.height,
                    width: parentView.getBounds().width,
                    height: Number( /* workAreaSize.height */parentView.getBounds().height - navPage$workAreaSize.height ),
                });
                
            })

        }

        /**
         * Read more about Resource Management... 
         * @see {@link https://www.electronjs.org/docs/latest/api/base-window#resource-management|Resource Management}
         */
        parentView.on('closed', () => {
            navPage.webContents.close();
            mainPage.webContents.close();
        });

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') app.quit();
        });

    }

})