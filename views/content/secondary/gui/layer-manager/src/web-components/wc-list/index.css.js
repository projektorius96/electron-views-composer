export default function setStyling(attrs){
    this.style.cssText = /* style */`
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 100%;
        height: 100vh;
        list-style-type: none;
    `;
    const attrsCssRuleOverride = new CSSStyleSheet();
        attrsCssRuleOverride
        .insertRule(attrs.cssRuleOverride || /* style */`
            ${this.tagName.toLowerCase()} > ul, ol {
                text-align: center;
            }
        `);

    return attrsCssRuleOverride;
}