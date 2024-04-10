import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";


// * GET USERS FOR READY TO CHAT
export const getUsers = createAsyncThunk(
	"chat/getUsers",
	async (_, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/dashboard/chat/seller/get-users`, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			console.log(e.response.data);
			return rejectWithValue(e.response.data);
		}
	}
);

export const getUserMessages = createAsyncThunk(
	"chat/getUserMessages",
	async (customerId, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/dashboard/chat/seller/get-user-messages/${customerId}`, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			console.log(e.response.data);
			return rejectWithValue(e.response.data);
		}
	}
);


// * SEND MESSAGE
export const sendSellerMessage = createAsyncThunk(
	"chat/sendSellerMessage",
	async (info, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.post("/dashboard/chat/seller/send-seller-message", info, {
				withCredentials: true
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
		loader: false,
		sellerFriends: [],
		activeUsers: [],
		activeSeller: [],
		messageNotifications: [],
		activeAdmin: "",
		sellerAdminMessages: [],
		sellerUserMessages: [],
		currentSeller: {},
		currentUser: {}
	},
	reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		}
		
	},
	extraReducers: builder => {
		// * GET SELLER FRIENDS
		builder.addCase(getUsers.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.sellerFriends = payload.payload.users;
			state.successMessage = payload.message;
		});
		builder.addCase(getUsers.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getUsers.pending, (state, _) => {
			state.loader = true;
		});
		// 	* GET USER MESSAGES AND ALSO GET CURRENT USER
		builder.addCase(getUserMessages.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.sellerUserMessages = payload.payload.messages;
			state.currentUser = payload.payload.currentFriend;
		});
		builder.addCase(getUserMessages.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getUserMessages.pending, (state, _) => {
			state.loader = true;
		});
		
		// 	* SEND MESSAGE
		builder.addCase(sendSellerMessage.fulfilled, (state, {payload}) => {
			let tempFriends = state.sellerFriends;
			let index = tempFriends.findIndex((friend) => friend.friendId === payload.payload.message.receiverId);
			if (index !== -1 && index !== 0) {
				const removeFriends = tempFriends.splice(index, 1)[0];
				tempFriends.unshift(removeFriends);
			}
			state.sellerFriends = tempFriends;
			state.sellerUserMessages = [...state.sellerUserMessages, payload.payload.message];
			state.successMessage = payload.message;
		});
		builder.addCase(sendSellerMessage.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
		});
		builder.addCase(sendSellerMessage.pending, (state, _) => {
			state.loader = true;
		});
	}
});


export const {messageClear} = chatReducer.actions;
export default chatReducer.reducer;