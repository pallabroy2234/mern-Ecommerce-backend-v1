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

// * GET SELLERS FOR ADMIN CHAT
export const getSellers = createAsyncThunk(
	"chat/getSellers",
	async (_, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get("/dashboard/chat/admin/get-sellers", {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			
			return rejectWithValue(e.response.data);
		}
	}
);

// * SEND MESSAGE TO SELLER AND ADMIN ALSO
export const sendMessageToSeller = createAsyncThunk(
	"chat/sendMessageToSeller",
	async (info, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.post("/dashboard/chat/admin/message-send-seller-admin", info, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			
			return rejectWithValue(e.response.data);
		}
	}
);

// * GET ADMIN MESSAGES AND CURRENT SELLER
export const getCurrentAdminMessages = createAsyncThunk(
	"chat/getCurrentAdminMessages",
	async (sellerId, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/dashboard/chat/admin/get-admin-messages/${sellerId}`, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			
			return rejectWithValue(e.response.data);
		}
	}
);

// * GET SELLER MESSAGES

export const getSellerMessages = createAsyncThunk(
	"chat/getSellerMessages",
	async (_, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.get(`/dashboard/chat/admin/get-seller-messages`, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			
			return rejectWithValue(e.response.data);
		}
	}
);

// * SEND MESSAGE TO ADMIN
export const sendMessageToAdmin = createAsyncThunk(
	"chat/sendMessageToAdmin",
	async (info, {rejectWithValue, fulfillWithValue}) => {
		try {
			const {data} = await api.post(`/dashboard/chat/admin/message-send-admin`, info, {
				withCredentials: true
			});
			return fulfillWithValue(data);
		} catch (e) {
			
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
		activeUser: [],
		activeSellers: [],
		messageNotifications: [],
		activeAdmin: false,
		sellerAdminMessages: [],
		sellerUserMessages: [],
		currentSeller: {},
		currentUser: {},
		sellers: []
	},
	reducers: {
		messageClear: (state) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
		updateMessage: (state, {payload}) => {
			state.sellerUserMessages = [...state.sellerUserMessages, payload];
		},
		updateUser: (state, {payload}) => {
			state.activeUser = payload;
		},
		updateSellers: (state, {payload}) => {
			state.activeSellers = payload;
		},
		updateSellerMessages : (state, {payload})=> {
			state.sellerAdminMessages =[...state.sellerAdminMessages, payload];
		},
		updateAdminMessages : (state, {payload})=> {
			state.sellerAdminMessages = [...state.sellerAdminMessages, payload];
		},
		updateActiveAdminStatus: (state, {payload})=> {
		 state.activeAdmin = payload.status
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
		
		// 	* GET SELLERS
		builder.addCase(getSellers.fulfilled, (state, {payload}) => {
			state.sellers = payload.payload;
			state.loader = false;
		});
		builder.addCase(getSellers.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
			state.loader = false;
		});
		builder.addCase(getSellers.pending, (state, _) => {
			state.loader = true;
		});
		
		// 	* SEND MESSAGE ADMIN TO SELLER
		builder.addCase(sendMessageToSeller.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.sellerAdminMessages = [...state.sellerAdminMessages, payload.payload];
			state.successMessage = payload.message;
		});
		builder.addCase(sendMessageToSeller.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(sendMessageToSeller.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
		});
		
		// 	* GET CURRENT SELLER AND WITH MESSAGES
		builder.addCase(getCurrentAdminMessages.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.sellerAdminMessages = payload.payload.messages;
			state.currentSeller = payload.payload.currentSeller;
		});
		builder.addCase(getCurrentAdminMessages.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getCurrentAdminMessages.pending, (state, _) => {
			state.loader = true;
		});
		
		// 	* GET SELLER MESSAGES
		builder.addCase(getSellerMessages.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.sellerAdminMessages = payload.payload.messages;
			
		});
		builder.addCase(getSellerMessages.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(getSellerMessages.pending, (state, _) => {
			state.loader = true;
		});
		
		// 	* SEND MESSAGE SELLER TO ADMIN
		builder.addCase(sendMessageToAdmin.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.sellerAdminMessages = [...state.sellerAdminMessages, payload.payload.message];
			state.successMessage = payload.message;
		});
		builder.addCase(sendMessageToAdmin.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(sendMessageToAdmin.pending, (state, _) => {
			state.loader = true;
		});
	}
});


export const {messageClear,updateActiveAdminStatus,updateAdminMessages, updateMessage, updateSellers, updateUser,updateSellerMessages} = chatReducer.actions;
export default chatReducer.reducer;