const passport = require("passport");
const { CreateUser, LoginUser, Profile } = require("../Controller/User");
const router = require("express").Router();

router.post("/register", CreateUser);
router.post("/login", LoginUser);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  Profile
);

module.exports = router;
