import { contextBridge, ipcRenderer } from 'electron';

/**
 * Expose IPC actions to the renderer under a single bridge key.
 * @param {string} bridgeKey - Key on window (e.g. 'navigation_appbar')
 * @param {Record<string, string>} actions - Map of method name -> action channel suffix (channel = `action:${suffix}`)
 */
export function exposeActions(bridgeKey, actions) {
  const api = Object.fromEntries(
    Object.entries(actions).map(([name, suffix]) => [
      name,
      async () => ipcRenderer.invoke(`action:${suffix}`)
    ])
  );
  contextBridge.exposeInMainWorld(bridgeKey, api);
}
