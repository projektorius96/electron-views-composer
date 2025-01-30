import Wireframe from './wireframe.js';

export default function setView({stage, Placard, UserSettings}){

    Placard
    .init({stage})
    .on((context)=>{
        
        if ( UserSettings.init({context}) ) {

            let canvas = context.canvas;
            switch (canvas.name) {

                /* === WIREFRAMES === */
                    case stage.layers.wireframe?.name :

                        stage.layers.wireframe.add([
                            Wireframe.draw({context})
                            ,
                        ]);

                    break;
                /* === WIREFRAMES === */

                /* === GRID === */
                    case 'grid' :

                        stage.layers.grid.add([
                            Placard.Views.Grid.draw({
                                canvas: stage.layers.grid, 
                                options: {
                                    lineWidth: 2,
                                }}
                            )
                            ,
                        ]);

                    break;
                /* === GRID === */

            endswitch:;}

        endif:;}
        
    endon:;})
    
    return true;

}