import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

// @desc    Get category products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
   const products = await Product.find({ ...keyword, user: req.user._id });
 res.status(200).json(products);
});

// @desc    Get product
// @route   GET /api/products/:id
// @access  Private
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
};

// @desc    Create category product
// @route   POST /api/products/
// @access  Private
const addProduct = async (req, res) => {
  const { name, note, image, category } = req.body;
  const product = await Product.create({
    name,
    note,
    image,
    category,
    user: req.user.id,
  });

  res.status(200).json({ product });
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

export { addProduct, getProducts, getProduct, deleteProduct };
