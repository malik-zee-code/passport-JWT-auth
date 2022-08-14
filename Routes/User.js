const passport = require("passport");
const { CreateUser, LoginUser, Profile } = require("../Controller/User");
const { validateUser } = require("../Middleware/User");
const router = require("express").Router();

router.post("/register", validateUser, CreateUser);
router.post("/login", LoginUser);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  Profile
);

module.exports = router;
