import { ENUMS } from "./utils.js";
import { userConfig } from "./user-config.js";

export default class {

    /**
     * > IMPORTANT: `default.init` MUST be called before `default.draw`, otherwise expect an error `"ReferenceError: stage is not defined"`
     * @see default.draw
     * @static
     */
    static init({HTMLCanvas}) {

        const stage = new HTMLCanvas.ViewGroup.Stage({...userConfig.canvas.stage});

            if ( stage ) {

                stage.append(...[
                    new HTMLCanvas.ViewGroup.Layer({...userConfig.canvas.layers.grid})
                    ,
                    new HTMLCanvas.ViewGroup.Layer({...userConfig.canvas.layers.wireframe})
                ]);

            return stage;

        }

    }

    /**
     * > `default.draw` MUST be called after `default.init`
     * @see default.init
     * @static
     */
    static draw({HTMLCanvas}, context) {
    
        // DEV_NOTE # because we mix HTML Canvas (i.e. Canvas API) together with XML SVG (i.e. SVG) web technologies, we must do the following `context` check:..
        if ( context instanceof CanvasRenderingContext2D ) {
                                                
            switch (context.canvas.id) {

                case ENUMS.CASE.grid :

                    HTMLCanvas.Views.Grid.draw({
                        context, 
                        options: {
                            ...userConfig.canvas.layers.grid,
                        }
                    })

                break;

                case ENUMS.CASE.wireframe :

                    HTMLCanvas.Views.WireFrame.draw({
                        ENUMS,
                        context,
                        options: {
                            type: ENUMS.PRINT.ident,
                            strokeStyle: ENUMS.COLOR.black,
                        }
                    });
                    HTMLCanvas.Views.WireFrame.draw({
                        ENUMS,
                        context,
                        options: {
                            type: ENUMS.PRINT.reversed_ident,
                            strokeStyle: ENUMS.COLOR.black,
                        }
                    });

                break;

            }

        }

    }

}
