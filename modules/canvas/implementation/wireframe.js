import Placard from '../src/index.js';

export default class {

    static draw({context}){

        let 
            { canvas } = context
            ,
            strokeStyle = 'black'
            ;
        
        return ([
            Placard.Views.Wireframe.draw({
                canvas,
                options: {
                    type: ident.value,
                    strokeStyle,
                }
            })
            ,
            Placard.Views.Wireframe.draw({
                canvas,
                options: {
                    type: reversed_ident.value,
                    strokeStyle,
                }
            })
            ,
        ]);

    }

}

const { ident, reversed_ident } = Placard.Views.Wireframe.ENUMS.TYPE ;