// Tracks every stock movement
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    issuanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issuance",
    },
    type: {
      type: String,
      enum: ["Issued", "Returned", "Adjusted", "Added", "Condemned"],
      required: true,
    },
    quantityBefore: Number,
    quantityChange: Number,
    quantityAfter: Number,

    performedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", transactionSchema);
