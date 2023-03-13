const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    description: { type: String, required: true, minlength: 3, maxlength: 200 },
    imgUrl: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
  },
  { timeseries: true }
).set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Product", productSchema);
