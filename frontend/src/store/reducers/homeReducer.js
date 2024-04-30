import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

//  * getCategories
export const getCategories = createAsyncThunk("home/getCategories", async (_, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get("/frontend/get-categories");
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

//  * GET FEATURE PRODUCTS

export const getFeatureProducts = createAsyncThunk("home/getFeatureProducts", async (_, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get("/frontend/get-featureProducts");
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * GET PRODUCT DETAILS || GET || /api/frontend/get-product/details/:slug
export const getProductDetails = createAsyncThunk("home/getProductDetails", async (slug, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get(`/frontend/get-product/details/${slug}`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * GET CAROUSEL LATEST PRODUCTS
export const getCarouselLatestProducts = createAsyncThunk("home/getCarouselLatestProducts", async (_, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get("/frontend/get-carouselLatestProducts");
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * GET CAROUSEL PRODUCTS

export const getCarouselProducts = createAsyncThunk("home/getCarouselProducts", async (_, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get("/frontend/get-carouselProducts");
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

//  * GET PRICE RANGE PRODUCT : LOW AND HIGH

export const getPriceRange = createAsyncThunk("home/getPriceRange", async (_, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get("/frontend/get-priceRange");
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// *  Query Product
export const getQueryProducts = createAsyncThunk("home/getQueryProducts", async (query, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get(
			`/frontend/get-queryProducts?category=${query.category ? query.category : ""}&&ratting=${query.ratting ? query.ratting : ""}&&lowPrice=${query.low ? query.low : ""}&&highPrice=${query.high ? query.high : ""}&&sortPrice=${query.sortPrice ? query.sortPrice : ""}&&pageNumber=${query.pageNumber ? query.pageNumber : ""}&&parPage=${query.parPage ? query.parPage : ""}&&search=${query.search ? query.search : ""}`,
		);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * SUBMIT USER REVIEW || POST || /api/frontend/submit-user-review
export const submitUserReview = createAsyncThunk("home/submitUserReview", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post("/frontend/submit-user-review", info);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

// * GET PRODUCT REVIEWS || GET || /api/frontend/get-product-reviews/:productId
export const getProductReviews = createAsyncThunk("home/getProductReviews", async ({productId, pageNumber, limit}, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get(`/frontend/get-product-reviews/${productId}?pageNumber=${pageNumber || 1}&&limit=${limit || 5}`);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

//  * GET BANNERS || GET || /api/frontend/banner/get-banner

export const getBanners = createAsyncThunk("home/getBanners", async (_, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.get("/frontend/banner/get-banner");
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

export const homeReducer = createSlice({
	name: "home",
	initialState: {
		loading: false,
		errorMessage: "",
		successMessage: "",
		categories: [],
		featureProducts: [],
		latestProducts: [],
		topRatedProducts: [],
		discountProducts: [],
		priceRange: {low: 50, high: 100},
		products: [],
		pagination: {},
		// 	 *
		product: {},
		relatedProducts: [],
		moreProducts: [],

		// 	* submitUserReview
		submitSuccessMessage: "",
		submitErrorMessage: "",

		// 	* getProductReviews
		reviews: [],
		ratings: [],
		reviewPagination: {},

		// 	* BANNER
		banners: [],
	},
	reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
			state.submitSuccessMessage = "";
			state.submitErrorMessage = "";
		},
	},
	extraReducers: (builder) => {
		// ! getCategories
		builder.addCase(getCategories.fulfilled, (state, {payload}) => {
			state.categories = payload.payload;
			state.loading = false;
		});
		builder.addCase(getCategories.rejected, (state, {payload}) => {
			state.loading = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getCategories.pending, (state, _) => {
			state.loading = true;
		});
		// ! GET FEATURE PRODUCTS
		builder.addCase(getFeatureProducts.fulfilled, (state, {payload}) => {
			state.featureProducts = payload.payload;
			state.loading = false;
		});
		builder.addCase(getFeatureProducts.rejected, (state, {payload}) => {
			state.loading = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getFeatureProducts.pending, (state, _) => {
			state.loading = true;
		});
		// ! GET CAROUSEL LATEST PRODUCTS
		builder.addCase(getCarouselLatestProducts.fulfilled, (state, {payload}) => {
			state.loading = false;
			state.latestProducts = payload.payload;
		});
		builder.addCase(getCarouselLatestProducts.rejected, (state, {payload}) => {
			state.loading = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getCarouselLatestProducts.pending, (state, _) => {
			state.loading = true;
		});

		// ! GET CAROUSEL PRODUCTS
		builder.addCase(getCarouselProducts.fulfilled, (state, {payload}) => {
			state.loading = false;
			state.topRatedProducts = payload.payload.topRatedProducts;
			state.discountProducts = payload.payload.discountProducts;
			state.successMessage = payload.message;
		});
		builder.addCase(getCarouselProducts.rejected, (state, {payload}) => {
			state.loading = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getCarouselProducts.pending, (state, _) => {
			state.loading = true;
		});
		//   ! GET PRICE RANGE PRODUCT : LOW AND HIGH
		builder.addCase(getPriceRange.fulfilled, (state, {payload}) => {
			state.priceRange = payload.payload;
			state.loading = false;
		});
		builder.addCase(getPriceRange.rejected, (state, {payload}) => {
			state.loading = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getPriceRange.pending, (state, _) => {
			state.loading = true;
		});

		//    *  Query Product

		builder.addCase(getQueryProducts.fulfilled, (state, {payload}) => {
			state.loading = false;
			state.products = payload.payload.products;
			state.pagination = payload.payload.pagination;
		});
		builder.addCase(getQueryProducts.rejected, (state, {payload}) => {
			state.loading = false;
			state.errorMessage = payload.message;
			state.products = [];
			state.pagination = {};
		});
		builder.addCase(getQueryProducts.pending, (state, _) => {
			state.loading = true;
		});

		// 	* GET PRODUCT DETAILS
		builder.addCase(getProductDetails.fulfilled, (state, {payload}) => {
			state.loading = false;
			state.product = payload.payload.product;
			state.relatedProducts = payload.payload.relatedProducts;
			state.moreProducts = payload.payload.moreProducts;
		});
		builder.addCase(getProductDetails.rejected, (state, {payload}) => {
			state.loading = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getProductDetails.pending, (state, _) => {
			state.loading = true;
		});

		// 	* SUBMIT USER REVIEW
		builder.addCase(submitUserReview.fulfilled, (state, {payload}) => {
			state.loading = false;
			state.submitSuccessMessage = payload.message;
		});
		builder.addCase(submitUserReview.rejected, (state, {payload}) => {
			state.loading = false;
			state.submitErrorMessage = payload.message;
		});
		builder.addCase(submitUserReview.pending, (state, {payload}) => {
			state.loading = true;
		});

		// 	* GET PRODUCT REVIEWS
		builder.addCase(getProductReviews.fulfilled, (state, {payload}) => {
			state.loading = false;
			state.reviews = payload.payload.reviews;
			state.ratings = payload.payload.ratings;
			state.reviewPagination = payload.payload.pagination;
		});
		builder.addCase(getProductReviews.rejected, (state, {payload}) => {
			state.loading = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getProductReviews.pending, (state, {payload}) => {
			state.loading = true;
		});

		// 	* GET BANNERS
		builder.addCase(getBanners.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.banners = payload.payload;
		});
		builder.addCase(getBanners.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getBanners.pending, (state, {payload}) => {
			state.loader = true;
		});
	},
});

export const {messageClear} = homeReducer.actions;
export default homeReducer.reducer;
