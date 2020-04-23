const functions = require("firebase-functions");

const adminAddRole = require("./handlers/admin-add-role");
// import adminAddRole from "./handlers/admin-add-role";
// export { default as adminAddRole } from "./handlers/admin-add-role";
module.exports = { adminAddRole };

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
