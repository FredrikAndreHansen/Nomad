import { setRoute } from "./helpers/router.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKJcAdJwh-B4PqRhWb1VusZB61sl7Tx-Y",
  authDomain: "nomadis-e08c3.firebaseapp.com",
  databaseURL: "https://nomadis-e08c3-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "nomadis-e08c3",
  storageBucket: "nomadis-e08c3.appspot.com",
  messagingSenderId: "935414808744",
  appId: "1:935414808744:web:ad70dcdd1660608502c29d"
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

setRoute();

// Todo:
// change course page to course.html
// Add redirect to the sign in page after the password reset link has been sent