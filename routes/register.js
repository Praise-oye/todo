// Route to register new user. Stores new username and password in db
module.exports = function (app) {
  const login = require("../controllers/login.controller.js");
  app.post("/register", login.create);
};
