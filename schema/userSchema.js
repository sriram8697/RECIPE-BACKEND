const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String,
      required: [true, "Name is required"]
    },
    email: { type: String,
      required: [true, "Email is required"] },
    password: { type: String,
      required: [true, "Password is required"] },
    role: {
      type:String,
      enum: ["admin", "user"],
      required: [true, "Role is required"]
    }
  },
  {
    collection: "Users",
  }
);
module.exports = mongoose.model("Users", userSchema);