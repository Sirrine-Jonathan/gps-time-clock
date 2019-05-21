const express = require("express");
const router = express.Router();
const ADMIN = 'admin';
const ADMIN_PWD = 'admin123';
const mongoClient = require("mongodb");

// here is where we will handle any database call
const uri = 'mongodb+srv://admin:admin123@gps-time-afto7.mongodb.net/test?retryWrites=true';


router.post("/authenticate/", function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    mongoClient.connect(uri, { useNewUrlParser: true },function(err, client){
        if(err) {
            throw err;
        }

        const collection = client.db("usersDb").collection("userInformation");
        collection.findOne({"username": username, password}, (error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            if(!result)
                res.send(false);
            else
                res.send(result._id);
        });
        client.close();
    });
});

module.exports = router;