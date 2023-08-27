export const URL = 'http://localhost:8080/';
export const COURSES_URL = URL + "?courses";
export const REGISTER_URL = URL + "?register";
export const PASSWORD_RESET_URL = URL + "?passwordreset";
export const ERROR_URL = URL + "404.html";

// Email validation, text followed by "@" followed by text, followed by "." followed by text
export const REGEX = new RegExp('[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}');