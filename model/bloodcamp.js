const mongoose = require("mongoose");

const campSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: [true, "Location require"],
     
    },
    date: {
      type: String,
      required:true
       
      
    },
    Time: {
      type: String,
      require: [true, "Timing is require"],
    },
    email: {
      type: String,
      required: [true, "Organiser Email is Required"],
    },
    contact:{
      type:String,
      required:true
    },
    campname:{
      type:String,
      required: [true, "Camp name is Required"],
      unique:true
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "organisation is require"],
    },
    organiser:{
      type:String,
      required: [true, " name is Required"],
    }
    
     
  }, 
  { timestamps: true }
);

module.exports = mongoose.model("Camp", campSchema);