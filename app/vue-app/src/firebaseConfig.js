import firebase from 'firebase';

const config = {
// retrieve credentials from Firebase
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
const currentUser = auth.currentUser;

export {
  db,
  auth,
  google,
  currentUser
}
