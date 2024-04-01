const CartProducts = require("../../models/cartModal");
const WishListModal = require("../../models/wishListModal");
const User = require("../../models/userModal");
const {errorResponse, successResponse} = require("../../helper/responseHelper");
const {
	Types: {ObjectId},
} = require("mongoose");
const {mongoose} = require("mongoose");
const Products = require("../../models/productModal");

// * HANDLE ADD TO CART

const handleAddToCart = async (req, res) => {
	try {
		const {userId, productId, quantity} = req.body;
		const product = await CartProducts.findOne({
			$and: [
				{
					productId: {
						$eq: productId,
					},
				},
				{
					userId: {
						$eq: userId,
					},
				},
			],
		});
		if (product) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Product already exists in cart",
			});
		}

		const addToCart = await CartProducts.create({
			userId,
			productId,
			quantity,
		});

		if (!addToCart) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Failed add to cart",
			});
		}

		return successResponse(res, {
			statusCode: 201,
			message: "Successfully add to cart",
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

// * HANDLE TOTAL CART PRODUCTS
const handleTotalCartProducts = async (req, res) => {
	try {
		const {userId} = req.body;

		if (!userId) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Please login first",
			});
		}

		const totalCartProduct = await CartProducts.countDocuments({
			userId: userId,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Total Cart Products",
			payload: totalCartProduct,
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

// * HANDLE GET CART PRODUCTS

const handleGetCartProducts = async (req, res) => {
	try {
		const {userId} = req.params;
		const engineerCommission = 5;

		if (!ObjectId.isValid(userId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid user id",
			});
		}

		const cartProducts = await CartProducts.aggregate([
			{
				$match: {
					userId: {
						$eq: new ObjectId(userId),
					},
				},
			},
			{
				$lookup: {
					from: "products",
					localField: "productId",
					foreignField: "_id",
					as: "products",
				},
			},
		]);

		if (!cartProducts) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No cart products found",
			});
		}

		let calculatePrice = 0;
		let cartProductCount = 0;
		let buyProductItem = 0;
		const outOfStockProducts = cartProducts.filter((product) => product.products[0].stock < product.quantity);

		for (let i = 0; i < outOfStockProducts.length; i++) {
			cartProductCount = cartProductCount + outOfStockProducts[i].quantity;
		}

		const stockProduct = cartProducts.filter((product) => product.products[0].stock >= product.quantity);

		for (let i = 0; i < stockProduct.length; i++) {
			const {quantity} = stockProduct[i];
			cartProductCount = cartProductCount + quantity;
			buyProductItem = buyProductItem + quantity;
			const {price, discount} = stockProduct[i].products[0];

			if (discount !== 0) {
				// calculatePrice += Math.floor((price * (100 - discount)) / 100) * quantity;
				calculatePrice = calculatePrice + (price - Math.floor((price * discount) / 100)) * quantity;
			} else {
				// calculatePrice += price * quantity;
				calculatePrice = calculatePrice + price * quantity;
			}
		}

		let sellerProducts = [];
		let uniqueSellerId = [...new Set(stockProduct.map((product) => product.products[0].sellerId.toString()))];

		for (let i = 0; i < uniqueSellerId.length; i++) {
			let price = 0;
			for (let j = 0; j < stockProduct.length; j++) {
				const tempProduct = stockProduct[j].products[0];
				if (uniqueSellerId[i] === stockProduct[j].products[0].sellerId.toString()) {
					let tempPrice = 0;
					if (tempProduct.discount !== 0) {
						tempPrice = tempProduct.price - Math.floor((tempProduct.price * (100 - tempProduct.discount)) / 100);
					} else {
						tempPrice = tempProduct.price;
					}

					//  ! Website engineer commission
					tempPrice = tempPrice - Math.floor((tempPrice * engineerCommission) / 100);
					price = price + tempPrice * stockProduct[j].quantity;

					sellerProducts[i] = {
						sellerId: uniqueSellerId[i],
						shopName: tempProduct.shopName,
						price,
						products: sellerProducts[i]
							? [
									...sellerProducts[i].products,
									{
										cartId: stockProduct[j]._id, // * cart product id
										quantity: stockProduct[j].quantity,
										productInfo: tempProduct,
									},
								]
							: [
									{
										cartId: stockProduct[j]._id,
										quantity: stockProduct[j].quantity,
										productInfo: tempProduct,
									},
								],
					};
				}
			}
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Cart Products",
			payload: {
				cartProducts: sellerProducts,
				price: calculatePrice,
				cartProductCount,
				shippingFee: 85 * sellerProducts.length,
				outOfStockProducts,
				buyProductItem,
			},
		});
	} catch (e) {
		if (e instanceof mongoose.Error) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid item id",
			});
		}
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

