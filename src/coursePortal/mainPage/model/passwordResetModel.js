import { HandlerController } from '../../../handlers/controller/handlerController.js';
import { LoadingController } from '../../../handlers/controller/loadingController.js';
import { REGEX } from '../../../helpers/helpers.js';

const handlerController = new HandlerController();

export class PasswordResetModel {

    #resetPassword(email) {
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

    isEmailValid(email) {
        const loadingController = new LoadingController();
        loadingController.display();
        let isValid = true;
        let errorMessage = '';

        // Validate email
        if (email.length === 0 && isValid == true) {
            isValid = false;
            errorMessage = "The email address cannot be empty!";
        }
        let regex = REGEX;
        if (!regex.test(email) && isValid == true) {
            errorMessage = "Please enter a valid email address!"; 
            isValid = false;
        }

        // Show error message if there are any errors
        if (isValid === false) {
            handlerController.displayError(errorMessage);
        }

        // Execute if all validation succeed
        if (isValid === true) {
            this.#resetPassword(email);
        }
    }

}