import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(`navigation_appbar`, {
    trigger: async ()=> await ipcRenderer.invoke(`action:gui`)
    ,
    /** @implements */
    close: async ()=> await ipcRenderer.invoke('action:close'),
});