export default function() {

    const styling$global = new CSSStyleSheet();
    styling$global
    .insertRule(/* style */`
        :root {
            --vertical-scrollbar-width: calc(100vw - 100%);
        }
    `);
    styling$global
    .insertRule(/* style */`
        body,
        body * {
            box-sizing: border-box;
        }
    `);
    styling$global.insertRule(/* style */`
        body {
            padding: 0;
            margin: 0;
        }
    `);
document.adoptedStyleSheets.push(styling$global)

    /**
     * > Credits: Inline HTML extension for VSC (identifier:pushqrdx.inline-html)
     */
    this.style.cssText = /* style */`
        display: block;
        width: calc( 100vw - var(--vertical-scrollbar-width) );
        height: 100vh;
        position: relative;
        top: 0px;
        left: 0px;
        `;

    return true;

}