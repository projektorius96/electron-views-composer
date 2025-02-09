import { contextBridge, ipcRenderer } from "electron";

export const appbarInterface = {
    minimize: async ()=> await ipcRenderer.invoke('action:minimize'),
    maximize: async ()=> await ipcRenderer.invoke('action:maximize'),
    close: async ()=> await ipcRenderer.invoke('action:close'),
}

contextBridge.exposeInMainWorld(`parentView`, {
    ...appbarInterface
})