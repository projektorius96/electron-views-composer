import UserSettings from './user-settings.js';
import Placard from './src/index.js';
import setViews from './implementation/index.js';

const 
        { Stage, Layer } = Placard.ViewGroup
        ,
        stage = new Stage({scale: 30})
        ;
        if ( stage ) {
            stage.add([
                new Layer({ name: 'grid', opacity: 0.25 })
                ,
                new Layer({name: 'wireframe', hidden: !true})
                ,
            ]);
        }
    
    // DEV_NOTE (!) # crucial line that registers "onresize" Event - without this, window resize would not be detected
    if ( setViews({stage, Placard, UserSettings}) ) window.addEventListener('resize', setViews.bind(null, {stage, Placard, UserSettings})) ;