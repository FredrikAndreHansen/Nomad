import { headerView } from "./headerView.js";

export class HeaderController {

    setView() {
        const headerDOMEl = document.querySelector('#header');
        headerDOMEl.innerHTML = headerView;

        document.title = "Nomad Ltd | Training";
    }

}