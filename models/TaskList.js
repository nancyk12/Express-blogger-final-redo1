//import mongoose library
const mongoose = require("mongoose");
const {Schema} = mongoose;
const { v4: uuidv4 } = require("uuid");

//create a todoSchema 
const todoSchema = new Schema({
    id: { type: String, required:true, default: () => uuidv4 },
    name: {type:String, required:true},
    description: {type: String}, 
    completed: {type: Boolean, default:false},
    dateCreated: {type: Date, default:Date.now, required:true},
    dateCompleted: {type: Date, default: ''},
    status: {type: String, default:"incomplete", enum:["incomplete", "complete", "deferred"]}
   
}); 

/*name - type: string, validation: required
description - type: string
completed - type: boolean, validation: required
dateCreated - type: date, default: Date.now(), validation: required
dateCompleted - type: date
status - type: string, default: 'incomplete', validation: required, enum: ['incomplete', 'complete', 'deferred']
*/

//register model to collection
const listItem = mongoose.model("list_item", todoSchema);

//make our model accessible to outside files 
module.exports = listItem;