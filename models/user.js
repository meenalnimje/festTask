const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
    unique: true,
  },
  password: {
    require: true,
    type: String,
  },
  event: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
  ],
});
module.exports = mongoose.model("userdata", userSchema);
