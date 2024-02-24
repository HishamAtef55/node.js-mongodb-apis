const productModel = require("../models/productModel");

async function create(req, res) {
  try {
    const product = await productModel.create(req.body);
    res.status(200).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function get(req, res) {
  try {
    const products = await productModel.find();
    res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function show(req, res) {
  try {
    const { id } = req.params;
    const products = await productModel.findById(id);
    res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function edit(req, res) {
  try {
    const { id } = req.params;
    console.log(req.body);
    const product = await productModel.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).json({
        message: "Product not found",
        data: [],
      });
    }
    const updatedProduct = await productModel.findById(id);

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({
        message: "Product not found",
        data: [],
      });
    }
    res.status(200).json({
      message: "Product deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function search(req, res) {
  try {
    const name = req.body.name;
    const products = await productModel.find();
    console.log(name, products);
    res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}
module.exports = { create, get, show, edit, remove, search };
