// Route to authenticate user by verifying their jwt token
module.exports = function (app) {
  const jwt = require("jsonwebtoken");
  const list = require("../controllers/list.controller.js");

  app.get("/resource", (req, res) => {
    const auth = req.headers["authorization"];
    const token = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, "jwt-secret");

      res.send({
        message: "Success! Token valid.",
        currentUser: `${decoded.name}`,
      });
    } catch (err) {
      res.status(401).send({ message: "Invalid token" });
    }
  });
};
