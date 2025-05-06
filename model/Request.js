const mongoose = require("mongoose");

const reqSchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory type require"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is require"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      require: [true, "blood quanity is require"],
    },
    email: {
      type: String,
      required: [true, " Email is Required"],
    },
    requestaccept:{
        type:Boolean,
        default:false
    },
    msg:{
        type:String,
        default:"Request is pending"
    },
    requestreject:{
        type:Boolean,
        default:false 
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "organisation is require"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  }, 
  { timestamps: true }
);

module.exports = mongoose.model("Request", reqSchema);