// Route to retrieve all list items for a particular user
module.exports = function (app) {
  const list = require("../controllers/list.controller.js");
  app.get("/getList", list.findAll);
};
