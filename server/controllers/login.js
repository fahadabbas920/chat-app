const jwt = require("jsonwebtoken");
const DBUsers = require("../models/users");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  console.log("Hit");
  try {
    const result = await DBUsers.find({ email: req.body.email });
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Incorrect email or password`,
      });
    }
    const isSimilar = await bcrypt.compare(
      req.body.password,
      result[0].password
    );
    console.log(isSimilar);
    if (!isSimilar) {
      return res
        .status(401)
        .json({ success: false, message: `Incorrect email or password` });
    }
    const token = jwt.sign(req.body, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

module.exports = login;
