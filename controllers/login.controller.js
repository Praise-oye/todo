// Import logins model file
const Login = require("../models/logins.model.js");

// Add new user to collection
exports.create = function (req, res) {
  let loginModel = new Login({
    username: req.body.username,
    password: req.body.password,
  });

  // Save new login to collection
  loginModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while adding login info." });
    } else {
      console.log(data);
      res.send({ message: "Login info has been added" });
    }
  });
};

// Retrieve all logins from db
exports.findAll = function (req, res) {
  Login.find({}, function (err, logins) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving logins." });
    } else {
      // Push results to 2 arrays, one for usernames and another for passwords
      let usernames = [];
      let passwords = [];

      logins.forEach(function (result) {
        usernames.push(result.username);
      });

      logins.forEach(function (result) {
        passwords.push(result.password);
      });

      // Send login arrays to frontend
      res.json({ users: `${usernames}`, pwords: `${passwords}` });
    }
  });
};
