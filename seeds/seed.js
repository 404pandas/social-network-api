const mongoose = require("mongoose");

const { User, Thought } = require("../models");
const seedUsers = require("./user-seeds");
const seedThoughts = require("./thought-seeds");

mongoose
  .connect("mongodb://127.0.0.1:27017/social-media-backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to DB open");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  await User.deleteMany({});
  console.log("Users deleted");
  await User.insertMany(seedUsers);
  console.log("Users seeded");
  await Thought.deleteMany({});
  console.log("Thoughts deleted");
  await Thought.insertMany(seedThoughts);
  console.log("Thoughts seeded");
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Connection to DB closed");
});
