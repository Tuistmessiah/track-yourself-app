import {
  createUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  signOut as signOutFb,
  makeAdmin as makeAdminFb,
  onAuthStateChanged
} from "Firebase/auth";
import { addUser } from "Connection/users";

// - Make User admin
export const makeAdmin = async email =>
  makeAdminFb({ email })
    .then(result => {
      console.info({ result });
      return result;
    })
    .catch(error => {
      console.error({ error });
      return null;
    });

// - Create User
export const createUser = async (email, password) =>
  createUserWithEmailAndPassword(email, password)
    .then(async cred => {
      const bio = "dummy";
      await addUser(cred.user.uid, email, bio);
      return "ok";
    })
    .catch(error => {
      console.error(error);
      return null;
    });

// - Sign In
export const signIn = async (email, password) =>
  doSignInWithEmailAndPassword(email, password)
    .then(cred => "ok")
    .catch(error => {
      console.error(error);
      return null;
    });

// - Sign Out
export const signOut = async () =>
  signOutFb()
    .then(cred => "ok")
    .catch(error => {
      console.error(error);
      return null;
    });

// > Listeners

// - Check Auth
export function onAuthChange(callback) {
  onAuthStateChanged(callback);
}
