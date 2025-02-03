export const wc_label = [...import.meta.url.split('/').reverse()][1];
customElements.define(wc_label, class extends HTMLLabelElement {

    constructor(description = ''){
        
        super();
        
        this.style.cssText = /* style */`
            width: 100%;
            text-align: center;
        `;
        this.textContent = String(description);

        return this;

    }

}
, 
{
    extends: HTMLElement.extends?.(HTMLLabelElement)
})