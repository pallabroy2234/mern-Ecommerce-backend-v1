import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// * GET USERS FOR READY TO CHAT
export const getUsers = createAsyncThunk(
	"chat/getUsers",
	async (_, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/dashboard/chat/seller/get-users`, {
				withCredentials: true,
			});
			return fulfillWithValue(data);
		} catch (e) {
			console.log(e.response.data);
			return rejectWithValue(e.response.data);
		}
	}
);






export const chatReducer = createSlice({
	name: "chat",
	initialState: {
		successMessage: "",
		errorMessage: "",
		loader : false,
		sellerFriends :[],
		activeUsers : [],
		activeSeller :[],
		messageNotifications : [],
		activeAdmin: "",
		friends: [],
		sellerAdminMessages: [],
		currentSeller:{},
		currentUser: {},
	},
	reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		}
		
	},
	extraReducers: builder => {
	
	}
	
});


export const {messageClear} = chatReducer.actions;
export default chatReducer.reducer;