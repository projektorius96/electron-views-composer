import { contextBridge, ipcRenderer } from "electron";

import node_path from 'node:path'

const navigation = import.meta.dirname.split(node_path.sep).at(-2);
const appbar = import.meta.dirname.split(node_path.sep).at(-1);

contextBridge.exposeInMainWorld(`${navigation}_${appbar}`, {
    minimize: async ()=> await ipcRenderer.invoke('action:minimize'),
    maximize: async ()=> await ipcRenderer.invoke('action:maximize'),
    close: async ()=> await ipcRenderer.invoke('action:close'),
});