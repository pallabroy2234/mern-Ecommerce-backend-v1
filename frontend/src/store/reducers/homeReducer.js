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



//  ! price range and latest Product
export const getPriceRangeLatestProduct = createAsyncThunk("home/getPriceRangeLatestProduct",
    async (_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get("/frontend/get-priceRange-latestProduct")
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
        
    },
    reducers: {},
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
        builder.addCase(getFeatureProducts.fulfilled, (state,{payload})=> {
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
        
        
        
    }
})

export default homeReducer.reducer;