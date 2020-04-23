const { db, admin } = require("../init");
const { assignIds } = require("../utils");

module.exports = {
  eraseCollection,
  erasePropInCollection,
  eraseDocument,
  eraseProperty
};

// > Bulk deletion

async function eraseCollection(collectionName) {
  const collection = await db
    .collection(collectionName)
    .get()
    .then(snapshot => assignIds(snapshot))
    .catch(error => {
      console.error(error);
      return [];
    });

  return Promise.all(
    collection.map(document => eraseDocument(collectionName, document.id))
  );
}

async function erasePropInCollection(collectionName, propertyName) {
  const collection = await db
    .collection(collectionName)
    .get()
    .then(snapshot => assignIds(snapshot))
    .catch(error => {
      console.error(error);
      return [];
    });

  return Promise.all(
    collection.map(document =>
      eraseProperty(collectionName, document.id, propertyName)
    )
  );
}

// > Individual deletion

async function eraseDocument(collectionName, documentId) {
  return db
    .collection(collectionName)
    .doc(documentId)
    .delete()
    .catch(error => console.error(error));
}

async function eraseProperty(collectionName, documentId, propertyName) {
  return db
    .collection(collectionName)
    .doc(documentId)
    .update({
      [propertyName]: admin.firestore.FieldValue.delete()
    });
}
