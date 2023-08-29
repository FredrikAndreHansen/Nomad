import { SignInModel } from "../model/signInModel.js";
import { LoadingController } from "../../../handlers/controller/loadingController.js";
import { signInView } from "../view/signInView.js";
import { validateUserInputAndRedirect } from "../../../helpers/auth.js";

export class SignInController {

    setView() {
        const signInModel = new SignInModel();

        const contentDOMEl = document.querySelector('#content');
        contentDOMEl.innerHTML = signInView;

        // Sign in with Google
        const googleLoginBtnDOMEl = document.querySelector('#google-login-btn');
        googleLoginBtnDOMEl.addEventListener('click', function() {
            signInModel.signInWithGoogle();
        });

        // Sign in with Facebook
        const facebookLoginBtnDOMEl = document.querySelector('#facebook-login-btn');
        facebookLoginBtnDOMEl.addEventListener('click', function() {
            signInModel.signInWithFacebook();
        });

        // Sign in with Email
        const emailDOMEl = document.querySelector('#email');
        const passwordDOMEl = document.querySelector('#password');
        const emailLoginBtnDOMEl = document.querySelector('#email-login-btn');
        emailLoginBtnDOMEl.addEventListener('click', function(e) {
            e.preventDefault();

            validateUserInputAndRedirect({
                email: emailDOMEl.value,
                password: passwordDOMEl.value
            });
        });

        const loadingController = new LoadingController();
        loadingController.remove();
    }

}