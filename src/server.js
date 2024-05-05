require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./utiles/db");
const port = process.env.PORT || 5002;
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);


let allowedOrigins = [];

if (process.env.NODE_ENV === 'development') {
    // Development environment
    allowedOrigins = [process.env.CLIENT_USER_LOCAL_URL, process.env.CLIENT_DASHBOARD_LOCAL_URL];
} else if (process.env.NODE_ENV === 'production') {
    // Production environment
    allowedOrigins = [process.env.CLIENT_USER_PRODUCTION_URL, process.env.CLIENT_DASHBOARD_PRODUCTION_URL];
}


const io = socketIo(server, {
    cors: {
        // origin: "*",
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                let msg = "The CORS policy for this site does not allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        preflightContinue: false,
        credentials: true,
        optionsSuccessStatus: 200,
    },
});


let allSeller = [];
let allUser = [];
let admin = {};

//  * ADD SELLER
const addSeller = (sellerId, socketId, userInfo) => {
    const checkSeller = allSeller.some((seller) => seller.sellerId === sellerId);
    if (!checkSeller) {
        allSeller.push({sellerId, socketId, userInfo});
    }
};
// * ADD USER
const addUser = (userId, socketId, userInfo) => {
    const checkUser = allUser.some((user) => user.userId === userId);
    if (!checkUser) {
        allUser.push({userId, socketId, userInfo});
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

const disconnectSeller = (socketId) => {
    allSeller = allUser.filter((seller) => seller.socketId !== socketId);
};
const disconnectUser = (socketId) => {
    allUser = allUser.filter((user) => user.socketId !== socketId);
};

// * DISCONNECT ADMIN
const disconnectAdmin = (socketId) => {
    if (admin.socketId === socketId) {
        admin = {};
    }
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
        io.emit("active-admin", {status: true});
    });
    
    // * ADD ADMIN
    socket.on("addAdmin", (adminInfo) => {
        delete adminInfo.email;
        admin = adminInfo;
        admin.socketId = socket.id;
        io.emit("active-seller", allSeller);
        io.emit("active-admin", {status: true});
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
    
    // * GET MESSAGE ADMIN TO  SELLER
    socket.on("send-message-admin-to-seller", (message) => {
        if (message) {
            const seller = findSeller(message.receiverId);
            if (seller !== undefined) {
                socket.to(seller.socketId).emit("admin-message", message);
            }
        }
    });
    
    // * GET MESSAGE SELLER TO ADMIN
    socket.on("send-message-seller-to-admin", (message) => {
        if (message) {
            if (admin.socketId && admin._id === message.receiverId) {
                socket.to(admin.socketId).emit("receive-seller-message", message);
            }
        }
    });
    
    socket.on("disconnect", () => {
        console.log("Socket disconnected:  ", socket.id);
        disconnectSeller(socket.id);
        disconnectUser(socket.id);
        disconnectAdmin(socket.id);
        io.emit("active-admin", {status: false});
        io.emit("active-user", allUser);
        io.emit("active-seller", allSeller);
    });
});

server.listen(port, () => {
    connectDatabase();
    console.log(`server is running at http://localhost:${port}`);
});
