import { db, functions } from "Firebase/config";
// TODO: This should all be CF, because this way I can't protect data from other users and put secure conditions
// > SERVICES

// - Async

export async function getPages() {
  return db
    .collection("pages")
    .get()
    .then(snapshot => assignIds(snapshot))
    .catch(error => {
      console.error(error);
      return null;
    });
}

export default function getPages1() {
  return functions
    .httpsCallable("adminAddRole")()
    .then(({ data }) => data);
}

export async function addPage(page) {
  return db
    .collection("pages")
    .add(page)
    .then(snapshot => {
      console.info("Added page");
      return "ok";
    })
    .catch(error => {
      console.error(error);
      return null;
    });
}

export async function editPage(page, id) {
  const newPage = deAssignId(page);
  return db
    .collection("pages")
    .doc(id)
    .set(newPage)
    .then(snapshot => {
      console.info("Successfully written!");
      return "ok";
    })
    .catch(error => {
      console.error(error);
      return null;
    });
}

export async function deletePage(id) {
  return db
    .collection("pages")
    .doc(id)
    .delete()
    .then(snapshot => {
      console.info("Delete successfully!");
      return "ok";
    })
    .catch(error => {
      console.error(error);
      return null;
    });
}

// - Sockets

export async function onGetPages(callback) {
  return db.collection("pages").onSnapshot(
    snapshot => {
      callback(assignIds(snapshot));
    },
    error => console.error(error)
  );
}

// > INTERNALS

function assignIds(snapshot) {
  return snapshot.docs.map(doc => assignId(doc));
}

function assignId(doc) {
  return { ...doc.data(), id: doc.id };
}

function deAssignId(doc) {
  if (doc.id) delete doc.id;
  return doc;
}
