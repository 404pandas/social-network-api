const { User } = require("../models");

const userControllers = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const userData = await User.find().select("-__v");

      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get single user
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!userData) {
        return res
          .status(404)
          .json({ message: "No user with this id! Try again!" });
      }

      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userControllers;
