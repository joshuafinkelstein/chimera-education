import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDxMRazrz1DpgfvaZpKJ9GON9YStwnMfGA",
  authDomain: "chimera-e8803.firebaseapp.com",
  databaseURL: "https://chimera-e8803.firebaseio.com",
  projectId: "chimera-e8803",
  storageBucket: "",
  messagingSenderId: "788713293552",
  appId: "1:788713293552:web:132e4a08046a9ea3"
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
const currentUser = auth.currentUser;

const publicDirectory = db.ref('published');

export {
  db,
  auth,
  google,
  currentUser,
  publicDirectory
}
