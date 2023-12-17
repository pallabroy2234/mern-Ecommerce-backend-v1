import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


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

export const get_product = createAsyncThunk(
    "product/get_product",
    async (info, {rejectWithValue, fulfillWithValue}) => {
        try {
            const formData = new FormData();
            formData.append("name", info.name);
            formData.append("image", info.image);
            const {data} = await api.post("/get_product", formData, {withCredentials: true})
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
        products: [],
        totalProduct: 0,
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
            state.successMessage = payload.message;
            state.products = [...state.products, payload.payload]
        });
        builder.addCase(get_product.fulfilled, (state, {payload}) => {
            state.products = payload?.payload?.products;
            state.totalCategories = payload?.payload?.totalProduct;
            
        });
    }
    
})


export const {messageClear,} = productReducer.actions;
export default productReducer.reducer;