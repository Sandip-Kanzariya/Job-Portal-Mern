const express = require('express');
const connectDB = require('./db/config');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config({path : '../.env'});
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000

connectDB();

app.get("/", (req, res) => {
    res.send("HEllo,DDU ");
})

// 
app.use("/user/", userRoutes);

// 
app.use("/company/post", postRoutes);
// app.use("/company/user", ); // 

app.listen(PORT);