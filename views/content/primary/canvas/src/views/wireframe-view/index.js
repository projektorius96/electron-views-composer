export class wireframe_view {

    /**
     * The `default.draw` static method takes single `Object` as its input whose properties are as follows:
     * @param {CanvasRenderingContext2D} `canvas` - a reference to `canvas` (_a.k.a. "Layer"_);
     * @param {Object} `options` - options you have passed to shape's current `context` of the current `canvas` reference;
     * @returns `context` - the modified `context` with a `wireframe` view "painted" on the `<canvas>` hosted bitmap.
    */
    static draw({context, options, ENUMS}){

        switch (options.type) {
            // DEV_NOTE (!) # .value is an alias for .name (@see ./src/utils.js)
            case ENUMS.CASE.ident:
                this.#identDiagonal({context, options});
                break;
            case ENUMS.CASE.reversed_ident:
                this.#reversedDiagonal({context, options});
                break;
        }

        return true;

    }

    static #identDiagonal({context, options}){
        context.beginPath();
            context.moveTo(
                0
                , 
                0
            );
            context.lineTo(
                window.innerWidth * window.devicePixelRatio
                , 
                window.innerHeight * window.devicePixelRatio
            );
        context.closePath();

        context.lineWidth = options?.lineWidth || 1;
        context.strokeStyle = options?.strokeStyle || 1;
        context.fillStroke();
    }

    static #reversedDiagonal({context, options}){
        context.beginPath();
            context.moveTo(
                window.innerWidth * window.devicePixelRatio
                , 
                0
            );
            context.lineTo(
                0
                , 
                window.innerHeight * window.devicePixelRatio
            );
        context.closePath();

        context.lineWidth = options?.lineWidth || 1;
        context.strokeStyle = options?.strokeStyle || 1;
        context.fillStroke();
    }

}