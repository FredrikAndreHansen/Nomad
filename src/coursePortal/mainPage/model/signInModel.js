import { HandlerController } from "../../../handlers/controller/handlerController.js";
import { LoadingController } from "../../../handlers/controller/loadingController.js";
import { COURSES_URL } from "../../../helpers/helpers.js";
import { REGEX } from "../../../helpers/helpers.js";

const handlerController = new HandlerController();

export class SignInModel {

    async signInWithGoogle() {
        this.#redirectWithProvider('google');
        return await firebase.auth().getRedirectResult();
    }

    async signInWithFacebook() {
        this.#redirectWithProvider('facebook');
        return await firebase.auth().getRedirectResult();
    }

    #redirectWithProvider(provider) {
        if (provider === 'facebook') {
            firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider());
        }
        if (provider === 'google') {
            firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        }
    }

    signInWithEmail(userData) {
        const { email, password } = userData;
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.replace(COURSES_URL);
        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {errorMessage = 'The credentials are incorrect!'}
            const formattedErrorMessage = errorMessage.replace('Firebase: ','').replace('auth/', '');
            handlerController.displayError(formattedErrorMessage);
        });
    }

    isUserInputValid(userData) {
        const { email, password } = userData;

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
            errorMessage = "You can only sign in with an email address!";
            isValid = false;
        }

        // Validate password
        if (password.length === 0 && isValid == true) {
            isValid = false;
            errorMessage = "The password cannot be empty!";
        }

        // Show error message if there are any errors
        if (isValid === false) {
            handlerController.displayError(errorMessage);
        }
        // Execute if all validation succeed
        if (isValid === true) {
            this.signInWithEmail({
                email: email, 
                password: password
            });
        }
    }

}