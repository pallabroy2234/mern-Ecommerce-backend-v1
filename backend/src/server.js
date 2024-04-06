require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./utiles/db");
const port = process.env.PORT || 5002;
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);

server.listen(port, async () => {
	await connectDatabase();
	console.log(`server is running at http://localhost:${port}`);
});

const io = socketIo(server, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

let allUser = [];

const addUser = (userId, socketId, userInfo) => {
	const checkUser = allUser.some((user) => user.userId === userId);
	if (!checkUser) {
		allUser.push({userId, socketId, userInfo});
		console.log(allUser);
	}
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

	socket.on("addUser", (userId, userInfo) => {
		addUser(userId, socket.id, userInfo);
	});
});
