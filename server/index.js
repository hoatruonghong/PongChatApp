const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const userRoute = require("./routes/user");

app.use(express.json());
app.use(cors());

require("dotenv").config()

app.use("/api/user", userRoute);
app.get("/", (req, res) => {
    res.send('Welcome ^^')
});

const port = process.env.PORT || 5000 ;

app.listen(port, (req, res) => {
    console.log(`server running on port: ${port}`);
})

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connection established"))
.catch((error)=>console.log("MongoDB connection fail:", error.message))