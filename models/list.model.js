// Import mongoose
const mongoose = require("mongoose");

// Create schema for database entries (each document in db represents a list item)
let listSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
});

// module.exports makes the model available outside of your module
module.exports = mongoose.model("lists", listSchema);
