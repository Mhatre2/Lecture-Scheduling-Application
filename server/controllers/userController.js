const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      isAdmin,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Invalid Credentials", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Invalid Credentials", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};



module.exports.allInstructors = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.json({ msg: "User id is required " });
    }
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

