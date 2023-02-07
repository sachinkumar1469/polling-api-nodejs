const Question = require("../models/question-model");
const Options = require("../models/options-model");

exports.addVote = (req,res,next)=>{
    console.log(req.params.optionNo);
    Question.findById(req.params.questionId).
    then(ques=>{
        // console.log(ques);
        const optionId = ques.options[req.params.optionNo-1];
        // console.log(optionId);
        Options.findByIdAndUpdate(optionId,{
            $inc:{
                vote:1
            }
        },{
            new:true
        })
        .then(updatedOption=>{
            res.status(200).json({
                "option":updatedOption
            })
        })
        .catch(err=>{
            res.status(400).json({
                meesage:err.toString()
            })
        })
        
    })
    .catch(err=>{
        // console.log("here");
        // console.log(err);
        res.status(400).json({
            meesage:err.toString()
        })
    })
}

exports.deleteOption = (req,res,next)=>{
    // console.log(req.params);
    Question.findById(req.params.questionId)
    .then(question=>{
        // console.log(question);
        const optionId = question.options.splice(req.params.optionNo-1,1);
        question.save()
        .then(savedQuestion=>{
            return Options.findByIdAndDelete(optionId)
        })
        .then(deletedOption=>{
            console.log(deletedOption);
            return res.status(200).json({
                msg:"Deleted"
            })
        })
        .catch(err=>{
            res.status(400).json({
                message:err.toString()
            })
        })
        // console.log(optionId);
    })
    .catch(err=>{
        res.status(400).json({
            message:err.toString()
        })
    })
}

exports.deleteQuestion = (req,res,next)=>{
    Question.findByIdAndDelete(req.params.questionId)
    .then(result=>{
        const optionList = result.options;
        Options.deleteMany({
            _id:{
                $in:optionList
            }
        })
        .then(deletedOption=>{
            console.log(deletedOption);
            res.status(200).json({
                deleted:deletedOption.acknowledged
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json({
                message:err.toString()
            })
        })
    })
    .catch(err=>{
        res.status(400).json({
            message:err.toString()
        })
    })
}

exports.getQuestion = (req,res,next)=>{
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
}

exports.postQuestion = (req,res,next)=>{
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
}