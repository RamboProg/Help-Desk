const mongoose = require("mongoose");
const userModel = require("./userModel");
const schemaOptions = {
  strict: true,
  timestamps: true,
};
const Session = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
 schemaOptions
);

module.exports = mongoose.model("Sessions", Session);
