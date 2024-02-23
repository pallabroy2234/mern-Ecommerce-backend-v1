import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


//  ! getCategories
export const getCategories = createAsyncThunk("home/getCategories",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-categories")
            return fulfillWithValue(data)
        } catch (e) {
            
            return rejectWithValue(e.response.data)
        }
    }
)


//  ! GET FEATURE PRODUCTS

export const getFeatureProducts = createAsyncThunk("home/getFeatureProducts",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-featureProducts")
            return fulfillWithValue(data)
        } catch (e) {
            
            return rejectWithValue(e.response.data)
        }
    }
)


// ! GET CAROUSEL LATEST PRODUCTS


export const getCarouselLatestProducts = createAsyncThunk("home/getCarouselLatestProducts",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-carouselLatestProducts")
            return fulfillWithValue(data)
        } catch (e) {
            
            return rejectWithValue(e.response.data)
        }
    }
)


// ! GET CAROUSEL PRODUCTS

export const getCarouselProducts = createAsyncThunk("home/getCarouselProducts",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-carouselProducts")
            return fulfillWithValue(data)
        } catch (e) {
            
            return rejectWithValue(e.response.data)
        }
    }
)


//  ! GET PRICE RANGE PRODUCT : LOW AND HIGH

export const getPriceRange = createAsyncThunk("home/getPriceRange",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-priceRange")
            return fulfillWithValue(data)
        } catch (e) {
            
            return rejectWithValue(e.response.data)
        }
    }
)


// !  Query Product
export const getQueryProducts = createAsyncThunk("home/getQueryProducts",
    async (query, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/frontend/get-queryProducts?category=${query.category}&&ratting=${query.ratting}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&parPage=${query.parPage}`)
            return fulfillWithValue(data)
        } catch (e) {
            
            return rejectWithValue(e.response.data)
        }
    }
)


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
        pagination: {}
        
    },
    reducers: {
        messageClear: (state) => {
            state.successMessage = "";
            state.errorMessage = "";
        },
    },
    extraReducers: builder => {
        // ! getCategories
        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.categories = payload.payload
        });
        builder.addCase(getCategories.rejected, (state, {payload}) => {
            state.loading = false;
            state.errorMessage = payload.message
        });
        builder.addCase(getCategories.pending, (state, _) => {
            state.loading = true;
        });
        // ! GET FEATURE PRODUCTS
        builder.addCase(getFeatureProducts.fulfilled, (state, {payload}) => {
            state.featureProducts = payload.payload
            state.loading = false;
        });
        builder.addCase(getFeatureProducts.rejected, (state, {payload}) => {
            state.loading = false;
            state.errorMessage = payload.message
        });
        builder.addCase(getFeatureProducts.pending, (state, _) => {
            state.loading = true;
        });
        // ! GET CAROUSEL LATEST PRODUCTS
        builder.addCase(getCarouselLatestProducts.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.latestProducts = payload.payload
        });
        builder.addCase(getCarouselLatestProducts.rejected, (state, {payload}) => {
            state.loading = false;
            state.errorMessage = payload.message
        });
        builder.addCase(getCarouselLatestProducts.pending, (state, _) => {
            state.loading = true;
            
        });
        
        // ! GET CAROUSEL PRODUCTS
        builder.addCase(getCarouselProducts.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.topRatedProducts = payload.payload.topRatedProducts
            state.discountProducts = payload.payload.discountProducts
            state.successMessage = payload.message
        });
        builder.addCase(getCarouselProducts.rejected, (state, {payload}) => {
            state.loading = false;
            state.errorMessage = payload.message
        })
        builder.addCase(getCarouselProducts.pending, (state, _) => {
            state.loading = true;
        })
        //   ! GET PRICE RANGE PRODUCT : LOW AND HIGH
        builder.addCase(getPriceRange.fulfilled, (state, {payload}) => {
            state.priceRange = payload.payload
            state.loading = false;
        })
        builder.addCase(getPriceRange.rejected, (state, {payload}) => {
            state.loading = false;
            state.errorMessage = payload.message
        })
        builder.addCase(getPriceRange.pending, (state, _) => {
            state.loading = true;
        })
        
        //     !  Query Product
        
        builder.addCase(getQueryProducts.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.products = payload.payload.products
            state.pagination = payload.payload.pagination
        })
        builder.addCase(getQueryProducts.rejected, (state, {payload}) => {
            state.loading = false;
            state.errorMessage = payload.message
            state.products = []
            state.pagination = {}
            
            
        })
        builder.addCase(getQueryProducts.pending, (state, _) => {
            state.loading = true;
        })
    }
})

export const {messageClear} = homeReducer.actions;
export default homeReducer.reducer;