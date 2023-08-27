import { REGISTER_URL, PASSWORD_RESET_URL } from "../../../helpers/helpers.js";

export const signInView = `
    <div class="background"></div>
    <div class="login-wrapper-set-size"></div>
    <div class="login-wrapper">
        <h2 class="header-text-center">SIGN IN</h2>
        <div class="social-signin-btn-wrapper" id="google-login-btn"><div class="social-signin-icon-wrapper"><img alt="Google icon" class="social-signin-icon" src="/graphics/icons/googleIcon.svg" /></div><button class="social-signin-btn">Sign In with Google</button></div>
        <div class="social-signin-btn-wrapper" id="facebook-login-btn"><div class="social-signin-icon-wrapper"><img alt="Facebook icon" class="social-signin-icon" src="/graphics/icons/facebookIcon.svg" /></div><button class="social-signin-btn">Sign In with Facebook</button></div>
        <div class="medium-space"></div>
        <hr class="sign-in-hr-left" />
        <hr class="sign-in-hr-right" />
        <p class="p-dark-center-x-small">Or</p>
        <div class="medium-space"></div>
        <form>
            <div class="email-wrapper">
                <input type="email" id="email" placeholder="Email" maxlength="66" required />
                <input type="password" id="password" placeholder="Password" minlength="6" maxlength="140" required />
                <button id="email-login-btn" class="sign-in-btn">SIGN IN</button>
            </div>
        </form>
        <p class="p-dark-center-x-small"><a class="link-text-dark" href="${REGISTER_URL}">Register</a>  | <a href="${PASSWORD_RESET_URL}" class="link-text-dark">Forgot Password?</a></p>
    </div>
`;