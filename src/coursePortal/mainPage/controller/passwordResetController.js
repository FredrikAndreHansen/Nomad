import { PasswordResetModel } from "../model/passwordResetModel.js";
import { LoadingController } from "../../../handlers/controller/loadingController.js";
import { passwordResetView } from "../view/passwordResetView.js";

export class PasswordResetController {

    setView() {
        const contentDOMEl = document.querySelector('#content');
        contentDOMEl.innerHTML = passwordResetView;

        const passwordResetBtnDOMEl = document.querySelector('#password-reset-btn');
        const emailDOMEl = document.querySelector('#email');

        passwordResetBtnDOMEl.addEventListener('click', function(e) {
            e.preventDefault();
            
            const passwordResetModel = new PasswordResetModel();
            passwordResetModel.isEmailValid(emailDOMEl.value);
        });

        const loadingController = new LoadingController();
        loadingController.remove();
    }

}