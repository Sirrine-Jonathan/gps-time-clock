const express = require("express");
const router = express.Router();
const ADMIN = 'admin';
const ADMIN_PWD = 'admin123';
const mongoClient = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// here is where we will handle any database call
const uri = 'mongodb+srv://admin:admin123@gps-time-afto7.mongodb.net/test?retryWrites=true';

router.post("/authenticate/", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
})

router.get('/hello', function(req, res, next){
   res.send("Hello World");
})

router.post("/authenticate/", function(req, res, next){
    console.log(req.body);
    var username = req.body.username.toString();
    var password = req.body.password.toString();

    mongoClient.connect(uri, { useNewUrlParser: true },function(err, client){
        if(err) {
            throw err;
        }
        const collection = client.db("usersDb").collection("userInformation");
        // find the entry
        collection.findOne({"username": username}, (error, user) => {
            if (error) {
                return res.status(400).send(error);
            }
            if (!user)
                return res.send(false);
            if (!bcrypt.compareSync(password, user.password))
                return res.status(400).send(false);
            res.send(user._id);
        });
        client.close();
    });
});

router.post("/addUser", function(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const company = req.body.company;

    // hash the password
    const password = bcrypt.hashSync(req.body.password, saltRounds);

    const myObject = { username, password, email, company};

    // connect to atlas
    mongoClient.connect(uri, { useNewUrlParser: true }, function(err, client){
        if(err) throw err;
        const collection = client.db("usersDb").collection("userInformation");
        // insert
        collection.insertOne(myObject, function(error, result){
            if (error) throw error;
            console.log("added the user");
            res.send(result.insertedId);
        });
        client.close();
    });
});

router.post("/addPunchIn", function(req, res) {
    const time = req.body.time;
    const location = req.body.location;
    const id = req.body.id;
    const ObjectId = mongoose.Types.ObjectId,
        timeClock = [
            {
                "_id": new ObjectId(id),
                "time": time,
                "location": location
            }
        ];

    // connect to atlas
    mongoClient.connect(uri, { useNewUrlParser: true }, function(err, client){
        if(err) throw err;
        const collection = client.db("usersDb").collection("userInformation");
        collection.insertOne(timeClock, function(error, docs){
            if (error) throw error;
            res.send("success");
        });
        client.close();
    });
});


module.exports = router;