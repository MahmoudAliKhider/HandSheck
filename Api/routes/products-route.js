const router = require("express").Router();

const products = require("../models/product-model");
const validateObjectId = require("../middlewares/validateObject");

router.get("/:id", validateObjectId, async (req, res) => {
  const product = await products.findById(req.params.id);

  if (!product) return res.status(404);

  return res.status(200).json(product);
});

router.get("/", async (req, res) => {
  let pageNumber = 1;
  let pageSize = 12;
  const query = {};
  var product = await products.find();

  pageNumber =
    req.query.pageNumber == null || req.query.pageNumber < 1
      ? 1
      : +req.query.pageNumber;
  pageSize =
    req.query.pageSize >= 70 || req.query.pageSize == null
      ? 12
      : +req.query.pageSize;

  let totalPages = Math.floor(product.length / pageSize);
  var product = await products.find();
  var i =
    req.query.sortBy == "priceDesc"
      ? -1
      : req.query.sortBy == "priceAsc"
      ? 1
      : "";

  var keyword = req.query.keyword;

  if (keyword) {
    keyword=keyword.trim()
    query.$or = [
      { category: { $regex: keyword, $options: "i" } },
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
    var productSortSearch = await products
      .find(query)
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort({ price: `${i}` });

    if (req.query.sortBy == "Alph" || i == "") {
      productSortSearch = await products
        .find(query)
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize)
        .sort({ title: "desc" });
    }
    var _product = (await products.find(query)).length;
    totalPages = +(_product / pageSize);

    const paginationMetaData = {
      pageSize: pageSize,
      pageNumber: pageNumber,
      totalCount: (await products.find(query)).length,
      totalPages: parseInt(totalPages),
    };

    return res
      .header("X-Pagination", JSON.stringify(paginationMetaData))
      .json(productSortSearch);
  }

  var productSort = await products
    .find()
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    .sort({ price: `${i}` });

  if (req.query.sortBy == "Alph" || i == "") {
    productSort = await products
      .find(query)
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize)
      .sort({ title: "asc" });
  }
  const paginationMetaData = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    totalCount: (await products.find(query)).length,
    totalPages: parseInt(totalPages),
  };
  return res
    .header("X-Pagination", JSON.stringify(paginationMetaData))
    .json(productSort);
});

module.exports = router;
