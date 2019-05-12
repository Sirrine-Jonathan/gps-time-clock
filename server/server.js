const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const index = require("./routes/index");
const users = require("./routes/users");

const app = express();
const port = 3000;
app.listen(port, function(){
    console.log("Server running on port", port);
});

// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// routes
app.use("/", index);
app.use("/api", users);

