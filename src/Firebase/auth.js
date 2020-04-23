import { auth, functions } from "./config";

// > Functions

// - Make User admin
export const makeAdmin = async obj =>
  functions.httpsCallable("adminAddRole")(obj);

// - Sign Up
export const createUserWithEmailAndPassword = async (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// - Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// - Sign Out
export const signOut = () => auth.signOut();

// > Listeners

// - Check Auth
export function onAuthStateChanged(callback) {
  auth.onAuthStateChanged(async user => {
    let userResult = user;
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        userResult.admin = !!idTokenResult.claims.admin;
      });
      console.info({ message: "User logged in", userResult });
    } else {
      console.info({ message: "No user logged in" });
    }

    callback(userMap(userResult));
  });
}

// > INTERNALS

function userMap(userResp) {
  if (!userResp) return null;

  return {
    admin: userResp.admin,
    uid: userResp.uid,
    displayName: userResp.displayName,
    email: userResp.email,
    emailVerified: userResp.emailVerified,
    isAnonymous: userResp.isAnonymous,
    photoURL: userResp.photoURL,
    providerdata: userResp.providerdata,
    refreshToken: userResp.refreshToken
  };
}
