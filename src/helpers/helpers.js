import { HandlerController } from "../handlers/controller/handlerController.js";
const handlerController = new HandlerController();

export const URL = 'http://localhost:8080/';
export const COURSES_URL = URL + "courses.html";
export const REGISTER_URL = COURSES_URL + "?register";
export const PASSWORD_RESET_URL = COURSES_URL + "?passwordreset";
export const ERROR_URL = URL + "404.html";

export const ALL_COURSES = [
    {
        course: 'cyberSecurity',
        title: 'Cyber Security Basics',
        progress: 0,
        isPaid: false
    }
];

export function VALIDATE_USER_INPUT(userInfo) {
    const {name = 'NOT_SET', email = 'NOT_SET', password = 'NOT_SET', confirmPassword = 'NOT_SET'} = userInfo;

    if (name !== 'NOT_SET' && validateName(name) !== null) {
        return validateName(name);     
    }
    
    if (email !== 'NOT_SET' && validateEmail(email) !== null) {
        return validateEmail(email);
    }

    if (password !== 'NOT_SET' && validatePassword(password) !== null) {
        return validatePassword(password);
    }

    if (confirmPassword !== 'NOT_SET' && confirmPassword !== password) {
        return handlerController.throwError(`The passwords don't match!<br>Please make sure that the password and the confirmed password are the same`);
    }

    return null;
}

// Email validation, text followed by "@" followed by text, followed by "." followed by text
const regex = new RegExp('[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}');

function validateName(name) {
    if (name.length > 64) {
        return handlerController.throwError(`The name is too long!<br>Maximum length is 64 characters`);
    }
    if (name.length === 0) {
        return handlerController.throwError("The name cannot be empty!");
    }

    return null;
}

function validateEmail(email) {
    if (email.length === 0) {
        return handlerController.throwError("The email address cannot be empty!");
    }
    if (email.length > 66) {
        return handlerController.throwError(`The email address is too long!<br>Maximum length is 66 characters`);
    }
    let setRegex = regex;
    if (!setRegex.test(email)) {
        return handlerController.throwError("The email address is not properly formatted!");
    }

    return null;
}

function validatePassword(password) {
    if (password !== 'NOT_SET') {
        if (password.length === 0) {
            return handlerController.throwError("The password cannot be empty!");
        }
        if (password.length > 140) {
            return handlerController.throwError(`The password is too long!<br>Maximum length is 140 characters`);
        }
        if (password.length < 6) {
            return handlerController.throwError(`The password is too short!<br>Minimum length is 6 characters`);
        }
    }

    return null;
}