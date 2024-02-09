const Datastore = require("nedb-promises");
let userDb = Datastore.create({
  autoload: true,
  filename: "./user.db",
});
let refreshTokenDb = Datastore.create({
  autoload: true,
  filename: "./token.db",
});

module.exports = { userDb, refreshTokenDb };
