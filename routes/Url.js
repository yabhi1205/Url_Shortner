const mongoose = require("mongoose");
const UrlSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    random:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model('url',UrlSchema)