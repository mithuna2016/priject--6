const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({

  _id: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type:String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLikes: { type: [String], required: true },
  usersDislikes: { type: [String], required: true },
  

});

module.exports = mongoose.model('Thing', thingSchema);