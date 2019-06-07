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

router.get('/hello', function(req, res, next){
   res.send("Hello World");
})

router.post("/authenticate/", function(req, res, next){
   var username = req.body.username.toString();
   var password = req.body.password.toString();

   mongoClient.connect(uri, { useNewUrlParser: true },function(err, client){
         if (err) throw err;

         const collection = client.db("usersDb").collection("userInformation");
         collection.findOne({
            $or: [
               { "username": username },
               { "email": username }
            ]
         }, (error, user) => {
            if (error) {
                return res.status(400).send(error);
            }
            if (!user)
               return res.send(false);
            if (!bcrypt.compareSync(password, user.password))
               return res.status(400).send(false)
            res.send({
               "id": user._id,
               "username": user.username,
               "email": user.email,
               "company": user.company
               "isAdmin": false,
            });
        });
        client.close();
    });
});

router.post("/addUser", function(req, res){
   const username = req.body.username;
   const email = req.body.email;
   const company = req.body.company;
   const password = bcrypt.hashSync(req.body.password, saltRounds);
   let   isAdmin = false;
   let myObject = { username, password, email, company, isAdmin};

   // connect to atlas
   mongoClient.connect(uri, { useNewUrlParser: true }, async (err, client) => {
      if (err) throw err;

      // determine if company already exists
      let companyExists;
      const companyInformation = client.db("userDb").collection("companyInformation");
      await companyInformation.findOne({ "name": company}, (error, company) => {
            if (error) {
                return res.status(400).send(error);
            }
            companyExists = !!company; // the bang! bang! should convert the company object to a boolean 
      });

      // some things need to happen if the company is new
      if (!companyExists){

         // first the new user should be admin
         isAdmin = true;
         myObject = { username, password, email, company, isAdmin };

         // and add the new company to the company collection
         let name = company;
         let anotherObject = { name };
         companyInformation.inserOne(anotherObject, (error, result) => {
            if (error) throw error;
            console.log("added company: " + company);
         })
         
      }

      const userInformation = client.db("usersDb").collection("userInformation");
      userInformation.findOne({
         $or: [
            { "username": username },
            { "email": username }
         ]
      }, (error, user) => {
         if (error) {
             return res.status(400).send(error);
         }
         if (!user){
            userInformation.insertOne(myObject, function(error, result){
               if (error) throw error;
               console.log("added the user");
               res.send(result.insertedId); // can we change this to return a user?
            });
         }
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