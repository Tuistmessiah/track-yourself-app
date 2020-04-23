const { db, admin } = require("../init");
const { assignIds } = require("../utils");

module.exports = {
  getCollection
};

async function getCollection(collectionName) {
  const collection = await db
    .collection(collectionName)
    .get()
    .then(snapshot => assignIds(snapshot))
    .catch(error => {
      console.error(error);
      return null;
    });

  console.info(collection);
}

// TODO: Make a get filtered collection by a prop
// TODO: Make a get document
