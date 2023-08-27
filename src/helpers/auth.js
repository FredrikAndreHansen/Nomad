import { HandlerController } from '../handlers/controller/handlerController.js';
import { COURSES_URL } from "./helpers.js";

export async function validateIfLoggedIn() {
    return await new Promise((resolve, reject) => {

        firebase.auth().onAuthStateChanged(function(user) { 
            if (user) {
                let name = 'User';
                // Check if the user has a Google username
                if (user.displayName) {name = user.displayName;}

                // Check if the user has a username in the database
                const dbRef = firebase.database().ref();
                dbRef.child("users").child(user.uid).get().then((snapshot) => {
                    const userId = user.uid;
                    let userInfo = [];

                    if (snapshot.exists()) {
                        const user = snapshot.val();

                        let formattedName;
                        if (name === 'User') {
                            formattedName = user.userName;
                        } else {
                            formattedName = name;
                        }

                        userInfo = {
                            userId: userId,
                            name: formattedName
                        };

                        resolve(userInfo);
                    } else {
                        userInfo = {
                            userId: userId,
                            name: name
                        };
 
                        writeUserData({
                            userId: user.uid, 
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

export function signOut() {
    firebase.auth().signOut().then(() => {
        window.location.replace(COURSES_URL);
    }).catch((error) => {
        const handlerController = new HandlerController();
        handlerController.displayError(error);
    });
}

export function writeUserData(userData) {
    const { userId, name } = userData;
    firebase.database().ref('users/' + userId).set({
        userName: name,
        courses: [
            {
                course: 'cyberSecurity',
                title: 'Cyber Security Basics',
                progress: 0,
                isPaid: false
            }
        ],
        company: ''
    });
}