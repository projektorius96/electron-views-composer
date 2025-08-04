import { HTMLCanvas } from './src/views/index.js';
import Implementation from './implementation/index.js';

document.on('DOMContentLoaded', ()=>{

    const
        stage = Implementation.init({HTMLCanvas})  

    window.on('resize', ()=>{

            HTMLCanvas
                .init({stage})
                    .on( Implementation.draw.bind(null, {HTMLCanvas}) );
        
    })

    // DEV_NOTE (!) # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
    window.dispatch( new Event('resize') );

});