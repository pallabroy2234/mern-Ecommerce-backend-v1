require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 5002

app.listen(port, async () => {
    console.log(`server is running at http://localhost:${port}`);
});