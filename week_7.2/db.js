const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userDetails = new Schema({
    name : String,
    username : {type: String, unique: true},
    password : String
})

const todoDetails = new Schema({
    title : String,
    userId : ObjectId,
    done : Boolean
})

const userData = mongoose.model("user" , userDetails);
const todoData = mongoose.model("todo" , todoDetails)

module.exports = {
    userData,
    todoData
}