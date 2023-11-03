/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */

// Import list model file
const List = require("../models/list.model.js");

// Add new list item to collection
exports.create = function (req, res) {
  let listModel = new List({
    user: req.body.user,
    item: req.body.item,
  });

  // Save new list item to collection
  listModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while adding list item." });
    } else {
      console.log(data);
      res.send({ message: "The item has been added" });
    }
  });
};

// Retrieve all list items
exports.findAll = function (req, res) {
  List.find({}, function (err, list) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving list." });
    } else {
      // Process result by pushing items to an array - separate arrays for list items, usernames and id's
      let listItems = [];
      let listIdArray = [];
      let listUserArray = [];

      list.forEach(function (result) {
        listItems.push(result.item);
      });

      list.forEach(function (result) {
        listUserArray.push(result.user);
      });

      list.forEach(function (result) {
        listIdArray.push(result._id);
      });

      // Send arrays to frontend
      res.json({
        items: `${listItems}`,
        id: `${listIdArray}`,
        user: `${listUserArray}`,
      });

      // End of if statement
    }
  });

  // End of findall function
};

// Delete list item (uses id to delete only one specific item)
exports.deleteListItem = function (req, res) {
  List.findOneAndRemove({ _id: req.body.id }, function (err) {
    if (err) {
      console.log("ERROR: Item NOT removed. " + err);
      res.send({ message: "ERROR: Item NOT removed. " + err });
    }
    res.send({ message: "List item removed." });
  });
};
