import { HandlerController } from '../../../handlers/controller/handlerController.js';

const handlerController = new HandlerController();

export class PasswordResetModel {

    resetPassword(email) {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            this.#clearEmailInput();
            
            handlerController.displaySuccess(`An email has been sent to <span style="font-weight: bold;">${email}</span>!<br><br>Please check your spam folder if you can't find it`);
        })
        .catch((error) => {
            this.#clearEmailInput();

            let errorMessage = error.message;
            const formattedErrorMessage = errorMessage.replace('Firebase: ','').replace('auth/', '');

            handlerController.displayError(`Entered email: <span style="font-weight: bold;">${email}</span><br><br>` + formattedErrorMessage);
        });
    }

    #clearEmailInput() {
        const emailDOMEl = document.querySelector('#email');
        emailDOMEl.value = '';
    }

}