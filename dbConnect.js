const mongoose = require("mongoose");
module.exports = async () => {
  const mongoURL =
    "mongodb+srv://meenakshi:meenakshi@cluster0.4g5xdvl.mongodb.net/?retryWrites=true&w=majority";
  try {
    const connect = await mongoose.connect(mongoURL);
    console.log(`Mongodb Connected ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};