import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


export const categoryAdd = createAsyncThunk(
    "category/categoryAdd",
    async (info, {rejectWithValue, fulfillWithValue}) => {
        try {
            const formData = new FormData();
            formData.append("name", info.name);
            formData.append("image", info.image);
            const {data} = await api.post("/category-add", formData, {withCredentials: true})
            return fulfillWithValue(data)
            
        } catch (e) {
            console.log(e.response.data)
            return rejectWithValue(e.response.data)
        }
    }
)


export const get_categories = createAsyncThunk(
    "category/get_categories",
    async ({parPage, page, searchValue}, {rejectWithValue, fulfillWithValue}) => {
        try {
            
            const {data} = await api.get(`/get-categories?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {withCredentials: true})
            return fulfillWithValue(data)
            
        } catch (e) {
            console.log(e.response.data)
            return rejectWithValue(e.response.data)
        }
    }
)


export const categoryReducer = createSlice({
    name: "category",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        categories: [],
        totalCategories: 0,
    },
    reducers: {
        messageClear: (state) => {
            state.successMessage = "";
            state.errorMessage = "";
        },
    },
    extraReducers: builder => {
        builder.addCase(categoryAdd.pending, (state, _) => {
            state.loader = true;
        });
        builder.addCase(categoryAdd.rejected, (state, {payload}) => {
            state.loader = false;
            state.errorMessage = payload.message;
        });
        builder.addCase(categoryAdd.fulfilled, (state, {payload}) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.categories = [...state.categories,payload.payload]
        });
        builder.addCase(get_categories.fulfilled, (state, {payload}) => {
            state.categories = payload?.payload?.categories;
            state.totalCategories = payload?.payload?.totalCategories;
            
        });
    }
    
})


export const {messageClear, stateClear} = categoryReducer.actions;
export default categoryReducer.reducer;