import { SignInModel } from "./signInModel.js";
import { PasswordResetModel } from "./passwordResetModel.js";
import { HandlerController } from "../../../handlers/controller/handlerController.js";
import { LoadingController } from "../../../handlers/controller/loadingController.js";
import { writeUserData } from "../../../helpers/auth.js";
import { VALIDATE_USER_INPUT } from "../../../helpers/helpers.js";

const handlerController = new HandlerController();
const signInModel = new SignInModel();

export class RegisterModel {

    #registerUser(userData) {
        const { name, email, password } = userData;
        firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
            const user = userCredential.user;
            
            writeUserData({
                userId: user.uid, 
                name: name
            });
            
            signInModel.signInWithEmail({
                email: email,
                password: password
            });
        }).catch((error) => {
            const errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === 'auth/email-already-in-use') {errorMessage = 'The email address is already taken!'}
            if (errorCode === 'auth/invalid-email') {errorMessage = 'The email address is not properly formatted!'}
            const formattedErrorMessage = errorMessage.replace('Firebase: ','').replace('auth/', '');
            handlerController.displayError(formattedErrorMessage);
        });
    }

    isUserInputValid(userData) {
        const { name, email, password, confirmPassword } = userData;
        let errorMessage = '';

        const loadingController = new LoadingController();
        loadingController.display();

        errorMessage = VALIDATE_USER_INPUT({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })

        // Show error message if there are any errors
        if (errorMessage !== null) {
            return handlerController.displayError(errorMessage);
        }

        // Register
        if (name !== undefined && password !== undefined) {
            return this.#registerUser({
                name: name,
                email: email,
                password: password
            });
        }

        // Sign In
        if (name === undefined && password !== undefined) {
            return signInModel.signInWithEmail({
                email: email,
                password: password
            });
        }

        // Password Reset
        if (name === undefined && password === undefined) {
            const passwordResetModel = new PasswordResetModel();
            passwordResetModel.resetPassword(email);
        }
    }

}