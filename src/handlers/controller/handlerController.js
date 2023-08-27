import { LoadingController } from "./loadingController.js";
import { errorView } from "../view/errorView.js";
import { successView } from "../view/successView.js";

const errorDOMElement = document.querySelector('#handler');

export class HandlerController {

    displayError(message) {  
        errorDOMElement.innerHTML = errorView(message);
        this.#init();
    }

    displaySuccess(message) {  
        errorDOMElement.innerHTML = successView(message);
        this.#init();
    }

    #init() {
        this.#setBackgroundContainer();    
        this.#removeOnClick();
        this.#removeLoading();
    }

    #setBackgroundContainer() {
        const backgroundContainerErrorDOMEl = document.querySelector('#background-container-error');
        backgroundContainerErrorDOMEl.classList.remove('background-container-remove');
        backgroundContainerErrorDOMEl.classList.add('background-container-show');
    }

    #removeOnClick() {
        // Remove when clicking on the button or outside the error element
        const getDOMElements = [document.querySelector('#handler-btn'), document.querySelector('#background-container-error')];
        getDOMElements.forEach((element) => {
            element.addEventListener('click', function() {
                this.#removeInnerElement();
            }.bind(this));
        });
    }

    #removeInnerElement() {
        errorDOMElement.innerHTML = '';
        const backgroundContainerErrorDOMEl = document.querySelector('#background-container-error');
        backgroundContainerErrorDOMEl.classList.add('background-container-remove');
        backgroundContainerErrorDOMEl.classList.remove('background-container-show');
    }

    #removeLoading() {
        const loadingController = new LoadingController();
        loadingController.remove();
    }

}