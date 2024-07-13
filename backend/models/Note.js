const mongoose=require('mongoose')
const {Schema}= mongoose

const NotesSchema = new Schema({
    //notes ko users se link karne ke liye just like foriegn key in sql
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //ref me user model daal diya kyunki wahi user hai
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
})

const notes = mongoose.model("notes",NotesSchema)
module.exports = notes;