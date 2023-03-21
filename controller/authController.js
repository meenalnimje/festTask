const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { success, error } = require("../utilies/responseWrapper");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // return res.status(400).send("plz enter email/password");
      return res.send(error(400, "plz enter email/password"));
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send(error(409, "user already exits"));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email,
      password: hashPassword,
    });
    // const newUser = await User.findById(usser._id);
    // return res.status(201).json({ user });
    return res.send(success(201, "user created succesfully"));
  } catch (error) {
    console.log(error);
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send(error(400, "plz enter email/password"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.send(error(404, "user is not registered"));
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.send(error(403, "Incorrect password"));
    }
    const accessToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, { accessToken }));
  } catch (error) {
    console.log(error);
  }
};

// logout controller.

const logoutController = async (req, res) => {
  // isme hm cookies ko delete karenge and frontend ke local storage se hm access token delete karenge
  try {
    res.clearCookies("jwt", {
      httpOnly: true,
      secure: true,
    });
    res.send(success(200, "user logged out"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const refreshAccessTokenController = async (req, res) => {
  // now we cannot get refresh token from the body we will get if=t from cookies
  const cookies = req.cookies;
  console.log(cookies.jwt);
  if (!cookies.jwt) {
    return res.send(error(401, "refresh token in cookies is required"));
  }
  const refreshToken = cookies.jwt;
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });
    // return res.status(201).json({ accessToken });
    return res.send(success(201, { accessToken }));
  } catch (e) {
    // return res.status(401).send("Invalid refresh token key");
    return res.send(error(401, "Invalid refresh token key"));
  }
};

// internal functions
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
  logoutController,
};
