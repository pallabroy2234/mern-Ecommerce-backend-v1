import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// ! ADD PRODUCT -> POST REQUEST
export const add_product = createAsyncThunk(
    "product/add_product",
    async (info, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.post("/add_product", info, {
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"}
            })
            return fulfillWithValue(data)
        } catch (e) {
            console.log(e.response.data)
            return rejectWithValue(e.response.data)
        }
    }
)

// ! GET PRODUCTS -> GET REQUEST
export const get_products = createAsyncThunk(
    "product/get_products",
    async ({page,searchValue,parPage}, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/get_products?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}` , {withCredentials: true})
           
            return fulfillWithValue(data)
        } catch (e) {
            console.log(e.response.data)
            return rejectWithValue(e.response.data)
        }
    }
)


// ! GET PRODUCT BY ID -> GET REQUEST
export const get_product = createAsyncThunk(
    "product/get_product",
    async (productId, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/get_product/${productId}` , {withCredentials: true})
            return fulfillWithValue(data)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

// ! UPDATE PRODUCT -> PUT REQUEST
export const update_product = createAsyncThunk(
    "product/update_product",
    async (info, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.post("/update_product", info, {
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"}
            })
            return fulfillWithValue(data)
        } catch (e) {
            console.log(e.response.data)
            return rejectWithValue(e.response.data)
        }
    }
)

export const productReducer = createSlice({
    name: "product",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        product: "",
        products: [],
        totalProducts: 0,
    },
    reducers: {
        messageClear: (state) => {
            state.successMessage = "";
            state.errorMessage = "";
        },
        
    },
    extraReducers: builder => {
        builder.addCase(add_product.pending, (state, _) => {
            state.loader = true;
        });
        builder.addCase(add_product.rejected, (state, {payload}) => {
            state.loader = false;
            state.errorMessage = payload.message;
        });
        builder.addCase(add_product.fulfilled, (state, {payload}) => {
            state.loader = false;
            state.successMessage = payload?.message;
            state.products = [...state.products, payload?.payload]
        });
        builder.addCase(get_products.fulfilled, (state, {payload}) => {
            state.products = payload?.payload?.products;
            state.totalProducts = payload?.payload?.totalProducts;
        });
        builder.addCase(get_product.fulfilled ,(state,{payload})=> {
            state.product = payload?.payload;
        });
        builder.addCase(get_product.rejected ,(state,{payload})=> {
            state.errorMessage = payload?.message;
            state.loader =false;
        });
        builder.addCase(update_product.pending,(state,_)=>{
            state.loader =true;
        });
        builder.addCase(update_product.rejected,(state,{payload})=>{
            state.loader =false;
            state.errorMessage = payload?.message;
        });
        builder.addCase(update_product.fulfilled,(state,{payload})=>{
            state.loader =false;
            state.successMessage = payload?.message;
            state.products = state.products.map(product => product._id === payload?.payload._id ? payload?.payload : product)
        });
    }
    
})


export const {messageClear,} = productReducer.actions;
export default productReducer.reducer;