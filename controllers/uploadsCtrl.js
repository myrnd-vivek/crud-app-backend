const path = require("path");
const asyncWrapper = require("../middleware/async-wrapper");

const uploadProductImage = asyncWrapper(async (req, res) => {
	const productImage = req.files.image;
	const imagePath = path.join(
		__dirname,
		"../public/uploads/" + `${productImage.name}`
	);
	await productImage.mv(imagePath);
	res.status(200).json({ image: { src: `/uploads/${productImage.name}` } });
});

module.exports = uploadProductImage;
