/* DEV_NOTE # For syntax highlighting extension in VSC, credits to id:tobermory.es6-string-html (user:Tobermory) */
customElements.define('global-layout', class extends HTMLElement {

    connectedCallback(){
        /* document.body.style.backgroundColor = 'yellow'; *//* [PASSING] */
        const nav = document.createElement('nav');
            nav.id = 'appbar';
        this.appendChild(nav);
    }

});

if (document){
    document.body.appendChild(
        new (customElements.get('global-layout'))
    )
}

/* === */

const control_button = 'control-button';
customElements.define(control_button, 
class extends HTMLButtonElement {
    constructor(symbol){
        super()
        this.textContent = symbol;
        this.style.padding = "0.5em";
        this.style.userSelect = 'none';

        return this;
    }
},
{
    extends: 'button'
})

const button_minimize = Reflect.construct(customElements.get(control_button), [RegExp('\u{1F5D5}').source]);
    button_minimize.id = 'button_minimize';
    button_minimize.addEventListener('click', ()=> window.navigation_appbar.minimize());
const button_maximize = Reflect.construct(customElements.get(control_button), [RegExp('\u{1F5D6}').source]);
    button_maximize.id = 'button_maximize';
    button_maximize.addEventListener('click', ()=> window.navigation_appbar.maximize());
const button_close = Reflect.construct(customElements.get(control_button), [RegExp('\u{1F5D9}').source]);
    button_close.id = 'button_close';
    button_close.addEventListener('click', ()=> window.navigation_appbar.close());

const appbar = document.getElementById('appbar');
const appbar$css = new CSSStyleSheet()
    appbar$css.insertRule(/* css */`
        #${appbar.id} {
            height: 100vh;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            background-color:rgb(230, 230, 230);
        }
    `.trim());
    appbar$css.insertRule(/* css */`
        #${appbar.id} > button {
            border: unset;
            background-color: inherit;
        }
    `.trim());
    appbar$css.insertRule(/* css */`
        #${appbar.id} > button:hover {
            background-color:rgb(200, 200, 200);
        }
    `.trim());

const draggableRegion$css = new CSSStyleSheet();
    draggableRegion$css.insertRule(
    /* css */`
            nav {
                -webkit-app-region: drag;
                & > button {
                    -webkit-app-region: no-drag;
                }
            }
    `.trim());

appbar.append(...[
    button_minimize,
    button_maximize,
    button_close,
])

document.adoptedStyleSheets.push(...[
    draggableRegion$css,
    appbar$css,
])