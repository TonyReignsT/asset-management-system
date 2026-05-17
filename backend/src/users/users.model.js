const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    staffNumber: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Issuer", "Officer"],
      default: "Officer",
    },
    canCreateIssuance: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
