const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ScoreSchema =new Schema({
    nickname:{
        type:String,
        required:true,
    },
    placement:{
        type:Number,
        required:true,
    },
    score:{
        type:Number,
        required:true,
    }
});

const Score = mongoose.model('Score', ScoreSchema)
module.exports= Score