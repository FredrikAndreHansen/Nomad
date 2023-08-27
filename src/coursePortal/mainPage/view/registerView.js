import { COURSES_URL, PASSWORD_RESET_URL } from "../../../helpers/helpers.js";

export const registerView = `
    <div class="background"></div>
    <div class="login-wrapper-set-size"></div>
    <div class="register-wrapper">
        <h2 class="header-text-center">REGISTER</h2>
        <div class="medium-space"></div>
        <form>
            <div class="email-wrapper">
                <input type="text" id="name" placeholder="Full Name" maxlength="64" required />
                <input type="email" id="email" placeholder="Email" maxlength="66" required />
                <input type="password" id="password" placeholder="Password" minlength="6" maxlength="140" required />
                <input type="password" id="confirm-password" placeholder="Confirm Password" minlength="6" maxlength="140" required />
                <button id="register-btn" class="sign-in-btn">REGISTER</button>
            </div>
        </form>
        <p class="p-dark-center-x-small"><a href="${COURSES_URL}" class="link-text-dark">Sign In</a> | <a href="${PASSWORD_RESET_URL}" class="link-text-dark">Forgot Password?</a></p>
    </div>
`;