const express = require("express");
const dotenv = require("dotenv");
const { ConnectDB } = require("./db");

const IndexRoute = require("./Routes");
const passport = require("passport");
const app = express();
dotenv.config();
ConnectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./Config/passport");

passport.initialize();

const PORT = process.env.PORT;

app.use("/api/v1", IndexRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
