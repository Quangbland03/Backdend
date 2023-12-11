var express = require('express');
const ProductModel = require('../models/Product');
const CategoryModel = require('../models/Category');
var router = express.Router();
/* GET home page. */
router.get('/', async (req, res) => {
var products = await ProductModel.find({}).populate('category');
res.send(products);
})

router.get('/detail/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id).populate('category');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.send( product); // Assuming your view is named 'detail' inside the 'product' folder
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/productss', async (req, res) => {
  const { page = 1, limit = 2 } = req.query;

  try {
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      populate: 'category',
    };

    const products = await ProductModel.paginate({}, options);

    const response = {
      pagination: {
        total: products.totalDocs,
        per_page: products.limit,
        current_page: products.page,
        last_page: products.totalPages,
        from: products.offset + 1,
        to: products.offset + products.docs.length,
      },
      data: products.docs,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
