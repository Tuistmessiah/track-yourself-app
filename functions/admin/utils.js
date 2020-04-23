module.exports = {
  assignIds,
  assignId,
  deAssignId
};

// > Internals

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
