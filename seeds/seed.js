const mongoose = require("mongoose");

const { User } = require("../models");
const seedUsers = require("./user-seeds");

mongoose
  .connect(
    "mongodb+srv://404pandas:Yennefer212@cluster0.5y0hfyo.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Connection to DB closed");
});
