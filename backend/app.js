const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const Size = require("./models/size");
const body = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

mongoose
  .connect(
    "mongodb+srv://navekedem:nave12345@fits-you-db-qumam.mongodb.net/test?retryWrites=true"
  )
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch(() => {
    console.log("DataBase Connection failed");
  });
app.use(body.json());
app.use(body.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/api/signup", (req, res, next) => {
  const user = new User({
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password
  });
  user
    .save()
    .then(() => {
      res.status(201).json({
        message: "User added"
      });
    })
    .catch(() => {
      res.status(501).json({
        message: "The User not valid"
      });
    });
});

app.post("/api/login", (req, res, next) => {
  let userLogged;

  User.findOne({ email: req.body.email }).then(fetchUser => {
    userLogged = fetchUser;

    Size.findOne({ userId: userLogged._id }).then(userSize => {
      if (!userLogged) {
        return res.status(401).json({
          message: "User Not Valid"
        });
      }
      const token = jwt.sign({id: userLogged._id} , "The-winter-is-coming" , {expiresIn: "1h"});
      return res.status(200).json({
        user: userLogged,
        message: "User Valid",
        size: userSize,
        userToken: token,
        expiresIn: 3600
      });
    });
  });
});

app.post("/api/addsize", (req, res, next) => {
  const size = new Size({
    userId: req.body.userId,
    height: req.body.height,
    weight: req.body.weight,
    legsLength: req.body.legsLength,
    hipLine: req.body.hipLine,
    shirtLength: req.body.shirtLength,
    bust: req.body.bust,
    shoulder: req.body.shoulder,
    sleeves: req.body.sleeves
  });

  size.save().then(()=> {
      res.status(201).json({
        message: "Size Added sucsesfully"
      })
  });
});


app.put("/api/editsize/:id", (req,res,next) => {
  const sizeId = req.params.id;
  const size = new Size({
    _id: sizeId,
    userId: req.body.userId,
    height: req.body.height,
    weight: req.body.weight,
    legsLength: req.body.legsLength,
    hipLine: req.body.hipLine,
    shirtLength: req.body.shirtLength,
    bust: req.body.bust,
    shoulder: req.body.shoulder,
    sleeves: req.body.sleeves
  });
  console.log(size);
  Size.updateOne(({_id: sizeId}), size).then(()=> {
  return res.status(200).json({
    message: "User size is updated"
  });
 })
})

app.get("/api/mysize/:id", (req, res, next) => {

  const userId = req.params.id;

  Size.findOne({ userId: userId }).then(userSize => {

    if (!userSize) {
      return res.status(401).json({
        message: "User size not found",
        size: null
      });
    }
    return res.status(200).json({
      message: "User size found",
      size: userSize
    });

  }).catch(err => {
    res.status(500).json({
      message: "user size search failed"
    })
  });
});


app.get("api/shirtsize/:id" , (req,res,next) => {

});

module.exports = app;
