import Sortable from './sortablejs/modular/sortable.core.esm.js';
import setStyling from './index.css.js';

export const wc_list = [...import.meta.url.split('/').reverse()][1];
customElements.define(wc_list, class extends HTMLLIElement {

    constructor({ name, attrs = {} }) {

        super();

        if (document){
            document.adoptedStyleSheets.push(
                setStyling.call(this, attrs)
            )
        }

        this.name = name;

        if (attrs.loopData[1]?.length > 0) {
            [...attrs.loopData[1]].forEach((item, j) => {
                attrs.loopData[0].call(this, item, j);
            });
        }

        /**
         * {@link https://github.com/SortableJS/Sortable?tab=readme-ov-file#options}
         * */ 
        if (attrs.sortableConfig) {
            Sortable.create(this, {
                ...attrs.sortableConfig
            });
        }

    }

}
,
{
    extends: 'li'
})