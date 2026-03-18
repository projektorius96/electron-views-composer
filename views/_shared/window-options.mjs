/**
 * Shared options for frameless windows (BaseWindow / BrowserWindow).
 * When frame is false, autoHideMenuBar has no effect; kept for consistency.
 */
export const WIDGET_BOUND = 
  Object.freeze(
    Object.assign(
      Object.create(null)
      ,
      {
        init() {
          return({
            frame: true,
            autoHideMenuBar: true,
            movable: true,
            resizable: true,
          })
        }
      }
    )
  );

export const WINDOW_BOUND = 
  Object.freeze(
    Object.assign(
      Object.create(null)
      ,
      {
        init(workAreaSize) {
          return({
            x: 0,
            y: 0,
            width: workAreaSize?.width ?? 800,
            height: workAreaSize?.height ?? 600
          });
        }
      }
    )
  );
