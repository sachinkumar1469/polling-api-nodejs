const router = require("express").Router();
const Question = require("../models/question-model");

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
        res.status()
    })
    console.log(req.body);
})

module.exports = router;