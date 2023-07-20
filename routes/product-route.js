const express = require("express");
const router = express.Router();

const {
	getAllProducts,
	getSingleProductDetails,
	updateProduct,
  deleteProduct,
  createProduct,
  createProductWithImage
} = require("../controllers/productsCtrl");

router.route("/").get(getAllProducts);
router.route('/add').post(createProduct);
router.route('/add-with-image').post(createProductWithImage);

router
  .route("/:id")
  .get(getSingleProductDetails)
  .patch(updateProduct)
  .delete(deleteProduct);


module.exports = router;
