const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const env = require("dotenv");
env.config();

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const users = await User.findAll({
    where: {
      email: email,
    },
  });

  if (users.length > 0) {
    const retrievedUser = users[0].dataValues;
    bcrypt.compare(password, retrievedUser.password, (error, result) => {
      if (error) {
        return res.status(400).json({
          message: `Server error`,
          error: `something went wrong. Please try again.`,
        });
      }
      if (!result) {
        return res.status(400).json({
          message: `Wrong Password.`,
          error: `The password you entered isn't correct. Please Enter the correct password.`,
        });
      }

      const token = jwt.sign({ _id: retrievedUser.id }, process.env.secret, {
        expiresIn: "1h",
      });
      // res.cookie('token', token, { expire: new Date() + 9999 });
      return res.status(200).json({
        message: `User sign-in successfully`,
        token,
        user: {
          _id: retrievedUser.id,
          firstName: retrievedUser.firstName,
          lastName: retrievedUser.lastName,
          email: retrievedUser.email,
          username: retrievedUser.username,
          createdAt: retrievedUser.createdAt,
        },
      });
    });
  } else {
    return res.status(400).json({
      error: `User doesn't exists with this e-mail. Please enter the correct e-mail.`,
      message: `User doesn't exist.`,
    });
  }
};

const signOut = (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: `User signed-out successfully.` });
  } catch (error) {
    return res.status(400).json({
      message: `Something went wrong.`,
      error: `Couldn't sign-out. Please try again.`,
    });
  }
};

const requiresSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.secret);
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({
      message: `Session Expired`,
      error: `Your session expired. Sign-in again required.`,
    });
  }
};

const hasAuthorization = (req, res, next) => {
  try {
    let authorized =
      req.user && req.body.userId.toString() == req.user._id.toString();
    if (!authorized) {
      return res.status(403).json({
        message: "Authorization error",
        error: `User is not Authorized to do this action.`,
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Authorization error",
      error: `Something went wrong. May be user is not authorized.`,
    });
  }
};

module.exports = { signIn, signOut, requiresSignIn, hasAuthorization };
