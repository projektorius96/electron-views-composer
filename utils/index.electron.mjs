import { BaseWindow } from "electron";

/**
 * > The following utils may still come in handy...
 * 
 * @see {@link https://w3c.github.io/window-management/#concept-screen|Window Management}
 */
const WindowManagement 
= Object.assign(Object.create(null), {
    /**
     * > A **screen area**, which is a rectangular two-dimensional grid of pixels, used to present visual content from the operating system (such as taskbars and menu bars) and client applications to the user.
     *  
     * @param {BaseWindow} view 
     * @returns `Rectangle` 
     * @see {@link https://www.electronjs.org/docs/latest/api/structures/rectangle|Rectangle}
     */
    screenArea(view) {
        return( view?.getBounds() )
    }
    ,
    /**
     * > A _sub-area of **screen area**_, which is used to present client applications to the user, _excluding visual content from the operating system such as taskbars and menu bars_.
     *  
     * @param {BaseWindow} view 
     * @returns Rectangle
     * @see {@link https://www.electronjs.org/docs/latest/api/structures/rectangle|Rectangle}
     */
    availableScreenArea(view) {
        return( view?.getContentBounds() )
    }
})

export {
    WindowManagement
}