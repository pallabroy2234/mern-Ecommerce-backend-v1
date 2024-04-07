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
		friendMessages: [],
		currentFriend: {},
		successMessage: "",
		errorMessage: "",
	},
	reducers: {
		messageClear: (state, _) => {
			state.successMessage = "";
			state.errorMessage = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addFriend.fulfilled, (state, {payload}) => {
			state.loader = false;
			state.successMessage = payload.message;
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
	},
});

export const {messageClear} = chatReducer.actions;
export default chatReducer.reducer;
