const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
