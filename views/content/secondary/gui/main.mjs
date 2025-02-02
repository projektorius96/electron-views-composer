import node_path from 'node:path';
import { BrowserWindow as Picture_in_Picture } from "electron";

export default class {

    static init(parent = null){
        return (
            new Picture_in_Picture({
                parent,
                width: 400,
                height: 300,
                alwaysOnTop: true,
                frame: !false,
                autoHideMenuBar: true,
                resizable: true,
                movable: true,
                fullscreenable: false,
                minimizable: false,
                maximizable: false,
                /* transparent: true, */
                /* hasShadow: false, */
                webPreferences: {
                    /** 
                     * NOTE: This ensures that timers, animations, and JavaScript execution continue at normal speed, even if the window is minimised or out of focus;
                    */
                    backgroundThrottling: false, /* <=== # Prevents Chromium (Electron) from slowing down the window in the background; */
                    sandbox: false, /* # this allows ESM imports in preload.mjs script file */
                    preload: node_path.join( node_path.resolve( import.meta.dirname ), 'preload.mjs' )
                }
            })
        )
    }

}

