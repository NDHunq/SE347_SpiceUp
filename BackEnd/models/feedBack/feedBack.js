const mongoose = require("mongoose");

//console.log(orderId)
mongoose.set("debug", true);

const SpiceUp = mongoose.connection.useDb("SpiceUp");

const FeedBackSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { discriminatorKey: "type" }
);

const FeedBack = SpiceUp.model("FeedBack", FeedBackSchema);

module.exports = FeedBack;
