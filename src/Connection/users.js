import { db } from "Firebase/config";

// > SERVICES

// - Async

export async function addUser(uid, email, bio) {
  if (!uid) {
    console.error("User wasn't saved properly!");
    return null;
  }

  return db
    .collection("users")
    .doc(uid)
    .set({
      email,
      bio
    })
    .catch(error => console.error(error));
}

export async function getUser(uid) {
  if (!uid) {
    return null;
  }

  return db
    .collection("users")
    .doc(uid)
    .get()
    .then(snapshot => snapshot.data())
    .catch(error => {
      console.error(error);
      return null;
    });
}
