import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

// * ADD TO CART || POST || /api/frontend/product/add-to-cart
export const addToCart = createAsyncThunk("cart/addToCart", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("frontend/product/add-to-cart", info);

		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * TOTAL CART PRODUCTS || POST || /api/frontend/product/total-cartProducts

export const totalCartProducts = createAsyncThunk("cart/totalCartProducts", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("frontend/product/total-cartProducts", info);

		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * GET CART PRODUCTS || GET || /api/frontend/product/get-cart-products/:userId

export const getCartProducts = createAsyncThunk("cart/getCartProducts", async (userId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get(`frontend/product/get-cart-products/${userId}`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * DELETE CART PRODUCT || DELETE || /api/frontend/product/delete-cartProduct/:cartId
export const deleteCartProduct = createAsyncThunk("cart/deleteCartProduct", async (cartId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.delete(`frontend/product/delete-cartProduct/${cartId}`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * QUANTITY INCREMENT || PUT || /api/frontend/product/quantity-increment/:cartId
export const quantityIncrement = createAsyncThunk("cart/quantityIncrement", async (cartId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.put(`frontend/product/quantity-increment/${cartId}`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * QUANTITY DECREMENT || PUT || /api/frontend/product/quantity-decrement/:cartId
export const quantityDecrement = createAsyncThunk("cart/quantityDecrement", async (cartId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.put(`frontend/product/quantity-decrement/${cartId}`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * ADD TO WISHLIST || POST || /api/frontend/product/add-to-wishlist/
export const addToWishlist = createAsyncThunk("cart/addToWishlist", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("frontend/product/add-to-wishlist", info);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * GET WISHLIST || GET || /api/frontend/product/get-wishlist/:userId
export const getWishList = createAsyncThunk("cart/getWishList", async (userId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get(`frontend/product/get-wishlist/${userId}`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * REMOVE WISHLIST || DELETE || /api/frontend/product/remove-wishlist/:wishlistId
export const removeWishlist = createAsyncThunk("cart/removeWishlist", async (wishlistId, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.delete(`frontend/product/remove-wishlist/${wishlistId}`);
		console.log(data);
		return fulfillWithValue(data);
	} catch (e) {
		console.log(e.response.data());
		return rejectWithValue(e.response.data);
	}
});
export const cartReducer = createSlice({
	name: "cart",
	initialState: {
		loader: false,
		cartProducts: [],
		totalCartProductsCount: 0,
		cartProductCount: 0,
		buyProductItem: 0,
		wishListProducts: [],
		wishListCount: 0,
		price: 0,
		successMessage: "",
		errorMessage: "",
		shippingFee: 0,
		outOfStockProducts: [],
	},
	reducers: {
		messageClear: (state, _) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
		resetCart: (state, _) => {
			state.cartProductCount = 0;
			state.wishListCount = 0;
		},
	},
	extraReducers: (builder) => {
		// * ADD TO CART
		builder.addCase(addToCart.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
			state.loader = false;
		});
		builder.addCase(addToCart.fulfilled, (state, {payload}) => {
			state.successMessage = payload.message;
			state.loader = false;
			// state.totalCartProductsCount = state.totalCartProductsCount + 1
			state.cartProductCount = state.cartProductCount + 1;
		});
		builder.addCase(addToCart.pending, (state, {payload}) => {
			state.loader = true;
		});
		builder.addCase(totalCartProducts.fulfilled, (state, {payload}) => {
			state.totalCartProductsCount = payload.payload;
		});
		builder.addCase(totalCartProducts.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
		});
		// * GET CART PRODUCTS
		builder.addCase(getCartProducts.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.price = payload.payload.price;
			state.cartProducts = payload.payload.cartProducts;
			state.cartProductCount = payload.payload.cartProductCount;
			state.shippingFee = payload.payload.shippingFee;
			state.outOfStockProducts = payload.payload.outOfStockProducts;
			state.buyProductItem = payload.payload.buyProductItem;
		});
		builder.addCase(getCartProducts.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getCartProducts.pending, (state, _) => {
			state.loader = true;
		});

		// * DELETE CART PRODUCT
		builder.addCase(deleteCartProduct.fulfilled, (state, {payload}) => {
			state.successMessage = payload.message;
			state.loader = false;
			state.cartProductCount = state.cartProductCount - 1;
		});
		builder.addCase(deleteCartProduct.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(deleteCartProduct.pending, (state, _) => {
			state.loader = true;
		});

		// * QUANTITY INCREMENT
		builder.addCase(quantityIncrement.fulfilled, (state, {payload}) => {
			state.successMessage = payload.message;
			state.loader = false;
			state.cartProductCount = state.cartProductCount + 1;
		});
		builder.addCase(quantityIncrement.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(quantityIncrement.pending, (state, _) => {
			state.loader = true;
		});

		// * QUANTITY DECREMENT

		builder.addCase(quantityDecrement.fulfilled, (state, {payload}) => {
			state.successMessage = payload.message;
			state.loader = false;
			state.cartProductCount = state.cartProductCount - 1;
		});
		builder.addCase(quantityDecrement.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(quantityDecrement.pending, (state, _) => {
			state.loader = true;
		});

		// 	* ADD To WISHLIST
		builder.addCase(addToWishlist.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
			state.wishListCount = state.wishListCount > 0 ? state.wishListCount + 1 : 1;
		});
		builder.addCase(addToWishlist.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(addToWishlist.pending, (state, _) => {
			state.loader = true;
		});
		// 	* GET WISHLIST
		builder.addCase(getWishList.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.wishListProducts = payload.payload.wishList;
			state.wishListCount = payload.payload.wishListCount;
		});
		builder.addCase(getWishList.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getWishList.pending, (state, _) => {
			state.loader = true;
		});

		// 	* REMOVE WISHLIST
		builder.addCase(removeWishlist.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
			state.wishListCount = state.wishListCount - 1;
			state.wishListProducts = state.wishListProducts.filter((item) => item._id !== payload.payload.removeWishListId);
		});
		builder.addCase(removeWishlist.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(removeWishlist.pending, (state, _) => {
			state.loader = true;
		});
	},
});

export const {messageClear, resetCart} = cartReducer.actions;
export default cartReducer.reducer;
