// Route to retrieve all user logins from db
module.exports = function (app) {
  const logins = require("../controllers/login.controller.js");
  app.get("/getLogins", logins.findAll);
};
