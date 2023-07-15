const mongoose = require("mongoose");   

const Schema = mongoose.Schema; 

const postSchema = new Schema({
    userId:{
        type: String,
        required: true,
    },
    caption:{
        type: String,
        max: 500,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    comments:{
        type: Array,
        default: [],
    },
    likes:{
        type:Map,
        of:Boolean
    }
    

}, {timestamps: true});

module.exports = mongoose.model("Post", postSchema);