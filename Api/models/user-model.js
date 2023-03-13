const mongoose = require("mongoose");

const userSchema = mongoose
  .Schema(
    {
      firstName: { type: String },
      lastName: { type: String },
      email: {
        type: String,
        unique: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50,
      },
      phoneNumber: { type: Number },
      password: { type: String, minlength: 5, maxlength: 200 },
      token: { type: String },
      role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timeseries: true }
  )
  .set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

module.exports = mongoose.model("User", userSchema);
