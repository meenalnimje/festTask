const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  desc: {
    type: String,
    require: true,
    unique: true,
  },
  date: {
    type: Date,
    require: true,
    unique: true,
  },
});
module.exports = mongoose.model("event", eventSchema);
