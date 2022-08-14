const router = require("express").Router();
const UserRoute = require("./User");

router.use("/user", UserRoute);

module.exports = router;