// * HANDLE DELETE CART PRODUCT
const handleDeleteCartProduct = async (req, res) => {
	try {
		const {cartId} = req.params;

		if (!ObjectId.isValid(cartId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid cart id",
			});
		}

		if (!cartId) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Cart id is required",
			});
		}

		const deleteCartProduct = await CartProducts.findByIdAndDelete(cartId);

		if (!deleteCartProduct) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Cart product not found",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Deleted successfully",
		});
	} catch (e) {
		console.log(e.message);
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

// * HANDLE QUANTITY INCREMENT

const handleQuantityIncrement = async (req, res) => {
	try {
		const {cartId} = req.params;

		if (!ObjectId.isValid(cartId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid cart id",
			});
		}

		if (!cartId) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Cart id is required",
			});
		}

		const cartProduct = await CartProducts.findById(cartId);
		if (!cartProduct) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Cart product not found",
			});
		}
		const {quantity} = cartProduct;

		const incrementQuantity = await CartProducts.findByIdAndUpdate(
			cartId,
			{
				quantity: quantity + 1,
			},
			{
				new: true,
			},
		);

		if (!incrementQuantity) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Failed to increment quantity",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Increment successfully",
			payload: incrementQuantity,
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

// * HANDLE QUANTITY DECREMENT
const handleQuantityDecrement = async (req, res) => {
	try {
		const {cartId} = req.params;

		if (!ObjectId.isValid(cartId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid cart id",
			});
		}

		if (!cartId) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Cart id is required",
			});
		}

		const cartProduct = await CartProducts.findById(cartId);
		if (!cartProduct) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Cart product not found",
			});
		}
		const {quantity} = cartProduct;

		let decrementQuantity;

		if (quantity >= 0) {
			decrementQuantity = await CartProducts.findByIdAndUpdate(
				cartId,
				{
					quantity: quantity - 1,
				},
				{
					new: true,
				},
			);
		}

		if (!decrementQuantity) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Failed to decrement quantity",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Decrement successfully",
			payload: decrementQuantity,
		});
	} catch (e) {
		return errorResponse(res, {
			statusCode: 500,
			message: "Internal Server Error",
		});
	}
};

// * HANDLE ADD TO WISHLIST || POST || /api/frontend/product/add-to-wishlist
const handleAddToWishList = async (req, res) => {
	try {
		const {userId, productId, name, slug, price, image, ratting, discount} = req.body;
		const wishList = await WishListModal.findOne({
			$and: [
				{
					productId: {
						$eq: productId,
					},
				},
				{
					userId: {
						$eq: userId,
					},
				},
			],
		});

		if (wishList) {
			return errorResponse(res, {
				statusCode: 404,
				message: "Product already exists in wishlist",
			});
		}

		const addToWishList = await WishListModal.create({
			userId,
			productId,
			name,
			slug,
			price,
			image,
			ratting,
			discount,
		});
		if (!addToWishList) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Failed add to wishlist",
			});
		}

		return successResponse(res, {
			statusCode: 201,
			message: "Successfully add to wishlist",
			payload: addToWishList,
		});
	} catch (e) {
		console.log(e.message, "handleAddToWishList");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

//  * HANDLE GET WISHLIST || POST || /api/frontend/product/get-wishlist
const handleGetWishList = async (req, res) => {
	try {
		const {userId} = req.params;
		if (!ObjectId.isValid(userId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid user id",
			});
		}
		const wishList = await WishListModal.find({userId: userId});
		if (!wishList) {
			return errorResponse(res, {
				statusCode: 404,
				message: "No wishList found",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "WishList",
			payload: {
				wishList,
				wishListCount: wishList.length,
			},
		});
	} catch (e) {
		console.log(e.message, "handleGetWishList");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

// * HANDLE REMOVE WISHLIST || DELETE || /api/frontend/product/remove-wishlist/:wishlistId
const handleRemoveWishList = async (req, res) => {
	try {
		const {wishlistId} = req.params;
		const {userId} = req;
		if (!ObjectId.isValid(wishlistId) || !ObjectId.isValid(userId)) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Invalid id",
			});
		}
		const userExist = await User.exists({_id: userId});
		if (!userExist) {
			return errorResponse(res, {
				statusCode: 404,
				message: "User not found",
			});
		}
		const wishListExist = await WishListModal.exists({_id: wishlistId});

		if (!wishListExist) {
			return errorResponse(res, {
				statusCode: 404,
				message: "WishList not found",
			});
		}

		const removeWishList = await WishListModal.findByIdAndDelete({
			_id: wishlistId,
			userId: userId,
		});

		if (!removeWishList) {
			return errorResponse(res, {
				statusCode: 400,
				message: "Failed to remove wishlist",
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Successfully remove wishlist",
			payload: {
				removeWishListId: removeWishList._id,
			},
		});
	} catch (e) {
		console.log(e.message, "handleRemoveWishList");
		return errorResponse(res, {
			statusCode: 500,
			message: e.message || "Internal Server Error",
		});
	}
};

module.exports = {
	handleAddToCart,
	handleTotalCartProducts,
	handleGetCartProducts,
	handleDeleteCartProduct,
	handleQuantityIncrement,
	handleQuantityDecrement,
	handleAddToWishList,
	handleGetWishList,
	handleRemoveWishList,
};
