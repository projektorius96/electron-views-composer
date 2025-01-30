import { contextBridge, ipcRenderer } from "electron";

const prefix = '__preload__';
contextBridge.exposeInMainWorld(`${prefix}appbarControls`, {
    minimize: async ()=> await ipcRenderer.invoke('action:minimize'),
    maximize: async ()=> await ipcRenderer.invoke('action:maximize'),
    close: async ()=> await ipcRenderer.invoke('action:close'),
})