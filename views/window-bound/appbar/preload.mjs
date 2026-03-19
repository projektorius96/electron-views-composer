import { exposeActions } from '../../../utils/preload-helper.mjs';

exposeActions('navigation_appbar', {
  minimize: 'minimize',
  maximize: 'maximize',
  close: 'close'
});
