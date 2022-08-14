const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { hashSync, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.CreateUser = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: hashSync(req.body.password, 10),
    });

    if (user) {
      await user.save();
      return res
        .status(StatusCodes.CREATED)
        .send({ data: user, msg: "Successfully Created" });
    }
    return res
      .status(400)
      .send("Something Went wrong!");
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

module.exports.LoginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const isLoggedin = await compare(req.body.password, user.password);
      if (isLoggedin) {
        const payload = {
          username: user.username,
          id: user._id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return res
          .status(StatusCodes.OK)
          .send({ msg: "Successfully Logged In", token: token });
      }
      return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
    }

    return res.status(StatusCodes.NOT_FOUND).send("User Not Found!");
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ msg: "INTERNAL SERVER ERROR", error: error.message });
  }
};

module.exports.Profile = (req, res) => {
  try {
    const { username, _id } = req.user;
    res
      .status(StatusCodes.OK)
      .send({ msg: "Success", data: { username, _id } });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message, msg: "INTERNAL SERVER ERROR" });
  }
};
