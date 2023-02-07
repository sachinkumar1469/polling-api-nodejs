const router = require("express").Router();
const Question = require("../models/question-model");

router.get("/:questionId/:optionNo",(req,res,next)=>{
    console.log(req.params.optionNo);
    Question.findById(req.params.questionId).
    then(ques=>{
        console.log(ques);
    })
    .catch(err=>{
        res.status(400).json({
            meesage:err.toString()
        })
    })
})

router.get("/:questionId",(req,res,next)=>{
    Question.findById(req.params.questionId).populate("options")
    .then(result=>{
        return res.status(200).json({
            question:result
        })
    })
    .catch(err=>{
        res.status(400).json({
            meesage:err.toString()
        })
    })
})

router.post("/",(req,res,next)=>{
    Question.create(
        {
            title:req.body.title
        }
    )
    .then(newQuestion=>{
        res.status(200).json({
            question:newQuestion
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(402).json({
            meesage:"Unable to add question"
        })
    })
    // console.log(req.body);
})

module.exports = router;