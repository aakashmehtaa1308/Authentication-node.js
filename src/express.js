const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.use("/", (req, res) => {
  res.send(
    `<h1> Hello, From the NODE Backend. How are You ? Hoping for good.<h1>`
  );
});

module.exports = app;
