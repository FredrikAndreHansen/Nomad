import { COURSES_URL, REGISTER_URL } from "../../../helpers/helpers.js";

export const passwordResetView = `
    <div class="background"></div>
    <div class="login-wrapper-set-size"></div>
    <div class="password-reset-wrapper">
        <h2 class="header-text-center">Forgot Password?</h2>
        <div class="medium-space"></div>
        <p class="p-dark-center-small">Enter your email address and we'll email you a link to reset your password.</p>
        <form>
            <div class="email-wrapper">
                <input type="email" id="email" placeholder="Email" maxlength="66" required />
                <button id="password-reset-btn" class="sign-in-btn">RESET PASSWORD</button>
            </div>
        </form>
        <p class="p-dark-center-x-small"><a href="${COURSES_URL}" class="link-text-dark">Sign In</a> | <a href="${REGISTER_URL}" class="link-text-dark">Register</a></p>
    </div>
`;