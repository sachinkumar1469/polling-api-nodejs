const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    value:{
        type:String,
        required:true
    },
    vote:{
        type:Number,
        required:true,
        default:0
    },
    questionId:{
        type:Schema.Types.ObjectId,
        ref:"question"
    }
});

const Options = mongoose.model("options",optionSchema);

module.exports = Options;