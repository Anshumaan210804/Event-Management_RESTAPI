const mongoose=require("mongoose");

const userschema=mongoose.Schema({
    Name:{
        type:String,
        required:true,
        min:2,
        max:30
    },
    Email:{
        type:String,
        required:true,
        unique: true,
            match: [/\S+@\S+\.\S+/, "Email is invalid"]
    },
},
{timestamps:true});

module.exports=mongoose.model("User", userschema);