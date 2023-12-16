require('dotenv').config();

const app = require('./app');
const connectDatabase = require("./utiles/db")
const port = process.env.PORT || 5002

app.listen(port, async () => {
    await connectDatabase()
    console.log(`server is running at http://localhost:${port}`);
});


