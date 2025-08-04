import { setRange } from "../modules/maths/index.js";

export class grid_view {

    /**
     * The `default.draw` static method takes single `Object` as its input whose properties are as follows:
     * @param {CanvasRenderingContext2D} `canvas` - a reference to `canvas` (_a.k.a. "Layer"_);
     * @param {Object} `options` - options you have passed to shape's current `context` of the current `canvas` reference;
     * @returns `context` - the modified `context` with a `grid` view "painted" on the `<canvas>` hosted bitmap.
    */
    static draw({context, options}){

        let 
            gridcellDim = stage.grid.GRIDCELL_DIM
            ,
            gridcellMatrix = setRange(0, gridcellDim, context.canvas.width)
            ;
        
        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        
        
        /** {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations} */
        function drawGrid(x, y, xLen = gridcellDim, yLen = gridcellDim) {

            if (options.dotted){
                const improveVisibility = (dot)=> dot = dot*stage.grid.GRIDCELL_DIM;
                [xLen, yLen] = [1/gridcellDim, 1/gridcellDim].map(improveVisibility)

            } else {
                [xLen, yLen] = [1*gridcellDim, 1*gridcellDim]
            }

            context.beginPath();
            
            context.rect(x, y, xLen, yLen);
            context.kind = options?.kind || 'grid';
            context.lineWidth = options?.lineWidth || 1;
            context.strokeStyle = options?.strokeStyle || 'black';
            options.hidden ? false : context.stroke();

        }

        let
            divisorX = Math.ceil( stage.clientWidth / gridcellDim )
            ,
            divisorY = Math.ceil( stage.clientHeight / gridcellDim )
        ;
        ;[...new Array(divisorY)].map((v, row)=>{

            return v = 1+row;

        }).forEach((row)=>{

            gridcellMatrix.forEach((_, col)=>{

                if( row === 1/* if it's very 1st row, see cont'd... */ ){

                    drawGrid(gridcellDim * col, 0); /* [cont'd] ...fill the row */

                }

                drawGrid(gridcellDim * col, gridcellDim * row);
            
            });
        

        });

        return context;
    
    }

}