import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// ! GET REQUEST SELLERS
export const get_request_sellers = createAsyncThunk(
    "sellers/get_request_sellers",
    async ({currentPage, parPage, searchValue}, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/get-request-sellers?currentPage=${currentPage}&&searchValue=${searchValue}&&parPage=${parPage}`, {withCredentials: true})
            return fulfillWithValue(data)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)


// ! GET SELLER BY ID
export const get_sellerById =createAsyncThunk(
    "sellers/get_sellerById",
    async (sellerId,{rejectWithValue, fulfillWithValue}) => {
        try{
            const {data} = await api.get(`/get-sellerById/${sellerId}`,{withCredentials:true})
            return fulfillWithValue(data)
        }catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

// ! UPDATE SELLER STATUS
export const update_sellerStatus = createAsyncThunk(
    "sellers/update_sellerStatus",
    async (info,{rejectWithValue, fulfillWithValue}) => {
        try{
            const {data} = await api.post("/update-sellerStatus",info,{withCredentials:true})
            return fulfillWithValue(data)
        }catch (e) {
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
        stateChangeLoader:false,
        sellers:[],
        totalSellers:0,
        seller:"" || {},
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
        });
        builder.addCase(get_sellerById.pending, (state,_)=> {
            state.loader= true;
        });
        builder.addCase(get_sellerById.rejected,(state,{payload})=> {
            state.errorMessage = payload?.message;
            state.loader = false;
        });
        builder.addCase(get_sellerById.fulfilled, (state, {payload}) => {
            state.seller = payload.payload;
        });
        builder.addCase(update_sellerStatus.pending,(state,_)=> {
            state.stateChangeLoader = true;
        });
        builder.addCase(update_sellerStatus.rejected,(state,{payload})=> {
            state.errorMessage =payload.message;
            state.stateChangeLoader =false;
        });
        builder.addCase(update_sellerStatus.fulfilled,(state,{payload})=> {
            state.successMessage= payload.message;
            state.stateChangeLoader= false;
            state.seller = payload.payload;
        })
    }
    
})


export const {messageClear, stateClear} = sellerReducer.actions;
export default sellerReducer.reducer;