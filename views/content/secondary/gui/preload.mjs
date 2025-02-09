import { contextBridge, ipcRenderer } from "electron";

import { appbarInterface } from "../../../navigation/appbar/preload.mjs";

contextBridge.exposeInMainWorld(`childView`, {
    ...appbarInterface,
    trigger: async ()=> await ipcRenderer.invoke(`action:gui`)
});