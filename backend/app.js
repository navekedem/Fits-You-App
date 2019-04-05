const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

const body = require("body-parser");
const app = express();

mongoose
  .connect(
    "mongodb+srv://navekedem:nave12345@fits-you-db-qumam.mongodb.net/test?retryWrites=true"
  )
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch(() => {
    console.log("DataBase connection failed");
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

app.post('/api/signup',(req, res, next) => {
  const user = new User({
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password
  });
  user.save().then(() => {
    res.status(201).json({
      message: "User added"
    })
  }).catch(() =>{
    res.status(501).json({
      message: "The User not valied"
    });
  });
});


app.get()

module.exports = app;
