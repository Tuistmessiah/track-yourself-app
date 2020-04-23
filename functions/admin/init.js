const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "diary-75135.appspot.com"
});

exports.admin = admin;
exports.db = admin.firestore();
