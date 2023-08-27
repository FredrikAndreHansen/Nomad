import { loadingView } from "../view/loadingView.js";

const loadingDOMEl = document.querySelector('#loading');
const backgroundContainerDOMEl = document.querySelector('#background-container');

export class LoadingController {

    display() {
        loadingDOMEl.innerHTML = loadingView;

        backgroundContainerDOMEl.classList.add('background-container-show');
        backgroundContainerDOMEl.classList.remove('background-container-remove');
    }

    remove() {
        loadingDOMEl.innerHTML = '';

        const pageContentDOMEl = document.querySelector('#page-content');
        pageContentDOMEl.style.opacity = 1;

        backgroundContainerDOMEl.classList.add('background-container-remove');
        backgroundContainerDOMEl.classList.remove('background-container-show');
    }

}