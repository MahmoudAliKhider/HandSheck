const mongoose = require("mongoose");
const product = require("../models/product-model");
const fakerProductsData = require("./seed");
const connectToDb = async () => {
  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DataBase");
    })
    .catch((err) => {
      console.log(err);
    });
};

const seeding = async () => {
  await product.deleteMany({});
  await product.insertMany(fakerProductsData);
};

seeding().then(() => {
  mongoose.connection.close;
});

module.exports = connectToDb;
