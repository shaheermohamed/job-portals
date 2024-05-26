const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists", success: false });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    res.status(201).json({ user, token, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({
          message: "Invalid email or password",
          loggedIn: false,
          user: {},
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({
          message: "Invalid email or password",
          loggedIn: false,
          user: {},
        });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    res.status(200).json({ user, token, loggedIn: true });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error", loggedIn: false, user: {} });
  }
};

exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
      loggedIn: false,
      user: {},
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res
      .status(200)
      .json({ loggedIn: true, message: "User authenticated", user: req.user });
    next();
  } catch (err) {
    res
      .status(400)
      .json({ loggedIn: false, message: "Invalid token.", user: {} });
  }
};
