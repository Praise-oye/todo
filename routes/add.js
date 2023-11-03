// Route to add new list item to db
module.exports = function (app) {
  const list = require("../controllers/list.controller.js");
  app.post("/add", list.create);
};
