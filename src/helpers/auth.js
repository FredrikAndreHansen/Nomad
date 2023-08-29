import { RegisterModel } from '../coursePortal/mainPage/model/registerModel.js';
import { SignInModel } from '../coursePortal/mainPage/model/signInModel.js';
import { PasswordResetModel } from '../coursePortal/mainPage/model/passwordResetModel.js';
import { HandlerController } from '../handlers/controller/handlerController.js';
import { LoadingController } from '../handlers/controller/loadingController.js';
import { COURSES_URL, VALIDATE_USER_INPUT, ALL_COURSES } from "./helpers.js";

const handlerController = new HandlerController();

export async function validateAndUpdateUser() {
    return await new Promise((resolve, reject) => {

        firebase.auth().onAuthStateChanged(function(user) { 
            if (user) {
                let name = checkUserNameFromProvider(user);

                // Check if the user exists in the database, if not then write user data, also choose between the providers username and the username in firebase
                const dbRef = firebase.database().ref();
                dbRef.child("users").child(user.uid).get().then((snapshot) => {
                    const userId = user.uid;
                    let userInfo = [];
                    
                    if (snapshot.exists()) {
                        const user = snapshot.val();

                        checkAndUpdateUserCourses(user.courses, userId);

                        userInfo = generateUserIdAndName(userId, { userName: name, userNameInFirebase: user.userName });

                        resolve(userInfo);
                    } else {
                        userInfo = generateUserIdAndName(userId, { userName: name });
 
                        writeUserData({
                            userId: userId, 
                            name: name
                        });

                        resolve(userInfo);
                    }
                });
            } else {
                reject();
            }
        });
    });
}

function checkUserNameFromProvider(user) {
    if (user.displayName) {
        return user.displayName;
    }
    return 'User';
}

// This will align all courses with the ALL_COURSES array in helpers.js and firebase
function checkAndUpdateUserCourses(courses, userId) {
    let coursesArr = courses;
    
    ALL_COURSES.forEach((getCourse) => {
        let courseExists = false;

        for (let i = 0; i < courses.length; i++) {
            if(getCourse.course === courses[i].course) {
                courseExists = true;
            }
        }

        if (courseExists === false) {
            coursesArr.push(getCourse);
        }
    });

    courses.forEach((getCourse) => {
        let courseExists = false;

        for (let i = 0; i < ALL_COURSES.length; i++) {
            if (getCourse.course === ALL_COURSES[i].course) {
                courseExists = true;
            }
        }

        if (courseExists === false) {
            coursesArr = coursesArr.filter((getCourseFromCoursesArr) => {
                return getCourseFromCoursesArr.course !== getCourse.course;
            });
        }
    });

    const dbRef = firebase.database().ref();
    dbRef.child("users").child(userId).child("courses").set(coursesArr);
}

function generateUserIdAndName(userId, userNames) {
    const { userName, userNameInFirebase } = userNames;

    if (userNameInFirebase) {
        let selectedUserName = selectUserName(userNames);

        return { 
            userId: userId, 
            name: selectedUserName 
        };
    }

    return { 
        userId: userId, 
        name: userName 
    };
}

function selectUserName(userNames) {
    const { userName, userNameInFirebase } = userNames;
    
    if (userName === 'User') {
        return userNameInFirebase;
    } else {
        return userName;
    }
}

export function writeUserData(userData) {
    const { userId, name } = userData;

    firebase.database().ref('users/' + userId).set({
        userName: name,
        courses: ALL_COURSES,
        company: ''
    });
}

export function signOut() {
    firebase.auth().signOut().then(() => {
        window.location.replace(COURSES_URL);
    }).catch((error) => {
        handlerController.displayError(error);
    });
}

export function validateUserInputAndRedirect(userData) {
    const { name, email, password, confirmPassword } = userData;
    let errorMessage = '';

    const loadingController = new LoadingController();
    loadingController.display();

    errorMessage = VALIDATE_USER_INPUT({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    });

    if (errorMessage !== null) {
        return handlerController.displayError(errorMessage);
    }

    if (name !== undefined && password !== undefined) {
        return redirectToRegister(name, email, password);
    }

    if (name === undefined && password !== undefined) {
        return redirectToSignIn(email, password);
    }

    if (name === undefined && password === undefined) {
        return redirectToPasswordReset(email);
    }

    return handlerController.displayError('Ooops, something went wrong!<br>Please try again later');
}

function redirectToRegister(name, email, password) {
    const registerModel = new RegisterModel();

    registerModel.registerUser({
        name: name,
        email: email,
        password: password
    });
}

function redirectToSignIn(email, password) {
    const signInModel = new SignInModel();

    return signInModel.signInWithEmail({
        email: email,
        password: password
    });
}

function redirectToPasswordReset(email) {
    const passwordResetModel = new PasswordResetModel();

    return passwordResetModel.resetPassword(email);
}