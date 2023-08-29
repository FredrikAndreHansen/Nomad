import { LoadingController } from "../../../handlers/controller/loadingController.js";
import { passwordResetView } from "../view/passwordResetView.js";
import { validateUserInputAndRedirect } from "../../../helpers/auth.js";

export class PasswordResetController {

    setView() {
        const contentDOMEl = document.querySelector('#content');
        contentDOMEl.innerHTML = passwordResetView;

        const passwordResetBtnDOMEl = document.querySelector('#password-reset-btn');
        const emailDOMEl = document.querySelector('#email');

        passwordResetBtnDOMEl.addEventListener('click', function(e) {
            e.preventDefault();
            
            validateUserInputAndRedirect({
                email: emailDOMEl.value
            });
        });

        const loadingController = new LoadingController();
        loadingController.remove();
    }

}