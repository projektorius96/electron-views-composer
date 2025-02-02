import './views/stage-view/index.js';
import './views/layer-view/index.js';
import Grid from "./views/grid.js";
import Wireframe from "./views/wireframe.js";
import { getIterable } from "./utils.js";
import { degToRad, setAngle, setRange } from "./trigonometry.js";

/**
 * @typedef {Array} Iterable
 * 
 * @param {HTMLDivElement} stage - the reference to the current instance of `stage` (a.k.a. "top-level `view-group`")
 * @returns {Iterable} `Iterable` : if such iterable is iterated, each value of iterable's is a "`view-group`"; top-level `view-group` conventionally is called **"`stage`"**, otherwise it's a **"`layer`"**
 */
export default class {

    static getResponsiveRatio({context}){
        
        let
            canvas = context?.canvas
            ,
            aspectRatioWidth = ( Number( stage?.getAttribute('readonly:width') ) / Number(canvas.width) )**-1
            ,
            aspectRatioHeight = ( Number( stage?.getAttribute('readonly:height') ) / Number(canvas.height) )**-1
            ,
            responsiveValue = Math.min(aspectRatioWidth, aspectRatioHeight)
            ;

        return responsiveValue;
    }

    static init({ stage }) {

        if ( responsify({ stage }) ) {
            return (
                getIterable(stage.layers).map( canvas => canvas = canvas.getContext('2d') )
            );
        }

    }

    static ViewGroup = {
        Stage : customElements.get('stage-view'),
        Layer : customElements.get('layer-view'),
    }
    
    static Views = {
        Grid,
        Wireframe,
    }

    static Helpers = {
        Misc: {
            setRange,
        }
        ,
        Trigonometry: {
            setAngle
            ,
            degToRad
        }
        ,
    }

}

/**
 * @param {HTMLDivElement} stage - canvas wrapping element (**"view-group"**), if such "`view-group`" is a top-level `view-group`, by convention we will call it the **"`stage`"**
 * @returns responsify the "stage" and its nested HTMLCanvasElement(s) a.k.a. "Layers", if any
 */
function responsify({stage}){

    /** 
        * > This function expresson is a guard against end-user or developer, who know very little about canonical `Canvas API`
        * @param {Number} num - odd number that is made even, or even number that is left out as is, i.e. even
        * @returns makes sure the `GRIDCELL_DIM_RATIO` is always even, this makes sure shapes (views) are well centred in grid-first coordinate system
    */
    const evenNumber = (num = 0) => {
        const rounded = Math.ceil(num);
        return (
            ( (rounded % 2) === 1 ) ? (rounded + 1) : (rounded)
        );
    }

    let
        GRIDCELL_DIM = ( stage.clientWidth / evenNumber( stage.scale ) )
        ,
        divisorX = Math.ceil( stage?.clientWidth / GRIDCELL_DIM )
        ,
        divisorY = Math.ceil( stage?.clientHeight / GRIDCELL_DIM )
        ,
        X_IN_MIDDLE = ( ( divisorX * GRIDCELL_DIM ) / 2 )
        ,  
        Y_IN_MIDDLE = ( ( divisorY * GRIDCELL_DIM  ) / 2 )
    ;

    stage.grid = {
        GRIDCELL_DIM,
        X_IN_MIDDLE: X_IN_MIDDLE * window.devicePixelRatio, 
        Y_IN_MIDDLE: Y_IN_MIDDLE * window.devicePixelRatio,
    }
    
    const muttable = {
        stageWidth: stage?.clientWidth * window.devicePixelRatio,
        stageHeight: stage?.clientHeight * window.devicePixelRatio,
    }

    if (stage.children.length > 0){
        Array.from( stage.children ).forEach((layer)=>{ 
            layer.width = muttable.stageWidth;
            layer.height = muttable.stageHeight;
        });
    }

    return true;

}
