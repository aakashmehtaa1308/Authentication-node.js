const bcrypt = require("bcrypt");
const User = require("../models/user");

const signUp = (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  try {
    bcrypt.hash(password, 10, async (error, hash) => {
      if (error) {
        return res.status(400).json({
          error: `user can not be created. Please try again later sometime.`,
          message: "Something went wrong.",
        });
      }
      try {
        const user = User.build({
          first_name: firstName,
          last_name: lastName,
          email,
          password: hash,
          username,
        });
        let createdUser = await user.save();
        createdUser = createdUser.dataValues;
        createdUser.password = undefined;
        return res.status(200).json({
          message: "user created successfully.",
          user: createdUser,
        });
      } catch (err) {
        return res.status(400).json({
          error: `username or email is already used. Please try again with different one.`,
          message: "Something went wrong",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: `user can not be created. Please try again later sometime.`,
      message: "Something went wrong",
    });
  }
};

const getAllUsers = async (req,res,next) => {
  try {
    users = await User.findAll();
    return res.status(200).json({
      "message": "user fetched successfully",
      "users": users
    })
  } catch(err) {
    return res.status(400).json({
      error: `users can be fetched. Please try again later sometime.`,
      message: "Something went wrong",
    });
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const deletedUser = await User.destroy({
      where: {
        id: userId
      }
    });
    res
      .status(200)
      .json({ message: `User deleted successfully.`, user: deletedUser });
  } catch (error) {
    res.status(400).json({
      error: `User can't be deleted. Please try again after sometime.`,
      message: `Something went wrong.`,
    });
  }
};

module.exports = { signUp, getAllUsers, remove };
