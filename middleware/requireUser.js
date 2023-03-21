const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { success, error } = require("../utilies/responseWrapper");
module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send(error(401, "authorization header is required"));
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req._id = decoded._id;
    const user = await User.findById(req._id);
    if (!user) {
      return res.send(error(404, "user not found"));
    }
    next();
  } catch (e) {
    // return res.status(401).send("Invalid access token key");
    return res.send(error(401, "Invalid access token key"));
  }
};
