/**
 * Shared options for frameless windows (BaseWindow / BrowserWindow).
 * When frame is false, autoHideMenuBar has no effect; kept for consistency.
 */
export const FRAMELESS_OPTIONS = {
  frame: !false,
  autoHideMenuBar: true,
  movable: true,
  resizable: true,
};
