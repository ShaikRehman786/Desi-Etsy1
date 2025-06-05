require('dotenv').config();  // MUST be first line

const app= require('./src/app');
const connectDB = require('./src/config/db');

// connect DB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
