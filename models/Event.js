const mongoose = require("mongoose");

const eventschema = new mongoose.Schema({
    
    title:{
    type:String,
    required:true
    },

    date:{
    type:Date,
    required:true
    },

    location:{
    type:String,
    required:true
    },

    capacity:{
    type:Number,
    required:true,
    min:1,
    max:1000
    },

    registrations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
{
  timestamps: true 
});

module.exportS=mongoose.model("Events",eventschema);