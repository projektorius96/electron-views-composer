import setStyling from './index.css.js';

export const stage_view = (new URL(import.meta.url)).pathname.split('/').at(-2);
customElements.define(stage_view, class extends HTMLDivElement {
    
    constructor({container = document.body, scale = 20}) {

        setStyling.call( super() );


            this.id = "stage";        
            this.scale = scale;

        if (container !== document.body){
            container.prepend(this);
        } else {
            document.body.prepend(this);
        }

        return this;

    }

}, {extends: 'div'})