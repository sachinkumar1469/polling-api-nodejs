const router = require("express").Router();
const {postOption} = require("../controller/option-controller")

// To post the option for a question
router.post("/:questionId",postOption)

module.exports = router;