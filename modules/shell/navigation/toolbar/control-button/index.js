const __dirname = import.meta.url.split('/').at(-2);

customElements.define(__dirname, 
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

const button_minimize = Reflect.construct(customElements.get(__dirname), [RegExp('\u{1F5D5}').source]);
    button_minimize.addEventListener('click', ()=> api.parentView.minimize());
const button_maximize = Reflect.construct(customElements.get(__dirname), [RegExp('\u{1F5D6}').source]);
    button_maximize.addEventListener('click', ()=> api.parentView.maximize());
const button_close = Reflect.construct(customElements.get(__dirname), [RegExp('\u{1F5D9}').source]);
    button_close.addEventListener('click', ()=> api.parentView.close());

const appbar = document.getElementById('appbar');
const appbar$css = new CSSStyleSheet()
    appbar$css.insertRule(/* style */`
        #${appbar.id} {
            height: 100vh;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            background-color: #efefef;
        }
    `.trim())

const draggableRegion$css = new CSSStyleSheet();
    draggableRegion$css.insertRule(
    /* style */`
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

export {
    appbar$css,
    draggableRegion$css,
}