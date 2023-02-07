const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    options:[
        {
            type:Schema.Types.ObjectId,
            ref:"options"
        }
    ]
},{
    timestamps:true
})

const Question = mongoose.model("question",questionSchema);

module.exports = Question;