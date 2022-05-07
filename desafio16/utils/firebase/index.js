const firebase_admin = require("firebase-admin");
const firebase_serviceAccount = require("./config/dev-ignaciogz-firebase-adminsdk-cfkx3-52b390af1a.json");

firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(firebase_serviceAccount)
});

const firestore = firebase_admin.firestore();

module.exports = { firestore };