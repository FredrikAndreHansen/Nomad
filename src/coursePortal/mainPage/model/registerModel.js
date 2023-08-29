import { SignInModel } from "./signInModel.js";
import { HandlerController } from "../../../handlers/controller/handlerController.js";
import { writeUserData } from "../../../helpers/auth.js";

const handlerController = new HandlerController();
const signInModel = new SignInModel();

export class RegisterModel {

    registerUser(userData) {
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

}