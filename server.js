/* Showing Mongoose's "Populated" Method
 * =============================================== */

// Dependencies
var express = require("express");
var express = require("express-handlebars");
var bodyParser = require("body-parser"); 
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;  

var app = express(); 

var router = express.Router(); 

//require our routes file pass our router object
require("./config/routes")(router);

// Designate our public folder as a static directory
app.use(express.static(__dirname + "/public")); 

// Connect Handlebars to our Express app
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyParser in our app
app.use(bodyParser.urlencoded({
  extended: false
}));

// Have every request go through our router middleware
app.use(router);

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_lbkkp8rs:67jpsg31eq4qjsvias6ndbqo4s@ds129394.mlab.com:29394/heroku_lbkkp8rs");
var db = mongoose.connection;

// Connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});