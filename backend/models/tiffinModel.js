import mongoose from "mongoose";

const tiffinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["Vegetarian", "Non-Vegetarian", "Both"],
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Tiffin = mongoose.model("Tiffin", tiffinSchema);

export default Tiffin;
