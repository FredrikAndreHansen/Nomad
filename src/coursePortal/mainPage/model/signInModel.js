import { HandlerController } from "../../../handlers/controller/handlerController.js";
import { COURSES_URL } from "../../../helpers/helpers.js";

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

}