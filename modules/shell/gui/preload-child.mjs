import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(`api`, {
    childView: {
        trigger: async ()=> await ipcRenderer.invoke(`action:gui`),
    }
})