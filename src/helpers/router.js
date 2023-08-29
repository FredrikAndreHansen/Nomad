import { SignInController } from "../coursePortal/mainPage/controller/signInController.js";
import { RegisterController } from "../coursePortal/mainPage/controller/registerController.js";
import { PasswordResetController } from "../coursePortal/mainPage/controller/passwordResetController.js";
import { CoursesController } from "../coursePortal/mainPage/controller/coursesController.js";
import { LoadingController } from "../handlers/controller/loadingController.js";
import { validateAndUpdateUser } from "./auth.js";
import { URL, COURSES_URL, REGISTER_URL, PASSWORD_RESET_URL, ERROR_URL } from "./helpers.js";

const getCurrentUrl = window.location.href;

const loadingController = new LoadingController();

export function setRoute() {

    loadingController.display();

    // Index page
    if (getCurrentUrl === URL) {
        return loadingController.remove();
    }

    // Course Portal Index
    if (getCurrentUrl === COURSES_URL) {
        return validateAndUpdateUser().then((userInfo) => {
            const { userId, name } = userInfo;

            const coursesController = new CoursesController();
            coursesController.setView({
                name: name, 
                userId: userId
            });
        }).catch(() => {
            const signInController = new SignInController();
            signInController.setView();
        });
    }

    // Register
    if (getCurrentUrl === REGISTER_URL) {   
        return validateAndUpdateUser().then(() => {
            window.location.replace(COURSES_URL);
        }).catch(() => {
            const registerController = new RegisterController();
            registerController.setView();
        });
    }

    // Password reset
    if (getCurrentUrl === PASSWORD_RESET_URL) {    
        return validateAndUpdateUser().then(() => {
            window.location.replace(COURSES_URL);
        }).catch(() => {
            const passwordResetController = new PasswordResetController();
            passwordResetController.setView();
        });
    }

    // Page not found
    return window.location.replace(ERROR_URL);
}