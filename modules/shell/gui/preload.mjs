import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(`childView`, {
    trigger: async ()=> await ipcRenderer.invoke(`action:gui`)
})