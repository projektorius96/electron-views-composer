import { HTMLCanvas } from './src/views/index.js';
import Implementation from './implementation/index.js';

// DEV_NOTE # look for `mainPage.webContents.setWindowOpenHandler` (main-end of the render-end) in `<root>/views/index.mjs` file
window.open('index.html', 'id=pip-window-1'); //  render-end of the main-end

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