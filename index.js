// Import required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Use bodyparser to send data in the body of HTTP requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Serve static files from the "frontend/build" directory
app.use(express.static(path.resolve(__dirname, "frontend/build")));

// Load environment variables from the .env file
dotenv.config({ path: ".env" });

// Import routes
require("./routes/display.js")(app);
require("./routes/add.js")(app);
require("./routes/delete.js")(app);
require("./routes/login.js")(app);
require("./routes/getLogins.js")(app);
require("./routes/register.js")(app);
require("./routes/resource.js")(app);

// Handle 404 errors and forward them to the error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose.Promise = global.Promise;

// Initial connection to the database and error handling if the initial connection fails
mongoose
  .connect(
    process.env.MONGODB_URI ||
    `mongodb+srv://oyeboadepraise:Oyeboade@crud.rreeeqs.mongodb.net/toDoList?retryWrites=true&w=majority`
  )
  .catch((error) =>
    console.log("Failed to establish initial connection to the database. Error is: " + error)
  );

// Log a success message if the connection to the database is successful
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// Error handling if the connection to the database fails after an initially successful connection
mongoose.connection.on("error", (error) => {
  if (error) {
    console.log("An error occurred after the initial connection to the database: " + error);
  } else {
    console.log("Connection Established");
  }
});

// Serve the React app for all remaining requests to handle routing
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "frontend/build", "index.html"));
});

// Set the port number
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
