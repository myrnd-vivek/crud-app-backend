const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product-model");
const asyncWrapper = require("../middleware/async-wrapper");

const createProduct = asyncWrapper(async (req, res) => {
	const product = await Product.create(req.body);
	res.status(StatusCodes.CREATED).json(product);
});

const getAllProducts = asyncWrapper(async (req, res) => {
	const result = await Product.find({}).select("name price createAT imageUrl");
	if (result) {
		const newResult = result.map((product) => {
			if (product.imageUrl) {
				return product;
			}
			return {
				...product.toJSON(),
				imageUrl: `http://localhost:4445/images/${product._id}.jpeg`,
			};
		});
		res.status(StatusCodes.OK).json(newResult);
	}
});

const getSingleProductDetails = asyncWrapper(async (req, res) => {
	const { id: productId } = req.params;
	const result = await Product.find({ _id: productId });
	const newResult = result[0];
	if(newResult.imageUrl) {
		res.status(StatusCodes.OK).json(newResult)
	} else {
		res.status(StatusCodes.OK).json({
			...newResult.toJSON(),
			imageUrl: `http://localhost:4445/images/${newResult._id}.jpeg`,
		});
	}
});

const updateProduct = asyncWrapper(async (req, res) => {
	const { id: productId } = req.params;
	const data = {};

	if(!req.body) return;

	if(req.file) {
		const { filename } = req.file;
		const imageUrl = `http://localhost:4445/images/${filename}`;
		data.imageUrl = imageUrl;
	};

	const { name,company,price } = req.body;
	data.name = name;
	data.company = company;
	data.price = price;

	// const product = await Product.findOneAndUpdate(
	// 	{ _id: productId },
	// 	req.body,
	// 	{ new: true }
	// );
	// if (!product) {
	// 	throw new Error(`No product found with id ${productId}`);
	// }
	// res.status(StatusCodes.OK).json(product);

	const product = await Product.findById(productId);
	const output = await product.updateOne(data);
	res.status(StatusCodes.OK).json(output);
});

const deleteProduct = asyncWrapper(async (req, res) => {
	const { id: productId } = req.params;
	const product = await Product.findOneAndRemove({ _id: productId });
	if (!product) {
		throw new Error(`No product found with id ${productId}`);
	}
	res.status(StatusCodes.OK).json({ msg: "Success! Product removed" });
});

const createProductWithImage = asyncWrapper(async (req, res) => {
	const { name, company, price } = req.body;
	const { filename } = req.file;
  const imageUrl = `http://localhost:4445/images/${filename}`;

  const data = {
    name,company,price,imageUrl
  }

	const product = await Product.create(data);
	res.status(StatusCodes.CREATED).json(product);

});

module.exports = {
	getAllProducts,
	getSingleProductDetails,
	updateProduct,
	deleteProduct,
	createProduct,
	createProductWithImage,
};
