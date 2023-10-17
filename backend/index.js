const express = require('express');
const cors = require('cors');
const CookieParser = require('cookie-parser');
const connectDB = require('./db/config');
const dotenv = require('dotenv');

// middleware 
const {notFound, errorHandler, errorH} = require('./middleware/errorMiddleware');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const companyRoutes = require('./routes/companyRoutes');

const Post = require('./models/postModel');
const cookieParser = require('cookie-parser');

dotenv.config({path : '../.env'});
const app = express();

app.use(express.json());
app.use(cors()); // Cors 

app.use(cookieParser()) 

const PORT = process.env.PORT || 4500

connectDB()

app.get("/", async (req, res) => {
    // res.send({rt : "HEllo,DDU "});

    let post = await Post.find();

    if(post.length > 0){
        res.send(post)
    }
    else{
        res.send({result : "No Post Found"});
    }
})

// 
app.use("/user/", userRoutes);

// 
app.use("/company/post", postRoutes);
app.use("/company/admin", companyRoutes); // 

app.use(errorH);

// custome middleware 
// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => {console.log("HI, SS")});