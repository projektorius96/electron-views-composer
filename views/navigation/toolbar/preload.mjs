import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(`parentView`, {
    minimize: async ()=> await ipcRenderer.invoke('action:minimize'),
    maximize: async ()=> await ipcRenderer.invoke('action:maximize'),
    close: async ()=> await ipcRenderer.invoke('action:close'),
})