const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getAllThoughts);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought);

module.exports = router;
