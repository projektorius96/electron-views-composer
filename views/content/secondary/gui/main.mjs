import node_path from 'node:path';
import { BrowserWindow as PictureInPicture, app } from 'electron';
import { FRAMELESS_OPTIONS } from '../../../_shared/window-options.mjs';

export default class {

  static init(parent = null) {
    return new PictureInPicture({
      parent,
      width: 400,
      height: 300,
      ...FRAMELESS_OPTIONS,
      fullscreenable: false,
      minimizable: false,
      maximizable: false,
      webPreferences: {
        backgroundThrottling: false,
        sandbox: false,
        preload: node_path.join(node_path.resolve(import.meta.dirname), 'preload.mjs'),
        devTools: !app.isPackaged
      }
    });
  }

}

