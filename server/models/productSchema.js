const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  image: { type: "String", required: true },
  desc: { type: "String" },
  Qte: { type: "Number", required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});
module.exports = mongoose.model("product", productSchema);
