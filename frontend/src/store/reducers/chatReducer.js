import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api.js";

// * ADD FRIEND || POST || /api/frontend/chat/add-friend
export const addFriend = createAsyncThunk("chat/addFriend", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post(`frontend/chat/add-friend`, info);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

export const sendMessageSeller = createAsyncThunk("chat/sendMessageSeller", async (info, {rejectWithValue, fulfillWithValue}) => {
	try {
		const {data} = await api.post(`frontend/chat/send-message-to-seller`, info);
		return fulfillWithValue(data);
	} catch (e) {
		return rejectWithValue(e.response.data);
	}
});

export const chatReducer = createSlice({
	name: "chat",
	initialState: {
		loader: false,
		myFriends: [],
		currentFriend: {},
		successMessage: "",
		errorMessage: "",
		friendMessages: [],
		activeSeller: [],
	},
	reducers: {
		messageClear: (state, _) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
		updateMessage: (state, {payload}) => {
			state.friendMessages = [...state.friendMessages, payload];
		},
		updateSeller: (state, {payload}) => {
			state.activeSeller = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addFriend.fulfilled, (state, {payload}) => {
			state.loader = false;
			// state.successMessage = payload.message;
			state.myFriends = payload.payload.myFriends.myFriends;
			state.currentFriend = payload.payload.currentFriend;
			state.friendMessages = payload.payload.messages;
		});
		builder.addCase(addFriend.rejected, (state, {payload}) => {
			state.loader = false;
			state.errorMessage = payload.message;
		});
		builder.addCase(addFriend.pending, (state, _) => {
			state.loader = true;
		});
		builder.addCase(sendMessageSeller.fulfilled, (state, {payload}) => {
			let tempFriends = state.myFriends;
			let index = tempFriends.findIndex((friend) => friend.friendId === payload.payload.message.receiverId);
			if (index !== -1 && index !== 0) {
				const removeFriends = tempFriends.splice(index, 1)[0];
				tempFriends.unshift(removeFriends);
			}
			// while (index > 0) {
			// 	let temp = tempFriends[index];
			// 	tempFriends[index] = tempFriends[index - 1];
			// 	tempFriends[index - 1] = temp;
			// 	index--;
			// }
			state.myFriends = tempFriends;
			state.friendMessages = [...state.friendMessages, payload.payload.message];
			state.successMessage = payload.message;
		});
		builder.addCase(sendMessageSeller.rejected, (state, {payload}) => {
			state.errorMessage = payload.message;
		});
		builder.addCase(sendMessageSeller.pending, (state, _) => {
			state.loader = true;
		});
	},
});

export const {messageClear, updateMessage, updateSeller} = chatReducer.actions;
export default chatReducer.reducer;
