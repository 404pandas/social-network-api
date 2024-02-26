const { User } = require("../models");

const userControllers = {
  // gets all users
  // Tested successfully in Insomnia 2/26/2023 11:56 AM
  async getAllUsers(req, res) {
    try {
      const userData = await User.find().select("-__v");

      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // gets single user
  // Tested successfully in Insomnia 2/26/2023 11:57 AM
  async getSingleUser(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Creates user
  // Tested successfully in Insomnia 2/26/2023 11:58 AM
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Adds friend to user
  // Tested successfully in Insomnia 2/26/2023 11:59 AM
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Removes friend from user
  // Tested successfully in Insomnia 2/26/2023 12:00 PM
  async removeFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // updates User
  // Tested successfully in Insomnia 2/26/2023 12:01 PM
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // deletes User
  // Tested successfully in Insomnia 2/26/2023 12:01 PM
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      // BONUS: get ids of user's `thoughts` and delete them all
      await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userControllers;
