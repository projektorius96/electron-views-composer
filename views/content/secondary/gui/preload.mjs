import { exposeActions } from '../../../../utils/preload-helper.mjs';

exposeActions('navigation_appbar', {
  trigger: 'gui',
  close: 'close'
});
