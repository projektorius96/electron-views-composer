import "./DOMutils.js";
import { stage_view } from './stage-view/index.js';
import { layer_view } from './layer-view/index.js';
import { grid_view } from './grid-view/index.js';
import { wireframe_view } from './wireframe-view/index.js';
import { degToRad, radToDeg, setTransform, setRange } from "./modules/maths/index.js";

export class HTMLCanvas {

    /**
     * @typedef {Array} Iterable
     * 
     * @param {HTMLDivElement} `stage` - a reference to the current instance of `stage`; NOTE: "`stage"` is reserved word and `HTMLElement.prototype.id`, hence "ID" the context it is used within !
     * @returns {Iterable} `Iterable` : if such iterable is iterated, each value of such `Iterable`'s is a "`view-group`"; top-level `view-group` conventionally is called **"`stage`"**, otherwise it's a **"`layer`"**
     */
        static init({ stage }) {

            if ( this.#responsify({ stage }) ) {
                return (
                    this.#getIterable(stage.layers)
                        .map(canvas => {
                            if (canvas instanceof HTMLCanvasElement) {                            
                                return (
                                    canvas = canvas.getContext('2d')
                                );
                            }
                        })
                );
            }
    
        }

        /** 
         * > This function expression works as a guard against end-user or developer with limited knowledge of Canvas API
         * 
         * @param {Number} num - an "odd" number that is made to be "even", or even number that is left out as is, i.e. "even"
         * @returns {Number} makes sure the modified `stage.grid.GRIDCELL_DIM` is always even, this prevents sub-pixel rendering in grid-first coordinate system {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#avoid_floating-point_coordinates_and_use_integers_instead}
        */
        static #evenNumber = (num = 0) => {
            const ceiledNumber = Math.ceil(num);
            return (
                ( (ceiledNumber % 2) === 1 ) ? (ceiledNumber + 1) : (ceiledNumber)
            );
        }

        /**
         * @param {HTMLDivElement} stage - canvas wrapping element (**"view-group"**), if such "`view-group`" is a top-level `view-group`, by convention we will call it the **"`stage`"**
         * @returns {Boolean} `true`
         */
        static #responsify(){

            const
                GRIDCELL_DIM = ( stage.clientWidth / this.#evenNumber( stage.scale ) )
                ,
                divisorX = Math.ceil( stage.clientWidth / GRIDCELL_DIM )
                ,
                divisorY = Math.ceil( stage.clientHeight / GRIDCELL_DIM )
                ,
                X_IN_MIDDLE = ( ( divisorX * GRIDCELL_DIM ) / 2 )
                ,  
                Y_IN_MIDDLE = ( ( divisorY * GRIDCELL_DIM  ) / 2 )
            ;

            stage.grid = Object.create(null);
            Object.assign( stage.grid, {
                GRIDCELL_DIM,
                CANVAS: {
                    X_IN_MIDDLE: X_IN_MIDDLE * window.devicePixelRatio, 
                    Y_IN_MIDDLE: Y_IN_MIDDLE * window.devicePixelRatio
                }
            });

            if (stage.children.length > 0){

                Array.from( stage.children ).forEach((layer)=>{
                    
                    if (layer instanceof HTMLCanvasElement) {
                        layer.width = stage.clientWidth * window.devicePixelRatio;
                        layer.height = stage.clientHeight * window.devicePixelRatio;
                    }

                });
            
            }

        return true;

    }

    static #getIterable(nonIterable){
        if (!Array.isArray(nonIterable)){
            return Array.from(nonIterable)
        }
    }

    static ViewGroup = {
        Stage : customElements.get(stage_view),
        Layer : customElements.get(layer_view)
    }
    
    static Views = {
        Grid: grid_view,
        WireFrame: wireframe_view
    }

    static Helpers = {
        Trigonometry: {
            setRange
            ,
            setTransform
            ,
            Converters: {
                degToRad,
                radToDeg
            }
        }
    }

    static {

        Object.freeze(this.ViewGroup);
        Object.freeze(this.Helpers);

    }

}