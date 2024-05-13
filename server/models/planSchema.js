import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    // 100 for free and 200 for paid
    planType: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      enum: [100, 200],
      default: "free",
    },
    //
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    durationType: {
      type: String,
      enum: ["months", "years"],
      default: "months",
    },
    maxTeam: {
      type: Number,
      default: 2,
    },
    // 0 for unpaid and 500 for paid
    amount: {
      type: Number,
      required: true,
      enum: [0, 500],
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
