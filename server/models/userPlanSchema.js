import mongoose from "mongoose";

const userPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    planType: {
      type: Number,
      required: true,
      trim: true,
      enum: [100, 200],
      default: "free",
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    //need to store multiple payment details
    paymentDate: {
      type: [Date],
    },
    //need to store multiple payment amount details
    paymentAmount: {
      type: [Number],
    },
    //need to store multiple payment gateway details
    paymentGateway: {
      type: String,
    },
    //need to store multiple payment id details
    paymentId: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
