const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

module.exports.validateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      next();
    } else {
      return res.status(StatusCodes.CONFLICT).send("User Already Exists");
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ msg: "INTERNAL SERVER ERROR", error: error.message });
  }
};
