const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
} = require("../../controllers/user-controllers");

// endpoint: /api/users
router.route("/").get(getAllUsers);

// endpoint: /api/users/:userId
router.route("/:userId").get(getSingleUser);

module.exports = router;
