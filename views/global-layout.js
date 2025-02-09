customElements.define('global-layout', class extends HTMLElement {

    ///* [PASSING] */
    connectedCallback(){
        document.body.style.backgroundColor = 'yellow';
    }

})

if (document){
    document.body.appendChild(
        new (customElements.get('global-layout'))
    )
}