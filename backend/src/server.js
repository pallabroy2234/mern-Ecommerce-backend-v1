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
	connectionStateRecovery: true,
});

let allUser = [];
let allSeller = [];

// * ADD USER
const addUser = (userId, socketId, userInfo) => {
	const checkUser = allUser.some((user) => user.userId === userId);
	if (!checkUser) {
		allUser.push({userId, socketId, userInfo});
	}
};

//  * ADD SELLER
const addSeller = (sellerId, socketId, userInfo) => {
	const checkSeller = allSeller.some((seller) => seller.sellerId === sellerId);
	if (!checkSeller) {
		allSeller.push({sellerId, socketId, userInfo});
	}
};

// * Find USER
const findUser = (userId) => {
	return allUser.find((user) => user.userId === userId);
};

//  * FIND SELLER
const findSeller = (sellerId) => {
	return allSeller.find((seller) => seller.sellerId === sellerId);
};

// * DISCONNECT FUNCTION

const disconnect = (socketId) => {
	allUser = allUser.filter((user) => user.socketId !== socketId);
	allSeller = allUser.filter((seller) => seller.socketId !== socketId);
};

io.on("connection", (socket) => {
	console.log("Socket connected:  ", socket.id);

	// socket.on("joinRoom", ({roomId}) => {
	// 	socket.join(roomId);
	// 	console.log("Socket joined room: ", roomId);
	// });
	//
	// socket.on("message", ({roomId, message}) => {
	// 	io.to(roomId).emit("message", message);
	// });
	// socket.on("reconnect", () => {
	// 	console.log("Socket reconnected: ", socket.id);
	// });
	// socket.on("reconnect_error", () => {
	// 	console.log("Socket reconnection error: ", socket.id);
	// });

	// * ADD USER
	socket.on("addUser", (userId, userInfo) => {
		addUser(userId, socket.id, userInfo);

		// 	* DISCONNECT SELLER
		io.emit("active-user", allUser);
		io.emit("active-seller", allSeller);
	});
	// 	 * ADD SELLER
	socket.on("addSeller", (userId, userInfo) => {
		addSeller(userId, socket.id, userInfo);

		// 	* DISCONNECT SELLER
		io.emit("active-seller", allSeller);
		io.emit("active-user", allUser);
	});
	// 	* GET SELLER MESSAGE AND AFTER GETTING MESSAGE SEND TO USER
	socket.on("send-seller-message", (message) => {
		if (message) {
			const user = findUser(message.receiverId);
			if (user !== undefined) {
				socket.to(user.socketId).emit("seller-message", message);
			}
		}
	});

	// 	* GET USER  MESSAGE AND AFTER GETTING MESSAGE SEND TO SELLER
	socket.on("send-user-message", (message) => {
		if (message) {
			const seller = findSeller(message.receiverId);
			if (seller !== undefined) {
				socket.to(seller.socketId).emit("user-message", message);
			}
		}
	});

	socket.on("disconnect", () => {
		console.log("Socket disconnected:  ", socket.id);
		disconnect(socket.id);
		io.emit("active-seller", allSeller);
		io.emit("active-user", allUser);
	});
});

server.listen(port, () => {
	connectDatabase();
	console.log(`server is running at http://localhost:${port}`);
});
