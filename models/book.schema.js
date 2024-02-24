import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  isAuctioned: {
    type: Boolean,
    default: false,
  },
  auctionStartDate: {
    type: Date,
  },
  auctionEndDate: {
    type: Date,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export const Book = mongoose.model("Book", bookSchema);
