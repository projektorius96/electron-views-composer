import './DOMutils.js';
import { wc_label } from './web-components/wc-label/index.js';
import { wc_list } from './web-components/wc-list/index.js';

export {
    Label,
    List,
}

const Label = customElements.get(wc_label);
const List = customElements.get(wc_list);

