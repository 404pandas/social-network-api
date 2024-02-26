const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controllers");

// endpoint: /api/users
router.route("/").get(getUsers).post(createUser);

// endpoint: /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
