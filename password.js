const mongoose=require('mongoose');

const passSchema=mongoose.Schema({
    website: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
})

const pass=mongoose.model("passwords",passSchema);
module.exports=pass;