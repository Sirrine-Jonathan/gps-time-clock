const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;

// here is where we will handle any database call
const uri = "mongodb+srv://admin:admin123@gps-time-afto7.mongodb.net/test?retryWrites=true";
router.get("/users", function(req, res, next){
    mongoClient.connect(uri, { useNewUrlParser: true },function(err, client){
        if(err) {
            throw err;
        }
        const collection = client.db("usersDb").collection("userInformation");
        res.send("Connected to DB");
        client.close();
    });
});

module.exports = router;