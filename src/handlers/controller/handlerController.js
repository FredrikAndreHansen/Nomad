import { LoadingController } from "./loadingController.js";
import { errorView } from "../view/errorView.js";
import { successView } from "../view/successView.js";

const errorDOMElement = document.querySelector('#handler');

export class HandlerController {

    displayError(message) {  
        errorDOMElement.innerHTML = errorView(message);
        this.#init();
    }

    displaySuccess(message, redirect = false) {  
        errorDOMElement.innerHTML = successView(message);
        this.#init(redirect);
    }

    #init(redirect = false) {
        this.#setBackgroundContainer();    
        this.#removeOnClick(redirect);
        this.#removeLoading();
    }

    #setBackgroundContainer() {
        const backgroundContainerErrorDOMEl = document.querySelector('#background-container-error');
        backgroundContainerErrorDOMEl.classList.remove('background-container-remove');
        backgroundContainerErrorDOMEl.classList.add('background-container-show');
    }

    #removeOnClick(redirect = false) {
        // Remove when clicking on the button or outside the error element, or redirect to a different page
        const getDOMElements = [document.querySelector('#handler-btn'), document.querySelector('#background-container-error')];
        getDOMElements.forEach((element) => {
            element.addEventListener('click', function() {
                if (redirect === false) {
                    this.#removeInnerElement();
                } else {
                    window.location.replace(redirect.redirect);
                }
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

    throwError(errorMessage) {
        const error = new Error(errorMessage);
        throw error;
    }

}