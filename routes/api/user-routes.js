const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
} = require("../../controllers/user-controllers");

// endpoint: /api/users
router.route("/").get(getAllUsers);

// endpoint: /api/users/:userId
router.route("/:userId").get(getSingleUser).post(createUser);

module.exports = router;
