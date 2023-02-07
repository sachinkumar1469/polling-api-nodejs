const router = require("express").Router();

const {addVote,deleteOption,deleteQuestion,getQuestion,postQuestion} = require('../controller/question-controller');


// To add the vote for a option
router.post("/:questionId/:optionNo",addVote);

// To delete the option for a question
router.delete("/:questionId/:optionNo",deleteOption)

// To delete the question
router.delete("/:questionId",deleteQuestion)

// To get the question details
router.get("/:questionId",getQuestion)

// To post the new question
router.post("/",postQuestion)

module.exports = router;