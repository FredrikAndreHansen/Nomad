export const URL = 'http://localhost:8080/';
export const COURSES_URL = URL + "?courses";
export const REGISTER_URL = URL + "?register";
export const PASSWORD_RESET_URL = URL + "?passwordreset";
export const ERROR_URL = URL + "404.html";

// Email validation, text followed by "@" followed by text, followed by "." followed by text
export const REGEX = new RegExp('[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}');

export function VALIDATE_USER_INPUT(userInfo) {
    const {name = 'NOT_SET', email = 'NOT_SET', password = 'NOT_SET', confirmPassword = 'NOT_SET'} = userInfo;

    if (name !== 'NOT_SET') {
        if (name.length > 64) {
            return `The name is too long!<br>Maximum length is 64 characters`;
        }
        if (name.length === 0) {
            return "The name cannot be empty!";
        }
    }
    
    if (email !== 'NOT_SET') {
        if (email.length === 0) {
            return "The email address cannot be empty!";
        }
        if (email.length > 66) {
            return `The email address is too long!<br>Maximum length is 66 characters`;
        }
        let regex = REGEX;
        if (!regex.test(email)) {
            return "The email address is not properly formatted!"; 
        }
    }
    
    if (password !== 'NOT_SET') {
        if (password.length === 0) {
            return "The password cannot be empty!";
        }
        if (password.length > 140) {
            return `The password is too long!<br>Maximum length is 140 characters`;
        }
        if (password.length < 6) {
            return `The password is too short!<br>Minimum length is 6 characters`;
        }
    }

    if (password !== confirmPassword && confirmPassword !== 'NOT_SET') {
        return `The passwords don't match!<br>Please make sure that the password and the confirmed password are the same`;
    }

    return null;
}