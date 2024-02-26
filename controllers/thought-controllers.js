const { Thought, User } = require("../models");

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find().sort({ createdAt: -1 });

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);

      const dbUserData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res
          .status(404)
          .json({ message: "Thought created but no user with this id!" });
      }

      res.json({ message: "Thought successfully created!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thoughtData) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    res.json(thoughtData);

    console.log(err);
    res.status(500).json(err);
  },
};

module.exports = thoughtController;
