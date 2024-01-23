import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";



export const get_request_sellers = createAsyncThunk(
    "sellers/get_request_sellers",
    async ({currentPage, parPage, searchValue}, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/get-request-sellers?currentPage=${currentPage}&&searchValue=${searchValue}&&parPage=${parPage}`, {withCredentials: true})
            return fulfillWithValue(data)
        } catch (e) {
            console.log(e.response.data)
            return rejectWithValue(e.response.data)
        }
    }
)


export const sellerReducer = createSlice({
    name: "sellers",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        sellers:[],
        totalSellers:0,
    },
    reducers: {
        messageClear: (state) => {
            state.successMessage = "";
            state.errorMessage = "";
        },
    },
    extraReducers: builder => {
        builder.addCase(get_request_sellers.fulfilled, (state, {payload}) => {
            state.sellers = payload?.payload?.sellers;
            state.totalSellers = payload?.payload?.totalSellers;
        });
        builder.addCase(get_request_sellers.pending, (state,_)=>{
            state.loader= true;
        } );
        builder.addCase(get_request_sellers.rejected,(state,{payload})=> {
            state.errorMessage = payload?.message;
            state.loader = false;
        })
    }
    
})


export const {messageClear, stateClear} = sellerReducer.actions;
export default sellerReducer.reducer;