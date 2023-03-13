const { faker } = require("@faker-js/faker");
function generateFakerProducts() {
    const products = [];
    for (var f = 1; f <= 1000; f++) {
      products.push({
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        imgUrl: faker.image.image(),
        category: faker.commerce.department(),
        price: faker.commerce.price(),
      });
    }
    return products;
  }
module.exports = generateFakerProducts();