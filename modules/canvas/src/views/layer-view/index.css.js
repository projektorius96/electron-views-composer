export default function({opacity, hidden}) {

    /**
     * > Credits: Inline HTML extension for VSC (identifier:pushqrdx.inline-html)
     */
    this.style.cssText = /* style */`
        display: inherit;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        background: transparent;
        opacity: ${opacity || 1};
        visibility:  ${(hidden ? 'hidden' : false)  || 'visible'};
        `;

    return true;

}