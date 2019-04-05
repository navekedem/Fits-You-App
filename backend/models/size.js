const mongoose = require('mongoose');


const sizeSechma = mongoose.Schema({
  userId:{type: String , required: true} ,
  height:{type:Number ,required: true},
  weight: {type:Number ,required: true},
  pants = {
    legsLength: {type:Number ,required: true},
    hipLine: {type:Number ,required: true},
  },
  shirt = {
    length: {type:Number ,required: true},
    bust: {type:Number ,required: true}
  },
  coat = {
    shoulder: {type:Number ,required: true},
    sleeves: {type:Number ,required: true},
  }
})


module.exports = mongoose.model('Size', sizeSechma);
