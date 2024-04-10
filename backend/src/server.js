require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./utiles/db");
const port = process.env.PORT || 5002;
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);

const io = socketIo(server, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

var allUser = [];
var allSeller = [];

// * ADD USER
const addUser = (userId, socketId, userInfo) => {
	const checkUser = allUser.some((user) => user.userId === userId);
	if (!checkUser) {
		allUser.push({userId, socketId, userInfo});
		console.log(allUser);
	}
};

//  * ADD SELLER
const addSeller = (sellerId, socketId, userInfo) => {
	const checkSeller = allSeller.some((seller) => seller.sellerId === sellerId);
	if (!checkSeller) {
		allSeller.push({sellerId, socketId, userInfo});
		console.log(allSeller);
	}
};

// * Find USER

const findUser = (userId) => {
	return allUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
	console.log("Socket connected: ", socket.id);
	socket.on("disconnect", () => {
		console.log("Socket disconnected: ", socket.id);
	});
	socket.on("joinRoom", ({roomId}) => {
		socket.join(roomId);
		console.log("Socket joined room: ", roomId);
	});
	socket.on("message", ({roomId, message}) => {
		io.to(roomId).emit("message", message);
	});
	// * ADD USER
	socket.on("addUser", (userId, userInfo) => {
		addUser(userId, socket.id, userInfo);
	});
	// 	 * ADD SELLER
	socket.on("addSeller", (userId, userInfo) => {
		addSeller(userId, socket.id, userInfo);
	});
	// 	* SEND SELLER MESSAGE
	socket.on("send-seller-message", (message) => {
		if (message) {
			const user = findUser(message.receiverId);
			if (user !== undefined) {
				socket.to(user.socketId).emit("seller-message", message);
			}
		}
	});
});

server.listen(port, async () => {
	await connectDatabase();
	console.log(`server is running at http://localhost:${port}`);
});
