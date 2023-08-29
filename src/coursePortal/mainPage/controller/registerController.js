import { LoadingController } from "../../../handlers/controller/loadingController.js";
import { registerView } from "../view/registerView.js";
import { validateUserInputAndRedirect } from "../../../helpers/auth.js";

export class RegisterController {

    setView() {
        const contentDOMEl = document.querySelector('#content');
        contentDOMEl.innerHTML = registerView;

        const nameDOMEl = document.querySelector('#name');
        const emailDOMEl = document.querySelector('#email');
        const passwordDOMEl = document.querySelector('#password');
        const confirmPasswordDOMEl = document.querySelector('#confirm-password');
        const registerBtnDOMEl = document.querySelector('#register-btn');

        registerBtnDOMEl.addEventListener('click', function(e) {
            e.preventDefault();
            
            validateUserInputAndRedirect({
                name: nameDOMEl.value,
                email: emailDOMEl.value,
                password: passwordDOMEl.value,
                confirmPassword: confirmPasswordDOMEl.value
            });
        });

        const loadingController = new LoadingController();
        loadingController.remove();
    }

}