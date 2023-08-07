const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express();
const userRoute = require("./routes/userRouter")
const galleryRoute = require("./routes/galleryRouter")
const heartRoute = require("./routes/heartRouter")
const chatRoute = require("./routes/chatRouter")
const messageRoute = require("./routes/messageRouter")
require("dotenv").config()
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }))
app.use(cors());



app.use("/api/users",userRoute)
app.get("/",(req,res)=> {
    res.send("Api connected in port 5400")
})
app.use("/api/gallery",galleryRoute)
app.use("/api/heart",heartRoute)
app.use("/api/chats",chatRoute)
app.use("/api/messages",messageRoute)
const port = process.env.PORT || 5400
const uri = process.env.DB_URL
app.listen(port,console.log(`Server running on port ${port}`))
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("kết nối thành công")).catch((err)=> console.log(`Lỗi`,err.message))
