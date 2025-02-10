import node_path from 'node:path';
import node_fs from 'node:fs';
import { screen, BaseWindow, WebContentsView, ipcMain, webContents } from 'electron';

import floatingWindow from './content/secondary/gui/main.mjs'

const globalLayout = node_fs.readFileSync(node_path.join(import.meta.dirname, 'global-layout.js'), {
    encoding: 'utf-8'
});

export default function(){

    const
        /* DEV_NOTE # Essentially, workAreaSize is same as WindowManagement.screenArea utility method, except that the utility does not return you {x, y} pair: */
        { workAreaSize } = screen.getPrimaryDisplay()
        ,
        parentView = new BaseWindow({
            frame: !true,/* DEV_NOTE # iff := false, it disregards `autoHideMenu` no matter what Boolean value was assigned to it; */
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
                sandbox: false, /* # this allows ESM imports in preload.mjs script file */
                preload: node_path.join( node_path.resolve('./views/navigation/appbar'), 'preload.mjs' ),
            }
        })
        ;

    if (parentView) {

        const childView = floatingWindow.init(parentView); /* childView.setParentWindow(parentView); */// # alternatively do so, if you need decision being made at run-time
        childView.loadFile( node_path.join( node_path.resolve('./views/content/secondary/gui'), 'index.html') );

        if (childView) {

            childView.webContents.on('did-finish-load', ()=>{
                childView.webContents.executeJavaScriptInIsolatedWorld(1, [{code: `
                    let appbar = document.getElementById('appbar');
                        appbar.style.height = 'auto';
                    appbar.children.button_minimize.style.display = 'none';
                    appbar.children.button_maximize.style.display = 'none';
                `.trim()}]);
            });

        }

        if (navPage){

            Object.assign(navPage, {
                height: 40
            })

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
                if (parentView.isFocused() || childView.isFocused()){
                    parentView.close();
                }
            })

        }

        /**
         * Credits to github:nikwen for putting on the right track 
         * @see {@link https://github.com/electron/electron/issues/45367#issuecomment-2620264791}
         */
        parentView.contentView.addChildView(navPage);
        parentView.contentView.addChildView(mainPage);

        if (navPage){

            navPage.setBounds({
                x: 0,
                y: 0,
                width: workAreaSize.width,
                height: navPage.height,
            });

            navPage.webContents.loadFile( node_path.join( node_path.resolve('./views/navigation/appbar'), 'index.html' ) );

        }

        if (mainPage){

            mainPage.setBounds({
                x: 0,
                y: navPage.height,
                width: workAreaSize.width,
                height: Number( workAreaSize.height - navPage.height ),
            });
            
            mainPage.webContents.loadFile( node_path.join( node_path.resolve('views/content/primary/canvas') , 'index.html') );
            /* mainPage.webContents.toggleDevTools(); */

        }

        if (navPage && mainPage){

            webContents.getAllWebContents().forEach((wcView)=>{

                wcView.openDevTools();// # [PASSING]
                wcView.executeJavaScript(globalLayout);

            });

            parentView.on('resize', ()=>{
                
                parentView.setBounds({
                    ...parentView.getBounds()
                });

                navPage.setBounds({
                    x: 0,
                    y: 0,
                    width: parentView.getBounds().width,
                    height: navPage.height,
                });

                mainPage.setBounds({
                    x: 0,
                    y: navPage.height,
                    width: parentView.getBounds().width,
                    height: Number( /* workAreaSize.height */parentView.getBounds().height - navPage.height ),
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

        

    }
    
}

