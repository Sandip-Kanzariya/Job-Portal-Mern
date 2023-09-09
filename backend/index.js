const express = require('express');
const connectDB = require('./db/config');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config({path : '../.env'});
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000

connectDB();

app.get("/", (req, res) => {
    res.send("HEllo, ");
})

app.use("/user/", userRoutes);

app.listen(PORT);