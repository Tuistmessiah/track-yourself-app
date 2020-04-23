require("./init");

const purge = require("./commands/purge.js");
const probe = require("./commands/probe.js");

// TODO: Make script to print to a json file something dynamically
// TODO: Make a script for sums and averaging
// TODO: Make a script for checking data consistency dynamically

let arg1 = process.argv[3];
let arg2 = process.argv[4];
let arg3 = process.argv[5];

if (process.argv.length > 2) {
  switch (process.argv[2]) {
    case "eraseCollection": {
      let collectionName = arg1;
      purge.eraseCollection(collectionName).then(result => {
        process.exit();
      });
      break;
    }
    case "erasePropInCollection": {
      let collectionName = arg1;
      let propertyName = arg2;
      purge.erasePropInCollection(collectionName, propertyName).then(result => {
        process.exit();
      });
      break;
    }
    case "eraseDocument": {
      let collectionName = arg1;
      let documentId = arg2;
      purge.eraseDocument(collectionName, documentId).then(result => {
        process.exit();
      });
      break;
    }
    case "eraseProperty": {
      let collectionName = arg1;
      let documentId = arg2;
      let propertyName = arg3;
      purge
        .eraseProperty(collectionName, documentId, propertyName)
        .then(result => {
          process.exit();
        });
      break;
    }
    case "getCollection": {
      let collectionName = arg1;
      probe.getCollection(collectionName).then(result => {
        process.exit();
      });
      break;
    }
    default:
      console.info(`Command "${process.argv.length}" unknown!`);
      process.exit(1);
  }
} else {
  console.info("Please specify a valid command!");
  process.exit(1);
}
