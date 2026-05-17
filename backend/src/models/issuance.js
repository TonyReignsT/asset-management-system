// Tracking every issued Item (main book)
const mongoose = require("mongoose");

const issuanceSchema = new mongoose.Schema(
  {
    issuanceRef: {
      type: String,
      uniques: true,
    },
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
    quantityIssued: {
      type: Number,
      default: 1,
    },
    officeUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    issuedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    conditionOnIssue: {
      type: String,
      enum: ["New", "Good", "Fair", "Poor", "Condemned"],
      default: "Good",
    },
    status: {
      type: String,
      enum: ["Pending", "Collected", "Returned", "Cancelled"],
      default: "Pending",
    },
    dateIssued: {
      type: Date,
      default: Date.now,
    },
    dateDueReturn: Date,
    collectedAt: Date,
    signature: String,
    dateReturned: Date,
    returnedAt: Date,
    conditionOnReturn: {
      type: String,
      enum: ["New", "Good", "Fair", "Poor", "Condemned"],
    },
    returnNotes: String,
    receivedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Issuance", issuanceSchema);
