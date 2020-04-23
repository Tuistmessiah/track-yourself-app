const functions = require("firebase-functions");
const { admin } = require("../init");
// IMPLEMENTATION

const adminAddRole = functions.https.onCall((data, context) => {
  if (!context.auth.token.admin) {
    return { error: "Only admins!" };
  }

  // get user and custom claim (admin)
  console.info({ data, context });
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(async user => {
      await admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      });
      return {
        message: `Success! ${data.email} is now an admin!`
      };
    })
    .catch(error => error);
});

module.exports = adminAddRole;
