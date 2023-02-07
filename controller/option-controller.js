const Options = require("../models/options-model");
const Question = require("../models/question-model");

exports.postOption = (req,res,next)=>{
    console.log("Here");
    Options.create({
        value:req.body.value,
        questionId:req.params.questionId
    })
    .then(newOption=>{
        Question.findByIdAndUpdate(req.params.questionId,{
            $push:{
                options:newOption._id
            }
        },{
            new:true
        })
        .then(question=>{
            return res.status(200).json({
                question
            })
        })
        .catch(err=>{
            res.status(400).json({
                meesage:"Unable to add option Id in question"
            })
        })
    })
    .catch(err=>{
        // console.log("Error while creating option object");
        // console.log();
        return res.status(400).json({
            message:err.toString()
        })
    })
}