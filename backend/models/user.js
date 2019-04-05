const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const userSechma = mongoose.Schema({
  email: {type:String, required: true , unique: true },
  userName: {type: String ,required: true},
  password: {type:String, required: true},

});
userSechma.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSechma);
